import create from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  user: null | any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: async (email: string, password: string) => {
    try {
      // 로그인 API 요청
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 상태 업데이트 및 토큰 저장
        set({ isLoggedIn: true, user: data.user, token: data.token });
        localStorage.setItem('token', data.token);
      } else {
        throw new Error(data.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      throw error;
    }
  },

  logout: () => {
    set({ isLoggedIn: false, user: null, token: null });
    localStorage.removeItem('token');
  },
}));

export default useAuthStore;
