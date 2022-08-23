import React from 'react';
import Item from '../Item';
import Card from '../Card';
import NAVITEMS from './NavItems.json';
import RECORD from '../../data/record.json';

const Home = () => (
  <div className="h-full mx-auto p-3">
    <h2 className="my-3">歷史紀錄</h2>
    <div className="grid grid-cols-5 gap-1 border-b-2 border-gray-500">
      {NAVITEMS.map((item) => (
        <Item item={item} key={item} />
      ))}
    </div>
    <div className="max-h-[75%] overflow-y-scroll">
      {RECORD.map((record) => (
        <Card record={record} key={record.id} />
      ))}
    </div>
  </div>
);

export default React.memo(Home);
