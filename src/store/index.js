import create from 'zustand';
import { toastHelper, MySwal } from '../helpers/swalHelper';
import {
  getJWTToken,
  verifyToken,
  fetchLogin,
  cleanToken,
  fetchRegister,
  fetchGetRecords,
  fetchGetRecord,
  fetchGetProducts,
  fetchGetLocations,
  fetchDeleteRecord,
  fetchPostNewRecord,
  fetchPutRecord,
  fetchAllUsers,
  fetchDeleteUser,
} from '../services/api';

const initialState = {
  isAppInitializedComplete: false,
  user: null,
  loading: false,
  registerSuccess: false,
  records: [],
  record: [],
  products: [],
  locations: [],
  postRecordSuccess: false,
};

const useStore = create((set) => {
  return {
    // ------------- initialize state -------------
    ...initialState,
    // ------------- action -------------
    init() {
      console.log('init');
      const token = getJWTToken();
      if (token) {
        verifyToken(token)
          .then((res) => {
            set({
              user: res.user,
              records: res.user.Records,
            });
          })
          .catch((err) => console.log('error', err))
          .finally(() => {
            set({
              isAppInitializedComplete: true,
            });
          });
      } else {
        set({
          isAppInitializedComplete: true,
        });
      }
    },
    onLogin(email, password) {
      set({ loading: true });
      fetchLogin(email, password)
        .then((res) => {
          const { response, data, status } = res;
          if (status === 'success') {
            set({
              user: data.user,
              records: data.user.Records,
              loading: false,
            });
            toastHelper('登入成功', status);
          }

          if (response) {
            toastHelper(response.data.message, 'error');
          }
        })
        .catch((err) => console.log('onLogin error:', err))
        .finally(() => {
          set({ loading: false });
        });
    },
    onRegister(userData) {
      fetchRegister(userData)
        .then((res) => {
          const { response, message, status } = res;
          if (status === 'success') {
            set({ registerSuccess: true });
            toastHelper(message, status);
          }
          if (response) {
            toastHelper(response.data.message, 'error');
          }
        })
        .catch((err) => console.log('onRegister error:', err))
        .finally(() => {
          set({ registerSuccess: false });
        });
    },
    onLogout() {
      cleanToken();
      window.location.reload();
    },
    getRecords() {
      set({ loading: true });
      fetchGetRecords()
        .then((res) => {
          set({ records: res.records, loading: false });
        })
        .catch((err) => console.log('getRecord error:', err))
        .finally(() => set({ loading: false }));
    },
    getRecord(rid) {
      set({ loading: true });
      fetchGetRecord(rid)
        .then((res) => {
          if (res.record) {
            return set({ record: res.record, loading: false });
          }
          return toastHelper('查無資料', 'warning', {
            position: 'center',
            timer: false,
            timerProgressBar: false,
            showConfirmButton: true,
          });
        })
        .catch((err) => console.log('getRecord error:', err))
        .finally(() => set({ loading: false }));
    },
    getProducts() {
      set({ loading: true });
      fetchGetProducts()
        .then((res) => {
          set({ products: res.products, loading: false });
        })
        .catch((err) => console.log('fetchGetProducts error:', err))
        .finally(() => set({ loading: false }));
    },
    getLocations() {
      set({ loading: true });
      fetchGetLocations()
        .then((res) => {
          set({ locations: res.locations, loading: false });
        })
        .catch((err) => console.log('fetchGetLocations error:', err))
        .finally(() => set({ loading: false }));
    },
    postNewRecord(newRecord) {
      fetchPostNewRecord(newRecord)
        .then((res) => {
          const { data, response } = res;
          if (data?.status === 'success') {
            toastHelper('新增成功', data.status);
            set({ postRecordSuccess: true });
          }
          if (response?.data.status === 'error') {
            toastHelper(response.data.message, response.data.status);
          }
        })
        .catch((err) => console.log('postNewRecord error:', err))
        .finally(() => {
          set({ postRecordSuccess: false });
        });
    },
    deleteRecord(rid) {
      return fetchDeleteRecord(rid)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    updateRecord(rid, newRecord) {
      fetchPutRecord(rid, newRecord)
        .then((res) => {
          if (res.data.status === 'success') {
            set({ updateRecordSuccess: true });
            return toastHelper('資料修改成功', 'success');
          }
          return toastHelper('資料修改失敗', 'error');
        })
        .catch((err) => console.log('updateRecord error:', err))
        .finally(() => set({ updateRecordSuccess: false }));
    },
    getAllUsers() {
      set({ loading: true });
      fetchAllUsers()
        .then((res) => {
          set({ users: res.data, loading: false });
        })
        .catch((err) => console.log('getAllUsers error:', err))
        .finally(() => set({ loading: false }));
    },
    deleteUser(uid) {
      return MySwal.fire({
        title: '確定要刪除這筆記錄?',
        text: '刪除後無法復原!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '刪除!',
      }).then((result) => {
        if (result.isConfirmed) {
          return fetchDeleteUser(uid)
            .then((res) => {
              if (res.data?.status === 'success') {
                MySwal.fire('記錄已成功刪除');
                return res;
              }
              console.log('fetchDeleteUser success:', res);
              MySwal.fire({
                tittle: res.response?.data.message || '發生錯誤',
                icon: 'error',
              });
              return res;
            })
            .catch((err) => {
              console.log('fetchDeleteUser error:', err);
              return err;
            });
        }
        toastHelper('取消刪除', 'info');
        return 'canceled';
      });
    },
  };
});

export default useStore;
