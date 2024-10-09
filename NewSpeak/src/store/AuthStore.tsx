import { create } from 'zustand';
import { getUserInfo, logoutWithOAuth } from '../apis/AuthApi';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isLoggedIn: boolean;
  user: null | any;
  tutorialActive: boolean;
  setTutorialActive: (value: boolean) => void;
  logout: (navigate: any) => void;
  checkAuth: () => void;
}

const getTutorialActive = () => {
  const tutorialActive = localStorage.getItem('tutorialActive');
  if (tutorialActive === 'false') {
    return false;
  } else {
    return true;
  }
};

const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false, // 새로고침 시 로그인 상태 유지
  user: JSON.parse(localStorage.getItem('user') || 'null'), // 새로고침 시 유저 정보 유지
  tutorialActive: getTutorialActive(),

  setTutorialActive: (value: boolean) => {
    set({ tutorialActive: value });
    localStorage.setItem('tutorialActive', value.toString());
  },

  logout: navigate => {
    console.log('로그아웃에 성공했어요');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    set({ isLoggedIn: false, user: null });
    logoutWithOAuth(navigate);
  },

  checkAuth: async () => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          console.log('로그인에 성공했어요!', userInfo);
          set({ isLoggedIn: true, user: userInfo });
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(userInfo));
        } else {
          console.log('로그인에 실패!', userInfo);
          set({ isLoggedIn: false, user: null });
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('user');
        }
        resolve();
      } catch (error) {
        console.error('로그인에 실패하였습니다.', error);
        set({ isLoggedIn: false, user: null });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        reject(error);
      }
    });
  },
}));

export default useAuthStore;
