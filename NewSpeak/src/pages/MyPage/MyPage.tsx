import React from "react";
import { Link } from "react-router-dom";
import styles from "./MyPage.module.scss";
import ProfileImage from "../../components/Profile/ProfileImage";
import Category from "../../components/Profile/Category";
import Streak from "../../components/Profile/Streak";

interface User {
  id: number;
  name: string;
}

const MyPage = () => {
  // 임시데이터 //
  const usertest: User = { id: 1, name: "뉴진스" };

  interface Streaks {
    [key: string]: number;
  }

  const streaks: Streaks = {
    "2024-08-15": 1,
    "2024-08-10": 2,
    "2024-08-01": 3,
    "2024-07-13": 1,
    "2024-07-11": 2,
    "2024-07-10": 1,
    "2024-07-01": 1,
    "2024-06-11": 2,
    "2024-06-10": 4,
    "2024-06-13": 1,
    "2024-06-01": 1,
  };

  return (
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
          <Link to="/wordlist">
            <button>나만의 단어장</button>
          </Link>
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
