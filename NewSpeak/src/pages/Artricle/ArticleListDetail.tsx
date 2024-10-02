import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // useLocation 사용
import styles from './ArticleListDetail.module.scss';
import {useCategoryStore} from '../../store/CategoryStore';
import { categories } from '../../utils/Categories';
import userApi from '../../apis/UserApi';
import useArticleStore from '../../store/ArticleStore';

// currentPage, totalPage 응답값에 맞춰 수정

interface Article {
  id: number;
  title: string;
  publishedDate: Date; // Unix 타임스탬프 형식으로 가정
  publisher ?: string;
  imageUrl : string; // 이미지 URL 필드 추가
}

const ArticleListDetail = () => {
  const { id } = useCategoryStore(); // Zustand로부터 카테고리 ID 가져오기
  const location = useLocation(); // 현재 경로 정보 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const itemsPerPage = 5;
  const isScrapPage = location.pathname === '/scraplist';
  const title = isScrapPage ? '스크랩 기사' : categories[id];
  const {setArticleMeta} = useArticleStore()
  const [newsData, setNewsData] = useState<{ count: number; data: Article[], totalPages:number }>({
    count: 0,
    data: [],
    totalPages:1,
  });  
  
  useEffect(() => {
    const fetchScrapList = async () => {
      try {
        const fetchedScrapList = await userApi.getMyArticles(currentPage, itemsPerPage);
        setNewsData(fetchedScrapList || {
          count: 0,
          data: [],
          totalPages: 1,
        }); 
      } catch (error) {
        console.error('Error fetching scrap list:', error);
      }
    };

    // 다른 곳에서 사용 시 함수랑 조건문 추가ㅣ
    if (isScrapPage) {
      fetchScrapList()
    }
    ;
  }, [currentPage, itemsPerPage, isScrapPage]); // currentPage 변경 시 데이터 다시 요청

  // 페이지에 맞는 기사를 선택하여 보여줍니다.
  const currentItems = newsData.data

  // 타임스탬프를 날짜로 변환하는 함수
  const formatDate = (timestamp: Date) => {
    const date = timestamp
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  // 페이지네이션 버튼 핸들러
  const handleNextPage = () => {
    if (currentPage < Math.ceil(newsData.data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleArticleClick = (article: Article) => {
    setArticleMeta(article|| 'default.png');
    navigate('/article'); // 페이지 이동
  };

  // 상단부 제목 설정: 스크랩 페이지에서 들어왔는지 여부 확인


  return (
    <div className={styles['article-list-container']}>
      <h1>{title}</h1> {/* 제목을 조건에 따라 변경 */}
      {/* 현재 페이지의 기사 목록 */}
      <div className={styles['article-list']}>
        {currentItems.map(item => (
          <div key={item.id}>
            <div onClick={() => handleArticleClick(item)} className={styles['article-card']}>
              <img
                src={item.imageUrl || 'default.png'}
                alt={item.title}
                className={styles['article-image']}
              />
              <div className={styles['article-info']}>
                <h2 className={styles['article-title']}>{item.title}</h2>
                <p className={styles['article-meta']}>
                  {formatDate(item.publishedDate)} | {item.publisher || '알 수 없음'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 이전/다음 버튼 */}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          이전
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === newsData.totalPages
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ArticleListDetail;
