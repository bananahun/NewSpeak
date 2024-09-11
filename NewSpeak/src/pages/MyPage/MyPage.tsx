import React from 'react';
import styles from './MyPage.module.scss';
import Nav from '../../components/Nav/Nav';
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
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.navbar}>
        <Nav />
      </div>
      <div className={styles.content}>
        <div className={styles.mypage}>
          <div className={styles.profileContainer}>
            <ProfileImage username={usertest.name} />
            <div className={styles.profileInfo}>
              <div className={styles.username}>{usertest.name}님의 프로필</div>
              <button className={styles.changeInfoButton}>내 정보 변경</button>
            </div>
            <Category />
          </div>

          <div className={styles.streakSection}>
            <Streak streaks={streaks} />
          </div>
          <div className={styles.buttonRow}>
            <button>Button 1</button>
            <button>Button 2</button>
            <button>Button 3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
