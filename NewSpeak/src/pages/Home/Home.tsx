import React from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <div className={styles.home}>
          <h1>홈페이지</h1>
          <p>라우터 구성</p>
        </div>
      </main>
    </>
  );
};

export default Home;
