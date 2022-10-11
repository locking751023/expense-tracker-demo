import React from 'react';
import shallow from 'zustand/shallow';
import dayjs from 'dayjs';
import useStore from '../../store';
import IsLoading from '../../containers/IsLoading';

const AllRecords = () => {
  const { records, getAllRecords, deleteRecord } = useStore((state) => {
    return {
      records: state.records,
      getAllRecords: state.getAllRecords,
      deleteRecord: state.deleteRecord,
    };
  }, shallow);

  const atDeleteRecord = (rid) => {
    deleteRecord(rid)
      .then((res) => {
        if (res.status === 'success') return getAllRecords();
        return console.log('atDeleteRecord res:', res);
      })
      .catch((err) => console.log('atDeleteRecord error:', err));
  };

  React.useEffect(() => {
    getAllRecords();
  }, [getAllRecords]);

  return (
    <IsLoading>
      <div className="h-full overflow-y-scroll p-2">
        {records?.map((record) => {
          const { User, date, createdAt, updatedAt } = record;
          return (
            <div
              className="mb-3 flex justify-between rounded-xl bg-slate-200 p-2 shadow-xl"
              key={record.id}
            >
              <div className="w-[80%] sm:flex">
                <div className="sm:w-1/2">
                  <div className="pb-1 pl-1">使用者名稱：{User?.name}</div>
                  <div className="pb-1 pl-1">
                    營業日期：{dayjs(date).format('YYYY/MM/DD hh:mm')}
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <div className="pb-1 pl-1">
                    建立日期：{dayjs(createdAt).format('YYYY/MM/DD hh:mm')}
                  </div>
                  <div className="pb-1 pl-1">
                    最後更新：{dayjs(updatedAt).format('YYYY/MM/DD hh:mm')}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  atDeleteRecord(record.id);
                }}
                className="btn my-auto bg-danger text-white shadow-xl"
              >
                刪除
              </button>
            </div>
          );
        })}
      </div>
    </IsLoading>
  );
};

export default React.memo(AllRecords);
