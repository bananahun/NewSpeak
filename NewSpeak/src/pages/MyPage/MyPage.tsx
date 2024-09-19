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
  // 임시데이터 //
  const usertest: User = { id: 1, name: '뉴진스' };

  interface Streaks {
    [key: string]: number;
  }

  const streaks: Streaks = {
    '2024-08-15': 1,
    '2024-08-10': 2,
    '2024-08-01': 3,
    '2024-07-13': 1,
    '2024-07-11': 2,
    '2024-07-10': 1,
    '2024-07-01': 1,
    '2024-06-11': 2,
    '2024-06-10': 4,
    '2024-06-13': 1,
    '2024-06-01': 1,
  };

  return (
    <div className={styles.mypage}>
      <div className={styles.profileContainer}>
        <ProfileImage username={usertest.name} />
        <div className={styles.profileInfo}>
          <div className={styles.username}>{usertest.name}님의 프로필</div>
          {/* '내 정보 변경' 버튼에 .changeInfoButton 클래스 추가 */}
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
        {/* 모든 버튼에 'btn-ghost' 클래스를 추가 */}
        <Link to="/wordlist">
          <button className={styles['btn-ghost']}>나의 단어장</button>
        </Link>
        <Link to="/scrap">
          <button className={styles['btn-ghost']}>스크랩 기사</button>
        </Link>
        <Link to="/log">
          <button className={styles['btn-ghost']}>경험치 로그</button>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
