import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../Item';
import RecordCard from '../RecordCard';
import NAVITEMS from './NavItems.json';
import recordSeeder from '../../data/recordSeeder';

const Home = () => {
  return (
    <div className="h-full w-full p-3">
      <div className="my-3 flex justify-between">
        <h2 className="my-auto ml-2">歷史紀錄</h2>
        <Link
          to="/record/new"
          className="btn mx-2 my-auto bg-primary text-white"
        >
          新增記帳
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[75%] overflow-y-scroll shadow-md">
        {recordSeeder().map((record) => (
          <RecordCard record={record} key={record.id} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Home);
