import React, { useState } from 'react';
import useArticleApi from '../../apis/ArticleApi';
import styles from './ArticleSearch.module.scss';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/AuthStore'; // AuthStore에서 로그인 상태를 가져오기 위해 추가

interface Article {
  id: number;
  title: string;
  imageUrl: string;
  publishedDate: string;
  publisher: string;
}
const ArticleSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [articles, setArticles] = useState<Article[]>([]); // 검색 결과 상태
  const [showResults, setShowResults] = useState<boolean>(false); // 결과 표시 여부

  const { isLoggedIn } = useAuthStore(); // 로그인 상태를 가져옴
  const navigate = useNavigate(); // 라우팅을 위한 네비게이션 훅

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(); // 검색 함수 실행
    }
  };

  const handleSearch = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
      return; // 로그인되지 않은 경우 검색 함수 중단
    }
    
    if (!searchQuery.trim()) return; // 빈 검색어는 무시
    
    try {
      const result = await useArticleApi.getArticleSearch(searchQuery, 0);
      setArticles(result || []); // 결과 설정
      setShowResults(true); // 검색 결과를 표시
    } catch (error) {
      console.error(`"${searchQuery}"로 검색한 기사 가져오기 에러:`, error);
      setArticles([]); // 오류 발생 시 빈 배열로 설정하여 오류 방지
    }
  };

  return (
    <div className={styles.searchSection}>
      <div
        className={`${styles.searchContainer} ${
          showResults ? styles.moveUp : ''
        }`}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          placeholder="검색어를 입력하세요"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>

      {showResults && (
        <div className={styles.searchResults}>
          {articles && articles.length > 0 ? (
            articles.map(article => (
              <div key={article.id} className={styles.articleCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                </div>
                <div className={styles.articleInfo}>
                  <h4 className={styles.title}>{article.title}</h4>
                  <p className={styles.meta}>
                    {new Date(article.publishedDate).toLocaleDateString()}{' '}
                    <strong>|</strong>
                    {article.publisher}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noArticlesMessage}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleSearch;
