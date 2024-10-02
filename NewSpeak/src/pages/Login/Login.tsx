import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore';
import { loginWithOAuth } from '../../apis/AuthApi';
import styles from './Login.module.scss';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import googleLogo from '../../assets/google_login.png';
import kakaoLogo from '../../assets/kakao_login_medium_narrow.png';

const Login = () => {
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);

  useEffect(() => {
    if (theme === 'dark') {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [theme]);

  const loginWith = loginWithOAuth;

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={mainLogo} alt="메인로고" style={{ height: '150px' }} />
        </Link>
      </div>
      <div className={styles.oAuthContainer}>
        <button className={styles.google} onClick={() => loginWith('google')}>
          <img src={googleLogo} alt="구글" />
          <p>구글 로그인</p>
        </button>
        <div className={styles.kakao}>
          <img
            src={kakaoLogo}
            alt="카카오"
            onClick={() => loginWith('kakao')}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
