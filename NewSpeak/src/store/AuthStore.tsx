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
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false, // 새로고침 시 로그인 상태 유지
  user: JSON.parse(localStorage.getItem('user') || 'null'), // 새로고침 시 유저 정보 유지


  logout: (navigate) => {
    console.log("로그아웃에 성공했어요")
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
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
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userInfo));
      } else {
        console.log('로그인에 실패!',userInfo);
        // 유저 정보가 없으면 로그아웃 상태로 설정
        set({ isLoggedIn: false, user: null });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('로그인에 실패하였습니다.', error);
      set({ isLoggedIn: false, user: null });
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  },
}));

export default useAuthStore;
