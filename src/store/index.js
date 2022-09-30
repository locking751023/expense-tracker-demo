import create from 'zustand';
import {
  getJWTToken,
  verifyToken,
  fetchLogin,
  cleanToken,
} from '../services/api';

const initialState = {
  isAppInitializedComplete: false,
  user: null,
  loading: false,
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
          isAppInitializedComplete: false,
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
    onLogout() {
      cleanToken();
      window.location.reload();
    },
  };
});

export default useStore;