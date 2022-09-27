import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container m-auto flex h-2/3 max-w-lg flex-col rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[50%]">
      <h2 className="w-full p-2 text-center">登入帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        帳號
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userId"
          placeholder="請輸入 email"
        />
        <small className="text-red-500">errorMessage</small>
      </label>
      <label className="flex h-[28%] flex-col justify-center px-2">
        密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userPassword"
          placeholder="請輸入密碼"
        />
        <small className="text-red-500">errorMessage</small>
      </label>
      <div className="my-auto flex flex-col justify-evenly md:flex-row">
        <button className="my-1 w-full rounded-md  bg-primary p-2  text-white md:w-[30%]">
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
    </div>
  );
};

export default React.memo(Login);
