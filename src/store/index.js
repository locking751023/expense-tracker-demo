import create from 'zustand';
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
          set({
            user: res.user,
            records: res.user.Records,
          });
        })
        .catch((err) => console.log('fetchLogin error:', err))
        .finally(() => {
          set({ loading: false });
        });
    },
    onRegister(userData) {
      set({ loading: true });
      fetchRegister(userData)
        .then((res) => {
          console.log('register success:', res);
          set({ registerSuccess: true });
        })
        .catch((err) => {
          console.log('register error:', err);
        })
        .finally(() => {
          set({ loading: false });
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
          set({ record: res.record });
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
    deleteRecord(rid) {
      return fetchDeleteRecord(rid)
        .then((res) => {
          return res;
        })
        .catch((err) => console.log('deleteRecord error:', err));
    },
  };
});

export default useStore;
