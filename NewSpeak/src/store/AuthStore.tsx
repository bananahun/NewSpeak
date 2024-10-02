import { create } from 'zustand';
import { fetchEmail, getUserInfo,logoutWithOAuth } from '../apis/AuthApi';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isLoggedIn: boolean;
  user: null | any;
  logout: (navigate:any) => void;
  checkAuth: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,

  logout: (navigate) => {
    console.log("로그아웃에 성공했어요")
    set({ isLoggedIn: false, user: null });
    logoutWithOAuth(navigate); // provider 없이 호출
  },

  checkAuth: async () => {
    try {
      // 유저 정보를 가져와서 로그인 상태를 확인
      const userInfo = await getUserInfo();
      if (userInfo) {
        // 유저 정보가 있으면 로그인 상태로 설정
        console.log('로그인에 성공했어요!',userInfo);
        set({ isLoggedIn: true, user: userInfo });
      } else {
        console.log('로그인에 실패!',userInfo);
        // 유저 정보가 없으면 로그아웃 상태로 설정
        set({ isLoggedIn: false, user: null });
      }
    } catch (error) {
      console.error('로그인에 실패하였습니다.', error);
      set({ isLoggedIn: false, user: null });
    }
  },
}));

export default useAuthStore;
