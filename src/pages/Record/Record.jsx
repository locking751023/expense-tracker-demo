import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import dayjs from 'dayjs';
import shallow from 'zustand/shallow';
import Item from '../../components/Item';
import ProductCard from '../../components/ProductCard';
import NAVITEMS from '../../store/NavItems.json';
import useStore from '../../store';
import { calSubTotal } from '../../helpers/calcHelper';

const Record = () => {
  const params = useParams().rid;
  const { user, record, getRecord, loading } = useStore((state) => {
    return {
      user: state.user,
      record: state.record,
      loading: state.loading,
      getRecord: state.getRecord,
    };
  }, shallow);
  const isRecord = user.Records.some((data) => data.id === Number(params));

  if (!isRecord) return <Navigate to="*" />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    getRecord(params);
  }, [params, getRecord]);

  if (loading) {
    return <div className="my-spinner">Loading</div>;
  }

  const { RecordedProducts = [], date, Location = '' } = record;
  const calcRevenue: Number = RecordedProducts.reduce(
    (total, recordedProduct) => {
      const { amount, historyPrice, Product } = recordedProduct;
      return Number(total + calSubTotal(amount, Product.unit, historyPrice));
    },
    0,
  );

  return (
    <div className="h-full w-full px-2">
      <header className="flex h-[10%] justify-between">
        <div className="flex flex-col sm:flex-row">
          <h2 className="m-2 sm:my-2">
            日期：{dayjs(date).format('YYYY/MM/DD (dd)')}
          </h2>
          <h2 className="m-2 sm:my-2">地點：{Location.name}</h2>
        </div>
        <div className="my-auto flex ">
          <Link
            to={`/record/${params}/edit`}
            className="btn mx-2 bg-primary text-white"
          >
            編輯
          </Link>
          <button className="btn mx-2 bg-danger text-white">刪除</button>
        </div>
      </header>
      <div className="grid h-[8%] grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[74%] overflow-y-scroll shadow-md">
        {RecordedProducts.map((product) => (
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
