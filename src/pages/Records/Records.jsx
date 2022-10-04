import React from 'react';
import { Link } from 'react-router-dom';
import shallow from 'zustand/shallow';
import Item from '../../components/Item';
import RecordCard from '../../components/RecordCard';
import NAVITEMS from './NavItems.json';
import useStore from '../../store';

const Records = () => {
  const { loading, records, getRecords } = useStore((state) => {
    return {
      loading: state.loading,
      records: state.records,
      getRecords: state.getRecords,
    };
  }, shallow);

  React.useEffect(() => {
    getRecords();
  }, [getRecords]);

  if (loading) {
    return <div className="my-spinner">Loading</div>;
  }

  return (
    <div className="h-full w-full p-3">
      <div className="flex h-[10%] justify-between">
        <h2 className="my-auto ml-2">歷史紀錄</h2>
        <Link
          to="/record/new"
          className="btn mx-2 my-auto bg-primary text-white"
        >
          新增記帳
        </Link>
      </div>
      <div className="grid h-[8%] grid-cols-5 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="h-[83%] overflow-y-scroll shadow-md">
        {records.map((record) => (
          <RecordCard record={record} key={record.id} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(Records);
