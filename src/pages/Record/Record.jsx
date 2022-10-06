import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import shallow from 'zustand/shallow';
import Swal from 'sweetalert2';
import Item from '../../components/Item';
import ProductCard from '../../components/ProductCard';
import NAVITEMS from '../../store/NavItems.json';
import useStore from '../../store';
import { calSubTotal } from '../../helpers/calcHelper';

const Record = () => {
  const [deleteRecordSuccess, setDeleteRecordSuccess] = React.useState(false);
  const params = useParams().rid;
  const { record, getRecord, deleteRecord } = useStore((state) => {
    return {
      user: state.user,
      record: state.record,
      getRecord: state.getRecord,
      deleteRecord: state.deleteRecord,
    };
  }, shallow);
  const { RecordedProducts, date, Location } = record;

  const recordDate = () => {
    if (date) return dayjs(date).format('YYYY/MM/DD (dd)');
    return '';
  };

  const atDeleteRecord = async () => {
    const result = await Swal.fire({
      title: '確定要刪除這筆記錄?',
      text: '刪除後無法復原!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '刪除!',
    });
    if (result.isConfirmed) {
      const res = await deleteRecord(params);
      if (res.status === 'success') {
        Swal.fire('記錄已成功刪除');
        setDeleteRecordSuccess(true);
      }
    }
  };

  const calcRevenue: Number = RecordedProducts?.reduce(
    (total, recordedProduct) => {
      const { amount, historyPrice, Product } = recordedProduct;
      return Number(total + calSubTotal(amount, Product?.unit, historyPrice));
    },
    0,
  );

  React.useEffect(() => {
    getRecord(params);
  }, [params, getRecord]);

  if (deleteRecordSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-full w-full px-2">
      <header className="flex h-[10%] justify-between">
        <div className="flex flex-col sm:flex-row">
          <h2 className="m-2 sm:my-2">日期：{recordDate()}</h2>
          <h2 className="m-2 sm:my-2">地點：{Location?.name}</h2>
        </div>
        <div className="my-auto flex ">
          <Link
            to={`/record/${params}/edit`}
            className="btn mx-2 bg-primary text-white"
          >
            編輯
          </Link>
          <button
            onClick={() => {
              atDeleteRecord();
            }}
            className="btn mx-2 bg-danger text-white"
          >
            刪除
          </button>
        </div>
      </header>
      <div className="grid h-[8%] grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[74%] overflow-y-scroll shadow-md">
        {RecordedProducts?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="flex h-[8%] flex-row-reverse items-center pr-5">
        營業額：{calcRevenue}
      </div>
    </div>
  );
};

export default React.memo(Record);
