import create from 'zustand';
import { toastHelper } from '../helpers/swalHelper';
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
          set({ records: res.records });
        })
        .catch((err) => console.log('getRecord error:', err))
        .finally(() => set({ loading: false }));
    },
    getRecord(rid) {
      set({ loading: true });
      fetchGetRecord(rid)
        .then((res) => {
          if (res.record) {
            return set({ record: res.record });
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
          set({ products: res.products });
        })
        .catch((err) => console.log('fetchGetProducts error:', err))
        .finally(() => set({ loading: false }));
    },
    getLocations() {
      set({ loading: true });
      fetchGetLocations()
        .then((res) => {
          set({ locations: res.locations });
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
    async deleteRecord(rid) {
      return fetchDeleteRecord(rid)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
  };
});

export default useStore;
