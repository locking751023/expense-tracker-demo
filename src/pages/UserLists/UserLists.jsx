import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';

const UserLists = () => {
  const { users, getAllUsers, deleteUser } = useStore((state) => {
    return {
      users: state.users,
      getAllUsers: state.getAllUsers,
      deleteUser: state.deleteUser,
    };
  }, shallow);

  const atDeleteUser = async (uid) => {
    deleteUser(uid)
      .then((res) => {
        if (res.data?.status) return getAllUsers();
        return console.log('atDeleteUser res:', res);
      })
      .catch((err) => console.log('atDeletedUser error:', err));
  };

  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className="h-full overflow-y-scroll p-2">
      {users?.userRemovePassword?.map((user) => {
        return (
          <div
            className="mb-3 flex justify-between rounded-xl bg-slate-200 p-2 shadow-xl"
            key={user.id}
          >
            <div>
              <div>
                <div>使用者名稱：{user.name}</div>
                <div>E-mail：{user.email}</div>
              </div>
              <div>
                <div>使用者權限：{user.isAdmin ? '管理員' : '一般使用者'}</div>
                <div>累積記錄：{user.Records.length} 筆</div>
              </div>
            </div>
            <button
              onClick={() => {
                atDeleteUser(user.id);
              }}
              className="btn my-auto bg-danger text-white shadow-xl"
            >
              刪除
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(UserLists);
