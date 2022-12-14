import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import shallow from 'zustand/shallow';
import { ErrorMessage } from '@hookform/error-message';
import useStore from '../../store';

const Register = () => {
  const navigate = useNavigate();
  const { onRegister, actionSuccess, passwordHide, setPasswordHide } = useStore(
    (state) => {
      return {
        onRegister: state.onRegister,
        actionSuccess: state.actionSuccess,
        passwordHide: state.passwordHide,
        setPasswordHide: state.setPasswordHide,
      };
    },
    shallow,
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const atSubmit = (data) => {
    onRegister(data);
  };
  if (actionSuccess) {
    return <Navigate to="/user/login" />;
  }

  return (
    <form
      onSubmit={handleSubmit(atSubmit)}
      className="container m-auto flex max-h-[500px] max-w-lg flex-col overflow-y-scroll rounded-xl border-8 shadow-xl backdrop-blur-lg md:h-[55%] lg:overflow-y-hidden"
    >
      <h2 className="w-full p-2 text-center">註冊帳號</h2>
      <label className="flex h-[33%] flex-col justify-center px-2">
        <p className="my-1">名稱</p>
        <input
          className="rounded-sm p-2 leading-5"
          type="text"
          placeholder="名稱字數小於12(王小明)"
          {...register('name', {
            maxLength: { value: 12, message: '長度超過12' },
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="name" />
        </small>
      </label>

      <label className="flex h-[33%] flex-col justify-center px-2">
        <p className="my-1">帳號</p>
        <input
          className="rounded-sm p-2 leading-5"
          type="text"
          placeholder="請輸入 email (ex: example@gmail.com)"
          {...register('email', {
            required: '此欄位為必填',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'email 格式錯誤',
            },
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="email" />
        </small>
      </label>

      <label className="flex h-[33%] flex-col justify-center px-2">
        <div className="flex items-baseline">
          <p className="my-1">密碼</p>
          <p
            className=" ml-2 text-xs hover:cursor-pointer hover:text-blue-600"
            onClick={() => {
              setPasswordHide(passwordHide);
            }}
          >
            {passwordHide ? '顯示密碼' : '隱藏密碼'}
          </p>
        </div>
        <input
          className="w-full rounded-sm p-2 leading-5"
          type={passwordHide ? 'password' : 'text'}
          placeholder="請輸入密碼(6~12字)"
          {...register('password', {
            required: '此欄位為必填',
            maxLength: { value: 12, message: '長度超過12' },
            minLength: { value: 6, message: '長度小於6' },
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="password" />
        </small>
      </label>
      <label className="flex h-[33%] flex-col justify-center px-2">
        <p className="my-1">確認密碼</p>
        <input
          className="rounded-sm p-2 leading-5"
          type={passwordHide ? 'password' : 'text'}
          placeholder="請再次輸入密碼"
          {...register('checkPassword', {
            required: '此欄位為必填',
            maxLength: { value: 12, message: '長度超過12' },
            minLength: { value: 6, message: '長度小於6' },
            validate: {
              isMatch: (value) =>
                value === getValues('password') || '密碼不相同',
            },
          })}
        />
        <small className="text-danger">
          <ErrorMessage errors={errors} name="checkPassword" />
        </small>
      </label>
      <div className="my-auto flex flex-col justify-evenly py-2 px-2 md:flex-row md:px-0">
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
