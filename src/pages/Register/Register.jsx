import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';
import useStore from '../../store';

const Register = () => {
  const navigate = useNavigate();
  const { onRegister, registerSuccess } = useStore((state) => {
    return {
      onRegister: state.onRegister,
      registerSuccess: state.registerSuccess,
    };
  }, shallow);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const atSubmit = (data) => {
    onRegister(data);
  };
  if (registerSuccess) {
    return <Navigate to="/user/login" />;
  }
  return (
    <form
      onSubmit={handleSubmit(atSubmit)}
      className="container m-auto flex h-2/3 max-w-lg flex-col rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[70%]"
    >
      <h2 className="w-full p-2 text-center">註冊帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        名稱
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          placeholder="請輸入名稱"
          {...register('name', { maxLength: 7 })}
        />
        {errors.name && <small className="text-danger">長度超過7</small>}
      </label>

      <label className="flex h-[33%] flex-col justify-center px-2">
        帳號
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          placeholder="請輸入 email"
          {...register('email', { required: true })}
        />
        {errors.email?.type === 'required' && (
          <small className="text-danger">此欄位為必填</small>
        )}
      </label>

      <label className="flex h-[33%] flex-col justify-center px-2">
        密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          placeholder="請輸入密碼"
          {...register('password', { required: true, maxLength: 12 })}
        />
        {errors.password?.type === 'required' && (
          <small className="text-danger">此欄位為必填</small>
        )}
        {errors.password?.type === 'maxLength' && (
          <small className="text-danger">長度超過12</small>
        )}
      </label>
      <label className="flex h-[33%] flex-col justify-center px-2">
        確認密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          placeholder="請再次輸入密碼"
          {...register('checkPassword', { required: true, maxLength: 12 })}
        />
        {errors.checkPassword?.type === 'required' && (
          <small className="text-danger">此欄位為必填</small>
        )}
        {errors.checkPassword?.type === 'maxLength' && (
          <small className="text-danger">長度超過12</small>
        )}
      </label>
      <div className="my-auto flex flex-col justify-evenly py-2 md:flex-row">
        <input
          type="submit"
          className="my-1 w-full rounded-md  bg-primary p-2  text-white md:w-[30%]"
        />
        <button
          onClick={() => navigate(-1)}
          className="my-1 w-full rounded-md  bg-light p-2 text-center text-white md:w-[30%]"
        >
          取消
        </button>
      </div>
    </form>
  );
};

export default React.memo(Register);
