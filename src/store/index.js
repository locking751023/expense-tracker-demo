import create from 'zustand';
import { toastHelper, deleteConfirm, MySwal } from '../helpers/swalHelper';
import { calcShippingSum, calcStockSum } from '../helpers/calcHelper';
import {
  getJWTToken,
  cleanToken,
  verifyToken,
  fetchRegister,
  fetchLogin,
  fetchAllUsers,
  fetchPutUser,
  fetchDeleteUser,
  fetchPostNewRecord,
  fetchGetRecords,
  fetchGetRecord,
  fetchPutRecord,
  fetchDeleteRecord,
  fetchGetAllRecords,
  fetchPostNewLocation,
  fetchGetLocations,
  fetchPutLocation,
  fetchDeleteLocation,
  fetchPostNewProduct,
  fetchGetProducts,
  fetchPutProduct,
  fetchDeleteProduct,
} from '../services/api';

const initialState = {
  isAppInitializedComplete: false,
  loading: false,
  actionSuccess: false,
  passwordHide: true,
  user: null,
  users: [],
  record: [],
  records: [],
  products: [],
  locations: [],
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

    // user action
    onRegister(userData) {
      fetchRegister(userData)
        .then((res) => {
          const { response, message, status } = res;
          if (status === 'success') {
            set({ actionSuccess: true });
            toastHelper(message, status);
          }
          if (response) {
            toastHelper(response.data.message, 'error');
          }
        })
        .catch((err) => console.log('onRegister error:', err))
        .finally(() => {
          set({ actionSuccess: false });
        });
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
            toastHelper('????????????', status);
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
    setPasswordHide(prev) {
      set({ passwordHide: !prev });
    },
    onLogout() {
      cleanToken();
      window.location.reload();
    },
    getAllUsers() {
      set({ loading: true });
      fetchAllUsers()
        .then((res) => {
          set({
            users: res.data,
            loading: false,
          });
        })
        .catch((err) => console.log('getAllUsers error:', err))
        .finally(() => set({ loading: false }));
    },
    updateUser(uid, newUserData) {
      set({ loading: true });
      fetchPutUser(uid, newUserData)
        .then((res) => {
          if (res.data?.status === 'success') {
            set({ loading: false });
            toastHelper('??????????????????', 'success');
            if (res.data?.reload) {
              cleanToken();
            }
            console.log('fetchPutUser success:', res);
            window.location.reload();
            return res;
          }
          console.log('fetchPutUser error:', res);
          toastHelper('??????????????????', 'error');
          return res;
        })
        .catch((err) => console.log('updateUser error:', err))
        .finally(() => set({ loading: false }));
    },
    deleteUser(uid) {
      return deleteConfirm().then((result) => {
        if (result.isConfirmed) {
          return fetchDeleteUser(uid)
            .then((res) => {
              if (res.data?.status === 'success') {
                MySwal.fire('?????????????????????');
                return res;
              }
              console.log('fetchDeleteUser error:', res);
              MySwal.fire({
                title: res.response?.data.message || '????????????',
                icon: 'error',
              });
              return res;
            })
            .catch((err) => {
              console.log('deleteUser error:', err);
              return err;
            });
        }
        toastHelper('????????????', 'info');
        return 'canceled';
      });
    },

    // record action
    postNewRecord(newRecord) {
      set({ loading: true });
      fetchPostNewRecord(newRecord)
        .then((res) => {
          const { data, response } = res;
          if (data?.status === 'success') {
            toastHelper('????????????', data.status);
            set({ actionSuccess: true });
          }
          if (response?.data.status === 'error') {
            toastHelper(response.data.message, response.data.status);
          }
        })
        .catch((err) => console.log('postNewRecord error:', err))
        .finally(() => {
          set({ actionSuccess: false, loading: true });
        });
    },
    getRecords() {
      set({ loading: true });
      fetchGetRecords()
        .then((res) => {
          const records = res.records?.map((record) => {
            const shippingSum = calcShippingSum(record.RecordedProducts);
            const stockSum =
              calcStockSum(record.RecordedProducts) === 0
                ? '0'
                : calcStockSum(record.RecordedProducts);
            return {
              ...record,
              shippingSum,
              stockSum,
            };
          });
          set({ records, loading: false });
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
          return toastHelper('????????????', 'warning', {
            position: 'center',
            timer: false,
            timerProgressBar: false,
            showConfirmButton: true,
          });
        })
        .catch((err) => console.log('getRecord error:', err))
        .finally(() => set({ loading: false }));
    },
    updateRecord(rid, newRecord) {
      set({ loading: true });
      fetchPutRecord(rid, newRecord)
        .then((res) => {
          if (res.data.status === 'success') {
            set({ actionSuccess: true });
            return toastHelper('??????????????????', 'success');
          }
          return toastHelper('??????????????????', 'error');
        })
        .catch((err) => console.log('updateRecord error:', err))
        .finally(() => set({ actionSuccess: false, loading: false }));
    },
    deleteRecord(rid) {
      return deleteConfirm().then((result) => {
        if (result.isConfirmed) {
          return fetchDeleteRecord(rid)
            .then((res) => {
              if (res.status === 'success') {
                MySwal.fire('?????????????????????');
                set({ actionSuccess: true });
                return res;
              }
              console.log('fetchDeleteRecord error:', res);
              MySwal.fire({
                title: res.response?.data.message || '????????????',
                icon: 'error',
              });
              return res;
            })
            .catch((err) => {
              console.log('deleteRecord error:', err);
              return err;
            })
            .finally(() => {
              set({ actionSuccess: false });
            });
        }
        toastHelper('????????????', 'info');
        return 'canceled';
      });
    },
    getAllRecords() {
      set({ loading: true });
      fetchGetAllRecords()
        .then((res) => {
          set({ records: res.data?.records, loading: false });
        })
        .catch((err) => console.log('getAllRecords error:', err))
        .finally(() => set({ loading: false }));
    },

    // product action
    postNewProduct(newProduct) {
      set({ loading: true });
      return fetchPostNewProduct(newProduct)
        .then((res) => {
          const { data, response } = res;
          if (data?.status === 'success') {
            set({ loading: false });
            setTimeout(() => {
              toastHelper('????????????', data.status);
            }, 500);
          }
          if (response?.data.status === 'error') {
            set({ loading: false });
            setTimeout(() => {
              toastHelper(response.data.message, 'error');
            }, 500);
          }
          return res;
        })
        .catch((err) => {
          console.log('postNewLocation error:', err);
          return err;
        })
        .finally(() => {
          set({ loading: false });
        });
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
    updateProduct(lid, newProduct) {
      set({ loading: true });
      return fetchPutProduct(lid, newProduct)
        .then((res) => {
          if (res.data?.status === 'success') {
            set({ loading: false });
            toastHelper('??????????????????', 'success');
            return res;
          }
          console.log('fetchPutProduct error:', res);
          toastHelper(res.response?.data.message || '??????????????????', 'error');
          return res;
        })
        .catch((err) => {
          console.log('updateRecord error:', err);
          return err;
        })
        .finally(() => set({ loading: false }));
    },
    deleteProduct(lid) {
      return deleteConfirm().then((result) => {
        if (result.isConfirmed) {
          return fetchDeleteProduct(lid)
            .then((res) => {
              if (res.data?.status === 'success') {
                setTimeout(() => {
                  MySwal.fire('?????????????????????');
                }, 500);
                return res;
              }
              console.log('fetchDeleteProduct error:', res);
              setTimeout(() => {
                MySwal.fire({
                  title: res.response?.data.message || '????????????',
                  icon: 'error',
                });
              }, 500);
              return res;
            })
            .catch((err) => {
              console.log('deleteProduct error:', err);
              return err;
            });
        }
        toastHelper('????????????', 'info');
        return 'canceled';
      });
    },

    // location action
    postNewLocation(newLocation) {
      set({ loading: true });
      return fetchPostNewLocation(newLocation)
        .then((res) => {
          const { data, response } = res;
          if (data?.status === 'success') {
            setTimeout(() => {
              toastHelper('????????????', data.status);
            }, 500);
          }
          if (response?.data.status === 'error') {
            setTimeout(() => {
              toastHelper(response.data.message, 'error');
            }, 500);
          }
          set({ loading: false });
          return res;
        })
        .catch((err) => {
          console.log('postNewLocation error:', err);
          return err;
        })
        .finally(() => {
          set({ loading: false });
        });
    },
    getLocations() {
      set({ loading: true });
      fetchGetLocations()
        .then((res) => {
          set({ locations: res?.locations, loading: false });
        })
        .catch((err) => console.log('fetchGetLocations error:', err))
        .finally(() => set({ loading: false }));
    },
    updateLocation(lid, newLocation) {
      set({ loading: true });
      return fetchPutLocation(lid, newLocation)
        .then((res) => {
          if (res.data?.status === 'success') {
            set({ loading: false });
            toastHelper('??????????????????', 'success');
            return res;
          }
          console.log('fetchPutLocation error:', res);
          toastHelper(res.response?.data.message || '??????????????????', 'error');
          return res;
        })
        .catch((err) => {
          console.log('updateRecord error:', err);
          return err;
        })
        .finally(() => set({ loading: false }));
    },
    deleteLocation(lid) {
      return deleteConfirm().then((result) => {
        if (result.isConfirmed) {
          return fetchDeleteLocation(lid)
            .then((res) => {
              if (res.data?.status === 'success') {
                setTimeout(() => {
                  MySwal.fire('?????????????????????');
                }, 500);
                return res;
              }
              console.log('fetchDeleteLocation error:', res);
              setTimeout(() => {
                MySwal.fire({
                  title: res.response?.data.message || '????????????',
                  icon: 'error',
                });
              }, 500);
              return res;
            })
            .catch((err) => {
              console.log('deleteLocation error:', err);
              return err;
            });
        }
        toastHelper('????????????', 'info');
        return 'canceled';
      });
    },
  };
});

export default useStore;
