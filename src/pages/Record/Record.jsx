import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import shallow from 'zustand/shallow';
import Item from '../../components/Item';
import ProductCard from '../../components/ProductCard';
import NAVITEMS from '../../store/NavItems.json';
import useStore from '../../store';
import { calSubTotal } from '../../helpers/calcHelper';
import IsLoading from '../../containers/IsLoading';

const Record = () => {
  const params = useParams().rid;
  const [recordDate, setRecordDate] = React.useState();
  const { record, getRecord, deleteRecord, actionSuccess } = useStore(
    (state) => {
      return {
        record: state.record,
        getRecord: state.getRecord,
        deleteRecord: state.deleteRecord,
        actionSuccess: state.actionSuccess,
      };
    },
    shallow,
  );
  const { RecordedProducts, date, Location } = record;

  const atDeleteRecord = () => {
    deleteRecord(params);
  };

  const calcSalesSum: Number = RecordedProducts?.reduce(
    (total, recordedProduct) => {
      const { amount, sendBack, historyPrice, Product } = recordedProduct;
      return Number(
        total +
          (calSubTotal(historyPrice, amount, Product?.unit) -
            calSubTotal(historyPrice, sendBack, Product?.unit)),
      );
    },
    0,
  );

  React.useEffect(() => {
    getRecord(params);
    setRecordDate(() => {
      if (date) return dayjs(date).format('YYYY/MM/DD (dd)');
      return '';
    });
  }, [getRecord, params, date]);

  if (actionSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <IsLoading>
      <div className="h-full w-full p-3">
        <header className="flex h-[14%] justify-between md:h-[9%]">
          <div className="flex flex-col sm:flex-row">
            <h2 className="py-1 md:m-2">日期：{recordDate}</h2>
            <h2 className="py-1 md:m-2">地點：{Location?.name}</h2>
          </div>
          <div className="flex h-full">
            <Link
              to={`/record/${params}/edit`}
              className="btn my-auto mx-2 bg-primary text-white"
            >
              編輯
            </Link>
            <button
              onClick={() => {
                atDeleteRecord();
              }}
              className="btn mx-2 my-auto bg-danger text-white"
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
        <div className="h-[72%] overflow-y-scroll shadow-md md:h-[77%]">
          {RecordedProducts?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
        <div className="flex h-[6%] flex-row-reverse items-end pr-2">
          應賣金額：{calcSalesSum}
        </div>
      </div>
    </IsLoading>
  );
};

export default React.memo(Record);
