import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore';
import styles from './Login.module.scss';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import googleLogo from '../../assets/google_login.png';
import kakaoLogo from '../../assets/kakao_login_medium_narrow.png';

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [mainLogo, setMainLogo] = useState(logo);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'light',
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (selectedTheme === 'dark') {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [selectedTheme, setSelectedTheme]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('로그인 중 오류발생:', error);
    }
  };

  const loginWith = (provider: string) => async () => {
    const prodUrl = 'http://j11e103.p.ssafy.io:8081';
    const localUrl = 'http://localhost:8080';
    const baseUrl = prodUrl;
    console.log(1);
    // console.log(baseUrl + provider);
    try {
      const redirectUrl = `${baseUrl}/oauth2/authorization/${provider}`;
      window.location.href = redirectUrl;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={mainLogo} alt="메인로고" style={{ height: '150px' }} />
        </Link>
      </div>
      <div className={styles.oAuthContainer}>
        <button className={styles.google} onClick={loginWith('google')}>
          <img src={googleLogo} alt="구글" />
          <p>구글 로그인</p>
        </button>
        <div className={styles.kakao}>
          <img src={kakaoLogo} alt="카카오" onClick={loginWith('kakao')} />
        </div>
      </div>
    </div>
  );
};

export default Login;
