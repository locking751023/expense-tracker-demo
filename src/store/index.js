import create from 'zustand';
import {
  getJWTToken,
  verifyToken,
  fetchLogin,
  cleanToken,
  fetchRegister,
} from '../services/api';

const initialState = {
  isAppInitializedComplete: false,
  user: null,
  loading: false,
  registerSuccess: false,
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
          set({ user: res.user });
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
  };
});

export default useStore;
