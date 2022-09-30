import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';
import useStore from '../../store';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, onLogin } = useStore((state) => {
    return {
      user: state.user,
      onLogin: state.onLogin,
    };
  }, shallow);

  const atSubmit = (data) => {
    onLogin(data.email, data.password);
  };

  if (user) {
    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = decodeURIComponent(
      searchParams.get('redirect_url') ?? '/records',
    );
    return <Navigate to={redirectUrl} />;
  }

  return (
    <form
      onSubmit={handleSubmit(atSubmit)}
      className="container m-auto flex h-2/3 max-w-lg flex-col rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[50%]"
    >
      <h2 className="w-full p-2 text-center">登入帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        帳號
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="email"
          id="userId"
          placeholder="請輸入 email"
          {...register('email', { required: true })}
        />
      </label>
      {errors.email && <small className="px-3 text-danger">此欄位為必填</small>}
      <label className="flex h-[28%] flex-col justify-center px-2">
        密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userPassword"
          placeholder="請輸入密碼"
          {...register('password', {
            required: true,
            maxLength: 12,
          })}
        />
      </label>
      {errors.password?.type === 'required' && (
        <small className="px-3 text-danger">此欄位為必填</small>
      )}
      {errors.password?.type === 'maxLength' && (
        <small className="px-3 text-danger">長度超過15</small>
      )}
      <div className="my-auto flex flex-col justify-evenly md:flex-row">
        <button
          type="submit"
          className="my-1 w-full rounded-md  bg-primary p-2  text-white md:w-[30%]"
        >
          登入
        </button>
        <button className="my-1 w-full rounded-md  bg-[#4267B2] p-2 text-white md:w-[30%]">
          Facebook 登入
        </button>
        <button className="my-1 w-full rounded-md  bg-[#06c755] p-2 text-white md:w-[30%]">
          Line 登入
        </button>
      </div>
      <Link
        to="/user/register"
        className="ml-auto w-[20%] p-2 text-center text-white hover:text-sky-400"
      >
        註冊
      </Link>
    </form>
  );
};

export default React.memo(Login);
