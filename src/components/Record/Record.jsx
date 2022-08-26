import React from 'react';
import Item from '../Item';
import ProductCard from '../ProductCard';
import NAVITEMS from './NavItems.json';
import RECORD from '../../data/record.json';

type RecordProps = {};

const Record: React.FC<RecordProps> = () => {
  const { products, date, local } = RECORD[0];
  return (
    <div className="h-full w-full p-3">
      <header className="flex justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="my-2">日期：{date}</h2>
          <h2 className="my-2">地點：{local}</h2>
        </div>
        <div className="flex my-auto ">
          <button className="btn mx-2 bg-sky-500 text-white">編輯</button>
          <button className="btn mx-2 bg-red-500 text-white">刪除</button>
        </div>
      </header>
      <div className="grid grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[68%] overflow-y-scroll">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div>
        <div className="flex flex-row-reverse px-2 mt-3">營業額：10000</div>
      </div>
    </div>
  );
};

export default React.memo(Record);
