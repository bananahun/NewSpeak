import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './MyPage.module.scss';
import ProfileImage from '../../components/Profile/ProfileImage';
import Category from '../../components/Profile/Category';
import Streak from '../../components/Profile/Streak';
import userApi from '../../apis/UserApi';
import { useVocaStore } from '../../store/VocaStore';
import useAuthStore from '../../store/AuthStore';


//  user 데이터 저장로직 아직 안짬

const MyPage = () => {
  // 임시데이터
  const {user} = useAuthStore();
  interface Streaks {
    [key: string]: number;
  }



  // const streaks: Streaks = {
  //   '2024-08-15': 1,
  //   '2024-08-10': 2,
  //   // streak 데이터 생략
  // };

  const [streaks, setStreaks] = useState<Streaks>({});

  const {vocaId, setVocaId} = useVocaStore();
  
  useEffect(() => {
    const fetchStreaks = async () => {
      try {
        const fetchedStreaks = await userApi.getUserStreaks();
        setStreaks(fetchedStreaks || {}); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };
    if(!vocaId) {
      const fetchVocaIds = async () => {
        try {
          const fetchedVocaId = await userApi.getMyVocas();
          setVocaId(fetchedVocaId); // 가져온 데이터를 상태에 저장
        } catch (error) {
          console.error('Error fetching vocaIds:', error);
        }
      };

      fetchVocaIds();      
    }

    fetchStreaks(); // API 요청

    // 선호 카테고리 가져오기
},[]); // 의존성 배열에 추가

const username = user?.nickname || '뉴진스';

  return (
    <div className={styles.mypage}>
      <div className={styles.profileContainer}>
        <ProfileImage username={username} />
        <div className={styles.profileInfo}>
          <div className={styles.username}>{username}님의 프로필</div>
          <button
            className={`${styles['btn-ghost']} ${styles.changeInfoButton}`}
          >
            내 정보 변경
          </button>
        </div>
        <Category  
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
