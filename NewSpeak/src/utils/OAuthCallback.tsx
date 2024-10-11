import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/register');
    }
  }, [navigate]);

  return <div>Loading</div>;
};

export default OAuthCallback;
