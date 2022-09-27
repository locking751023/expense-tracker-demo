import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Item from '../../components/Item';
import ProductCard from '../../components/ProductCard';
import NAVITEMS from './NavItems.json';
import recordSeeder from '../../data/recordSeeder';

const Record = () => {
  const params = useParams();
  const record = recordSeeder().find((item) => item.id === params.rid / 1);
  const { products, date, local, revenue } = record;
  return (
    <div className="h-full w-full px-2">
      <header className="flex h-[10%] justify-between">
        <div className="flex flex-col sm:flex-row">
          <h2 className="m-2 sm:my-2">日期：{date}</h2>
          <h2 className="m-2 sm:my-2">地點：{local}</h2>
        </div>
        <div className="my-auto flex ">
          <Link
            to={`/record/${params.rid}/edit`}
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
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="flex h-[8%] flex-row-reverse items-center pr-5">
        營業額：{revenue}
      </div>
    </div>
  );
};

export default React.memo(Record);
