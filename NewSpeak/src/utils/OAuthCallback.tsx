import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/register');
  }, [navigate]);

  return <div>Loading</div>;
};

export default OAuthCallback;
