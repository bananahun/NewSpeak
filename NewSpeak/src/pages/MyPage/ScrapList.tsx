import React,{useEffect, useState} from 'react';
import userApi from '../../apis/UserApi';
// import styles from './ScrapList.module.scss';
import ArticleListDetail from '../Artricle/ArticleListDetail';
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 네비게이션 import
import useArticleStore from '../../store/ArticleStore';  // Zustand store import

const ScrapList = () => {
  const [scrapList, setScrapList] = useState([]);
  const { setArticleMeta } = useArticleStore();  // Zustand 상태 사용
  const navigate = useNavigate();  // 페이지 이동을 위한 네비게이션

  useEffect(()=>{
    const fetchScrapList = async () => {
      try {
        const fetchedScrapList = await userApi.getMyArticles(0,100);
        setScrapList(fetchedScrapList.content); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching streaks:', error);
      }
    };

    fetchScrapList(); // API 요청
  }, []);  // 빈 배열을 의존성 배열로 추가하여 처음 한 번만 실행되도록 설정
    // ArticleMeta 상태를 설정하고 상세 페이지로 이동하는 함수
    const loadArticleDetail = (article) => {
      setArticleMeta({
        id: article.id,
        title: article.title,
        imageUrl: article.imageUrl,
      });
      navigate('/article');  // /article 페이지로 이동
    };
  
  return (
    <div>
      <ArticleListDetail articles={scrapList} onArticleClick={loadArticleDetail} />
      </div>
  );
};

export default ScrapList;
