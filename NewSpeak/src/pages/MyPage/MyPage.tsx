import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MyPage.module.scss';
import ProfileImage from '../../components/Profile/ProfileImage';
import Category from '../../components/Profile/Category';
import Streak from '../../components/Profile/Streak';

interface User {
  id: number;
  name: string;
}

const MyPage = () => {
  // 임시데이터
  const usertest: User = { id: 1, name: '뉴진스' };

  interface Streaks {
    [key: string]: number;
  }

  const streaks: Streaks = {
    '2024-08-15': 1,
    '2024-08-10': 2,
    // streak 데이터 생략
  };

  return (
    <div className={styles.mypage}>
      <div className={styles.profileContainer}>
        <ProfileImage username={usertest.name} />
        <div className={styles.profileInfo}>
          <div className={styles.username}>{usertest.name}님의 프로필</div>
          <button
            className={`${styles['btn-ghost']} ${styles.changeInfoButton}`}
          >
            내 정보 변경
          </button>
        </div>
        <Category />
      </div>
      <div className={styles.streakSection}>
        <Streak streaks={streaks} />
      </div>
      <div className={styles.buttonRow}>
        <Link to="/scraplist">
          <button className={styles['btn-ghost']}>스크랩 기사</button>
        </Link>
        <Link to="/reportlist">
          <button className={styles['btn-ghost']}>나의 보고서</button>
        </Link>
        <Link to="/word">
          <button className={styles['btn-ghost']}>나의 단어장</button>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
