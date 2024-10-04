import React, { useEffect, useState } from 'react';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import useThemeStore from '../../store/ThemeStore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  });

  return (
    <div className={styles.pageContainer}>
      <img
        src={mainLogo}
        className={styles.logo}
        alt="Not Found"
        onClick={() => navigate('/')}
      />
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFound;
