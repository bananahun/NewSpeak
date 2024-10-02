import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // useLocation 사용
import styles from './ArticleListDetail.module.scss';
import {useCategoryStore} from '../../store/CategoryStore';
import { categories } from '../../utils/Categories';
import useArticleStore from '../../store/ArticleStore'; // ArticleStore import

const ArticleListDetail: React.FC<{ articles: any[], onArticleClick: (article: any) => void }> = ({ articles = [], onArticleClick }) => {
  const { id } = useCategoryStore(); // Zustand로부터 카테고리 ID 가져오기
  const location = useLocation(); // 현재 경로 정보 가져오기
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { setArticleMeta } = useArticleStore(); 

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  // 페이지에 맞는 기사를 선택하여 보여줍니다.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem) || [];
8
  // 타임스탬프를 날짜로 변환하는 함수
  const formatDate = (publishedDate: string) => {
    const date = new Date(publishedDate); // number 타입으로 처리
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  

  // 기사 클릭 시 articleMeta 저장 및 상세 페이지 이동
  const handleArticleClick = (item: any) => {
    const articleMeta = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
    };
    setArticleMeta(articleMeta); // articleMeta 저장
    navigate(`/article/`); // 해당 기사 상세 페이지로 이동
  };

  // 페이지네이션 버튼 핸들러
  const handleNextPage = () => {
    if (currentPage < Math.ceil(articles.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 상단부 제목 설정: 스크랩 페이지에서 들어왔는지 여부 확인
  const isScrapPage = location.pathname === '/scraplist';
  const title = isScrapPage ? '스크랩 기사' : categories[id];

  return (
    <div className={styles['article-list-container']}>
      <h1>{title}</h1> {/* 제목을 조건에 따라 변경 */}
      {/* 현재 페이지의 기사 목록 */}
      <div className={styles['article-list']}>
        {currentItems.map((item) => (
          <div key={item.id} onClick={() => handleArticleClick(item)}>
            <a href={`/article/`} className={styles['article-card']}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className={styles['article-image']}
              />
              <div className={styles['article-info']}>
                <h2 className={styles['article-title']}>{item.title}</h2>
                <p className={styles['article-meta']}>
                  {formatDate(item.publishedDate)} | {item.publisher}
                </p>
              </div>
            </a>
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
            currentPage === Math.ceil(articles.length / itemsPerPage)
          }
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default ArticleListDetail;
