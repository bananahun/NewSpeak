import { create } from 'zustand';
import { fetchEmail, getUserInfo } from '../apis/AuthApi';

interface AuthState {
  isLoggedIn: boolean;
  user: null | any;
  logout: () => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,

  logout: () => {
    set({ isLoggedIn: false, user: null });
  },

  checkAuth: async () => {
    try {
      const userEmail = await fetchEmail();
      console.log(userEmail.status);
      if (userEmail) {
        if (userEmail.status === 403) {
          set({ isLoggedIn: true });
        }
      }
    } catch (error) {
      console.error(error);
    }
    // try {
    //   const userInfo = await getUserInfo();
    //   console.log(userInfo);
    // } catch (error) {
    //   console.error('Failed to fetch user info:', error);
    //   set({ isLoggedIn: false });
    // }
    // if (token) {
    //   set({ isLoggedIn: true });
    // } else {
    //   set({ isLoggedIn: false });
    // }
  },
}));

export default useAuthStore;
