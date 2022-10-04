import create from 'zustand';
import {
  getJWTToken,
  verifyToken,
  fetchLogin,
  cleanToken,
  fetchRegister,
  fetchGetRecord,
} from '../services/api';

const initialState = {
  isAppInitializedComplete: false,
  user: null,
  loading: false,
  registerSuccess: false,
  records: [],
  record: [],
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
    getRecord(rid) {
      set({ loading: true });
      fetchGetRecord(rid)
        .then((res) => {
          set({ record: res.record });
        })
        .catch((err) => console.log('getRecord error', err))
        .finally(() => set({ loading: false }));
    },
  };
});

export default useStore;
