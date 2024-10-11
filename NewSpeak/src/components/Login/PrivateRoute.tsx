import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';
import { mySwal } from '../Alert/CustomSwal';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    if (location.pathname === '/') return;
    if (!isLoggedIn && !isLoading) {
      mySwal(
        '로그인이 필요합니다.',
        '',
        'warning',
        '',
        true,
        false,
        '확인',
        '',
      ).then(() => {
        navigate('/welcome');
      });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return null;
  }

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoute;
