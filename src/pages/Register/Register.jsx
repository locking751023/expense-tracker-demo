import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="container m-auto flex h-2/3 max-w-lg flex-col rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[70%]">
      <h2 className="w-full p-2 text-center">註冊帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        名稱
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userId"
          placeholder="請輸入名稱"
        />
        <small className="text-red-500">errorMessage</small>
      </label>
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
      <label className="flex h-[33%] flex-col justify-center px-2">
        密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userPassword"
          placeholder="請輸入密碼"
        />
        <small className="text-red-500">errorMessage</small>
      </label>
      <label className="flex h-[33%] flex-col justify-center px-2">
        確認密碼
        <input
          className="mt-2 rounded-sm p-2 leading-5"
          type="text"
          id="userPassword"
          placeholder="請再次輸入密碼"
        />
        <small className="text-red-500">errorMessage</small>
      </label>
      <div className="my-auto flex flex-col justify-evenly py-2 md:flex-row">
        <button className="my-1 w-full rounded-md  bg-primary p-2  text-white md:w-[30%]">
          註冊
        </button>
        <button
          onClick={() => navigate(-1)}
          className="my-1 w-full rounded-md  bg-light p-2 text-center text-white md:w-[30%]"
        >
          取消
        </button>
      </div>
    </div>
  );
};

export default React.memo(Register);
