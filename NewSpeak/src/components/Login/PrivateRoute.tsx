import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuthStore();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      // alert가 완료된 후에 리다이렉트가 되도록 Promise를 사용
      const confirmRedirect = async () => {
        await new Promise<void>((resolve) => {
          window.alert('로그인이 필요합니다. 확인을 누르면 로그인 페이지로 이동합니다.');
          resolve(); // alert 확인 후에 resolve 호출
        });
        setRedirect(true); // 리다이렉트 상태 설정
      };

      confirmRedirect();
    }
  }, [isLoggedIn]);

  // 리다이렉트 상태일 경우 로그인 페이지로 이동
  if (!isLoggedIn && redirect) {
    return <Navigate to="/login" replace />;
  }

  // 로그인이 되어 있으면 자식 컴포넌트 렌더링
  return children;
};

export default PrivateRoute;
