import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import useStore from '../../store';
// import { cleanToken } from '../../services/api';

const Profile = () => {
  const [isDisable, setIsDisable] = React.useState(true);
  const [changePassword, setChangePassword] = React.useState(false);
  const [btnSwitch, setBtnSwitch] = React.useState(true);
  const { loading, user, updateUser } = useStore((state) => {
    return {
      loading: state.loading,
      user: state.user,
      updateUser: state.updateUser,
    };
  });
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user.name,
      userEmail: user.email,
    },
  });

  const atSubmit = (data) => {
    if (loading) return;
    updateUser(user.id, data)
      .then((res) => {
        if (res.data?.status === 'success') {
          console.log('postNewProduct res:', res);
        }
      })
      .catch((err) => console.log('postNewProduct error:', err));
  };

  return (
    <div className="h-full w-full p-2">
      <div
        className="h-full w-full rounded-md bg-gradient-to-br from-[#e2f2fa] to-[#518ef0] p-2 shadow-md data-active:from-[#f6e096]  data-active:to-[#f1704c]"
        data-active={user.isAdmin}
      >
        <form
          onSubmit={handleSubmit(atSubmit)}
          className="mb-3 flex overflow-y-scroll rounded-xl bg-slate-200 p-4 shadow-xl"
        >
          <div className="w-[80%] sm:flex">
            <div className="flex flex-col sm:w-[70%]">
              <label className="mb-1 flex w-full flex-col">
                <div>
                  使用者名稱：
                  <input
                    type="text"
                    placeholder="小於12字"
                    disabled={isDisable}
                    data-active={!isDisable}
                    className="w-[63%] data-active:rounded-md data-active:border-2 data-active:border-gray-300 data-active:bg-gray-100 data-active:p-1"
                    {...register('userName', {
                      maxLength: { value: 12, message: '長度超過12' },
                    })}
                  />
                </div>
                <small className="text-danger">
                  <ErrorMessage errors={errors} name="userName" />
                </small>
              </label>
              <label className="mb-1 flex w-full flex-col">
                <div>
                  E-mail：
                  <input
                    type="text"
                    placeholder="請輸入 email (ex: example@gmail.com)"
                    disabled={isDisable}
                    data-active={!isDisable}
                    className="w-[63%] data-active:rounded-md data-active:border-2 data-active:border-gray-300 data-active:bg-gray-100 data-active:p-1"
                    {...register('userEmail', {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'email 格式錯誤',
                      },
                    })}
                  />
                </div>
                <small className="text-danger">
                  <ErrorMessage errors={errors} name="userEmail" />
                </small>
              </label>
              {changePassword && (
                <>
                  <label className="mb-1 flex w-full flex-col">
                    <div>
                      修改密碼:
                      <input
                        type="text"
                        placeholder="請輸入密碼(6~12字)"
                        className="w-[63%] rounded-md border-2 border-gray-300 bg-gray-100 p-1"
                        {...register('password', {
                          maxLength: { value: 12, message: '長度超過12' },
                          minLength: { value: 6, message: '長度小於6' },
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      <ErrorMessage errors={errors} name="password" />
                    </small>
                  </label>
                  <label className="mb-1 flex w-full flex-col">
                    <div>
                      確認密碼:
                      <input
                        type="text"
                        placeholder="請輸入密碼(6~12字)"
                        className="w-[63%] rounded-md border-2 border-gray-300 bg-gray-100 p-1"
                        {...register('checkPassword', {
                          maxLength: { value: 12, message: '長度超過12' },
                          minLength: { value: 6, message: '長度小於6' },
                          validate: {
                            isMatch: (value) =>
                              value === getValues('password') || '密碼不相同',
                          },
                        })}
                      />
                    </div>
                    <small className="text-danger">
                      <ErrorMessage errors={errors} name="checkPassword" />
                    </small>
                  </label>
                </>
              )}
            </div>
            <div className="sm:w-1/2">
              <div className="mb-1 flex w-full items-center">
                使用者權限：{user.isAdmin ? '管理員' : '一般使用者'}
              </div>
              <div className="mb-1 flex w-full items-center">
                累積記錄：{user.Records.length} 筆
              </div>
            </div>
          </div>
          <div
            className="flex w-[20%] flex-col items-center"
            data-active={!isDisable}
          >
            {btnSwitch ? (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setIsDisable(false);
                  setBtnSwitch(false);
                }}
                data-active={!isDisable}
                className="btn my-auto bg-primary text-white shadow-xl data-active:my-2"
              >
                編輯
              </div>
            ) : (
              <div className="flex h-full flex-col justify-center">
                <button
                  type="submit"
                  className="btn my-2 bg-success text-white shadow-xl"
                >
                  儲存
                </button>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setIsDisable(true);
                    setChangePassword(false);
                    setBtnSwitch(true);
                    reset();
                  }}
                  className="btn my-2 bg-info text-white shadow-xl"
                >
                  取消
                </div>
              </div>
            )}
            <p
              onClick={() => {
                setChangePassword(true);
                setBtnSwitch(false);
              }}
              className="mt-auto hover:cursor-pointer hover:text-blue-700 sm:mt-3"
            >
              修改密碼
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Profile);
