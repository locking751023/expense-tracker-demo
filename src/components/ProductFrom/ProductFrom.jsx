import React from 'react';
import { useForm } from 'react-hook-form';

const ProductFrom = (props) => {
  const {
    product,
    loading,
    pid,
    onUpdateProduct,
    onGetProducts,
    onDeleteProduct,
  } = props;
  const [isDisabled, setIsDisabled] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      productName: product.name,
      productUnit: product.unit,
      productPrice: product.price,
      productCost: product.cost,
    },
  });

  const atSubmit = (data) => {
    if (loading) return;
    onUpdateProduct(pid, {
      name: data.productName,
      unit: data.productUnit,
      price: Number(data.productPrice),
      cost: Number(data.productCost),
    })
      .then((res) => {
        if (res.data?.status === 'success') return onGetProducts();
        return console.log('onUpdateProduct res:', res);
      })
      .catch((err) => console.log('onUpdateProduct error:', err));
  };

  const atDeleteProduct = (productId) => {
    onDeleteProduct(productId)
      .then((res) => {
        if (res.data?.status === 'success') return onGetProducts();
        return console.log('onUpdateProduct res:', res);
      })
      .catch((err) => console.log('onUpdateProduct error:', err));
  };

  return (
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
              className="w-[65%] rounded-md border-2 border-gray-300 bg-gray-100 p-1 sm:w-[60%]"
              {...register('productCost', { required: '不可為空白' })}
            />
          </label>
        </div>
      </div>
      <div className="my-auto flex w-[20%] flex-col items-center  sm:justify-center md:flex-row">
        {isDisabled ? (
          <>
            <div
              role="button" // resolve no-noninteractive-element-interactions
              tabIndex={0} // resolve interactive-supports-focus
              onClick={() => {
                setIsDisabled(false);
              }}
              className="btn my-2 bg-primary text-white sm:my-1 md:mx-1 lg:mx-2"
            >
              編輯
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                atDeleteProduct(pid);
              }}
              className="btn my-2 bg-danger text-white sm:my-1 md:mx-1 lg:mx-2"
            >
              刪除
            </div>
          </>
        ) : (
          <>
            <button
              type="submit"
              className="btn my-2 bg-success text-white sm:my-1 md:mx-1 lg:mx-2"
            >
              儲存
            </button>
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setIsDisabled(true);
              }}
              className="btn my-2 bg-info text-white sm:my-1 md:mx-1 lg:mx-2"
            >
              取消
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default React.memo(ProductFrom);
