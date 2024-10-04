import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';
import { mySwal } from '../Alert/CustomSwal';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isLoggedIn, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    checkLoginStatus();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      mySwal(
        '로그인이 필요합니다.',
        '확인을 누르면 로그인 페이지로 이동합니다.',
        'warning',
        '',
        true,
        false,
        '확인',
        '',
      ).then(() => {
        navigate('/login');
      });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return null;
  }

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
