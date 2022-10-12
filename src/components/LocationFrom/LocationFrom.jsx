import React from 'react';
import { useForm } from 'react-hook-form';

const LocationFrom = (props) => {
  const {
    location,
    loading,
    lid,
    onUpdateLocation,
    onGetLocations,
    onDeleteLocation,
  } = props;
  const [isDisabled, setIsDisabled] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: location,
    },
  });

  const atSubmit = (data) => {
    if (loading) return;
    onUpdateLocation(lid, data)
      .then((res) => {
        if (res.data?.status === 'success') return onGetLocations();
        return console.log('onUpdateLocation res:', res);
      })
      .catch((err) => console.log('onUpdateLocation error:', err));
  };

  const atDeleteLocation = (locationId) => {
    onDeleteLocation(locationId)
      .then((res) => {
        if (res.data?.status === 'success') return onGetLocations();
        return console.log('onUpdateLocation res:', res);
      })
      .catch((err) => console.log('onUpdateLocation error:', err));
  };

  return (
    <form
      onSubmit={handleSubmit(atSubmit)}
      className="mb-3 flex h-[20%] items-center justify-between rounded-xl bg-slate-200 px-4 shadow-xl sm:h-[15%]"
    >
      <div className="w-[60%] sm:flex sm:w-[65%] sm:justify-between">
        <label className=" flex w-full flex-col sm:flex-row sm:items-center">
          地點名稱：
          <input
            type="text"
            className="mt-2 w-full rounded-md border-2 bg-gray-100 p-1 sm:w-[60%]"
            disabled={isDisabled}
            {...register('name', { required: '不可為空白' })}
          />
        </label>
        <small className="mt-auto text-red-400">{errors.name?.message}</small>
      </div>
      <div className="flex w-[40%] justify-end">
        {isDisabled ? (
          <>
            <div
              role="button" // resolve no-noninteractive-element-interactions
              tabIndex={0} // resolve interactive-supports-focus
              onClick={() => {
                setIsDisabled(false);
              }}
              className="btn bg-primary text-white"
            >
              編輯
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                atDeleteLocation(lid);
              }}
              className="btn ml-2 bg-danger text-white"
            >
              刪除
            </div>
          </>
        ) : (
          <>
            <button type="submit" className="btn bg-success text-white">
              儲存
            </button>
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setIsDisabled(true);
              }}
              className="btn ml-2 bg-info text-white"
            >
              取消
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default React.memo(LocationFrom);
