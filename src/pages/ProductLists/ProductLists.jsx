import React from 'react';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';
import IsLoading from '../../containers/IsLoading';
import ProductFrom from '../../components/ProductFrom/ProductFrom';
import useStore from '../../store';

const ProductLists = () => {
  const {
    loading,
    products,
    getProducts,
    postNewProduct,
    updateProduct,
    deleteProduct,
  } = useStore((state) => {
    return {
      loading: state.loading,
      products: state.products,
      getProducts: state.getProducts,
      updateProduct: state.updateProduct,
      postNewProduct: state.postNewProduct,
      deleteProduct: state.deleteProduct,
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
    console.log('submit data:', data);
    postNewProduct({
      name: data.productName,
      unit: data.productUnit,
      price: Number(data.productPrice),
      cost: Number(data.productCost),
    })
      .then((res) => {
        if (res.data?.status === 'success') {
          reset();
          return getProducts();
        }
        console.log('postNewProduct res:', res);
        return getProducts();
      })
      .catch((err) => console.log('postNewProduct error:', err));
  };

  React.useEffect(() => {
    getProducts();
  }, []); //eslint-disable-line

  return (
    <IsLoading>
      <div className="h-full overflow-y-scroll p-2">
        <form
          onSubmit={handleSubmit(atSubmit)}
          className="mb-3 flex h-[40%] items-start justify-between overflow-y-scroll rounded-xl border-2 border-orange-500 bg-slate-200 p-4 shadow-xl sm:h-[30%]"
        >
          <div className="my-auto grid w-[80%] sm:grid-cols-2">
            <div className="mb-2 w-full sm:flex sm:flex-col sm:justify-between">
              <label className="flex w-full items-center">
                產品名稱：
                <input
                  type="text"
                  placeholder={errors.productName?.message || '請輸入產品名稱'}
                  className="w-[65%] rounded-md border-2 border-gray-300 bg-gray-100 p-1 sm:w-[60%]"
                  {...register('productName', { required: '不可為空白' })}
                />
              </label>
            </div>
            <div className="mb-2 w-full sm:flex sm:flex-col sm:justify-between">
              <label className="flex w-full items-center">
                重量單位：
                <input
                  type="text"
                  placeholder={errors.productUnit?.message || '請輸入產品單位'}
                  className="w-[65%] rounded-md border-2 border-gray-300 bg-gray-100 p-1 sm:w-[60%]"
                  {...register('productUnit', { required: '不可為空白' })}
                />
              </label>
            </div>
            <div className="mb-2 w-full sm:mb-0 sm:flex sm:flex-col sm:justify-between">
              <label className="flex w-full items-center">
                產品價格：
                <input
                  type="Number"
                  placeholder={errors.productPrice?.message || '請輸入產品價格'}
                  className="w-[65%] rounded-md border-2 border-gray-300 bg-gray-100 p-1 sm:w-[60%]"
                  {...register('productPrice', { required: '不可為空白' })}
                />
              </label>
            </div>
            <div className="w-full sm:flex sm:flex-col sm:justify-between">
              <label className="flex w-full items-center">
                產品成本：
                <input
                  type="Number"
                  placeholder={errors.productCost?.message || '請輸入產品成本'}
                  className="w-[65%] rounded-md border-2 border-gray-300 bg-gray-100 p-1 sm:w-[60%]"
                  {...register('productCost', { required: '不可為空白' })}
                />
              </label>
            </div>
          </div>
          <div className="my-auto flex w-[20%] justify-center">
            <button type="submit" className="btn bg-success text-white">
              新增
            </button>
          </div>
        </form>
        {products?.map((product) => {
          return (
            <ProductFrom
              product={product}
              loading={loading}
              onUpdateProduct={updateProduct}
              onGetProducts={getProducts}
              onDeleteProduct={deleteProduct}
              pid={product.id}
              key={product.id}
            />
          );
        })}
      </div>
    </IsLoading>
  );
};

export default React.memo(ProductLists);
