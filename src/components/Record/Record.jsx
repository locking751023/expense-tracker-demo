import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Item from '../Item';
import ProductCard from '../ProductCard';
import NAVITEMS from './NavItems.json';
import recordSeeder from '../../data/recordSeeder';

const Record = () => {
  const params = useParams();
  const record = recordSeeder().find((item) => item.id === params.id / 1);
  const { products, date, local, revenue } = record;

  return (
    <div className="h-full w-full p-3">
      <header className="flex justify-between">
        <div className="flex flex-col sm:flex-row">
          <h2 className="m-2 sm:my-2">日期：{date}</h2>
          <h2 className="m-2 sm:my-2">地點：{local}</h2>
        </div>
        <div className="my-auto flex ">
          <Link
            to={`/record/${params.id}/edit`}
            className="btn mx-2 bg-primary text-white"
          >
            編輯
          </Link>
          <button className="btn mx-2 bg-danger text-white">刪除</button>
        </div>
      </header>
      <div className="grid grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[78%] overflow-y-scroll shadow-md">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="mt-3 flex flex-row-reverse px-3">營業額：{revenue}</div>
    </div>
  );
};

export default React.memo(Record);
