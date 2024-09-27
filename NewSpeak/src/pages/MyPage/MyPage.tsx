import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './MyPage.module.scss';
import ProfileImage from '../../components/Profile/ProfileImage';
import Category from '../../components/Profile/Category';
import Streak from '../../components/Profile/Streak';
import userApi from '../../apis/UserApi';
import { usePreferredCategoryStore } from '../../store/CategoryStore';

interface User {
  id: number;
  name: string;
}
//  user 데이터 저장로직 아직 안짬

const MyPage = () => {
  // 임시데이터
  const usertest: User = { id: 1, name: '뉴진스' };

  interface Streaks {
    [key: string]: number;
  }



  // const streaks: Streaks = {
  //   '2024-08-15': 1,
  //   '2024-08-10': 2,
  //   // streak 데이터 생략
  // };

  const [streaks, setStreaks] = useState<Streaks>({});
  // const { preferredCategories, getPreferredCategory, updatePreferredCategory } = usePreferredCategoryStore();
  const { preferredCategories, getPreferredCategory} = usePreferredCategoryStore();

  
  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const fetchedStreaks = await userApi.getUserStreaks();
        setStreaks(fetchedStreaks || {}); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };

    fetchStreaks(); // API 요청

    // 선호 카테고리 가져오기
    const fetchPreferredCategories = async () => {
      if (!preferredCategories) { // 값이 없으면
        await getPreferredCategory(); // 서버에 요청
      }
    };

    fetchPreferredCategories(); // 선호 카테고리 요청
  }, [preferredCategories, getPreferredCategory]); // 의존성 배열에 추가



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
        <Category 
          preferredCategories={preferredCategories} 
          // updatePreferredCategory={updatePreferredCategory} 
        />
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
