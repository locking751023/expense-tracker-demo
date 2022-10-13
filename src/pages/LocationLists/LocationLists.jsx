import React from 'react';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';
import IsLoading from '../../containers/IsLoading';
import LocationFrom from '../../components/LocationFrom/LocationFrom';
import useStore from '../../store';

const LocationLists = () => {
  const {
    locations,
    getLocations,
    loading,
    updateLocation,
    postNewLocation,
    deleteLocation,
  } = useStore((state) => {
    return {
      loading: state.loading,
      locations: state.locations,
      getLocations: state.getLocations,
      updateLocation: state.updateLocation,
      postNewLocation: state.postNewLocation,
      deleteLocation: state.deleteLocation,
    };
  }, shallow);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const atSubmit = (data) => {
    if (loading) return;
    postNewLocation({ name: data.addLocation })
      .then((res) => {
        if (res.data?.status === 'success') {
          reset();
          return getLocations();
        }
        console.log('postNewLocation res:', res);
        return getLocations();
      })
      .catch((err) => console.log('postNewLocation error:', err));
  };

  React.useEffect(() => {
    getLocations();
  }, []); //eslint-disable-line

  return (
    <IsLoading>
      <div className="h-full overflow-y-scroll p-2">
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
                {...register('addLocation', { required: '不可為空白' })}
              />
            </label>
            <small className="mt-auto text-red-400">
              {errors.addLocation?.message}
            </small>
          </div>
          <div className="flex w-[40%] justify-end">
            <button type="submit" className="btn bg-success text-white">
              新增
            </button>
          </div>
        </form>
        {locations?.map((location) => {
          return (
            <LocationFrom
              location={location.name}
              loading={loading}
              onUpdateLocation={updateLocation}
              onGetLocations={getLocations}
              onDeleteLocation={deleteLocation}
              lid={location.id}
              key={location.id}
            />
          );
        })}
      </div>
    </IsLoading>
  );
};

export default React.memo(LocationLists);
