import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Item from '../../components/Item';
import InputForm from '../../components/InputForm';
import NAVITEMS from '../Record/NavItems.json';
import productSeeder from '../../data/productSeeder';
import locationSeeder from '../../data/locationSeeder';

const NewRecord = () => {
  const formMethod = useForm({ mode: 'onChange' });
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = formMethod;

  const calRevenue = useCallback((data) => {
    const revenue = Object.values(data.product).reduce((total, currentItem) => {
      return total + currentItem.subTotalValue;
    }, 0);
    return revenue;
  }, []);

  const atSubmit = (data) => {
    const newData = {
      ...data,
      revenue: calRevenue(data),
    };
    console.log('newData:', newData);
  };

  return (
    <form onSubmit={handleSubmit(atSubmit)} className="h-full w-full p-3">
      <header className="flex h-[10%] justify-between">
        <div className="flex flex-col sm:flex-row">
          <div className="mb-2 flex sm:m-2 sm:flex-col">
            <label>
              日期：
              <input
                type="date"
                {...register('date', { required: '日期為必填' })}
                className="rounded-md border-2 bg-gray-100 p-1"
              />
            </label>
            <small className="mt-auto text-red-400">
              {errors.date?.message}
            </small>
          </div>
          <div className="mb-2 flex sm:m-2 sm:flex-col">
            <label>
              地點：
              <select
                {...register('location', { required: '請選擇地點' })}
                className="rounded-md border-2 bg-gray-100 p-1"
              >
                <option value="">請選擇地點</option>
                {locationSeeder.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <small className="mt-auto text-red-400">
              {errors.location?.message}
            </small>
          </div>
        </div>
        <div className="my-auto flex ">
          <button type="submit" className="btn mx-2 bg-success text-white">
            儲存
          </button>
          <Link to="/" className="btn mx-2 bg-light text-white">
            取消
          </Link>
        </div>
      </header>
      <div className="grid h-[8%] grid-cols-6 gap-1 border-b-2 border-gray-500">
        {NAVITEMS.map((item) => (
          <Item item={item} key={item} />
        ))}
      </div>
      <div className="max-h-[83%] overflow-y-scroll shadow-md">
        {productSeeder.map((product) => (
          <InputForm
            product={product}
            control={control}
            setValue={setValue}
            key={product.id}
          />
        ))}
      </div>
    </form>
  );
};

export default React.memo(NewRecord);
