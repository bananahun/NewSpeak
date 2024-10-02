import React,{useEffect, useState} from 'react';
import userApi from '../../apis/UserApi';
// import styles from './ScrapList.module.scss';
import ArticleListDetail from '../Artricle/ArticleListDetail';
const ScrapList = () => {
  const [scrapList, setScrapList] = useState([]);
  
  useEffect(()=>{
    const fetchScrapList = async () => {
      try {
        const fetchedScrapList = await userApi.getMyArticles(0,100);
        setScrapList(fetchedScrapList); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };

    fetchScrapList(); // API 요청
  }, []);  // 빈 배열을 의존성 배열로 추가하여 처음 한 번만 실행되도록 설정
  return (
    <div>
      <ArticleListDetail articles={scrapList} />
    </div>
  );
};

export default ScrapList;
