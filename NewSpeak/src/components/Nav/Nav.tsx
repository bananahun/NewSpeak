import React, { useState, useEffect } from 'react';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import styles from './Nav.module.scss';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

const Nav: React.FC = () => {
  const [mainLogo, setMainLogo] = useState(logo);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'light',
  );

  useEffect(() => {
    setSelectedTheme(localStorage.getItem('theme') || 'light');
  }, [localStorage.getItem('theme')]);

  useEffect(() => {
    if (selectedTheme === 'light') {
      setMainLogo(logo);
    } else {
      setMainLogo(logoWhite);
    }
  });

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={mainLogo} width={'160px'} />
        </div>
        <div className={styles.switcher}>
          <ThemeSwitcher />
        </div>
      </nav>
    </>
  );
};

export default Nav;
