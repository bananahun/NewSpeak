import React,{useEffect, useState} from 'react';
import userApi from '../../apis/UserApi';
// import styles from './ScrapList.module.scss';
import ArticleListDetail from '../Artricle/ArticleListDetail';
const ScrapList = () => {
  const [scrapList, setScrapList] = useState([]);
  
  useEffect(()=>{
    const fetchScrapList = async () => {
      try {
        const fetchedScrapList = await userApi.getMyArticles();
        setScrapList(fetchedScrapList); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };

    fetchScrapList(); // API 요청
  })
  return (
    <div>
      <ArticleListDetail />
    </div>
  );
};

export default ScrapList;
