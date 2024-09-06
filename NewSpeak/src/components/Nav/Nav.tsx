import React from 'react';
import logo from '../../assets/NewSpeak.png';
import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} width={'120px'} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
