import React, { useState } from "react";
import useArticleApi from "../../apis/ArticleApi";
import styles from "./ArticleSearch.module.scss";

interface Article {
  id: number;
  title: string;
  imageUrl: string;
  date: string;
  source: string;
}

const ArticleSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태
  const [articles, setArticles] = useState<Article[]>([]); // 검색 결과 상태
  const [showResults, setShowResults] = useState<boolean>(false); // 결과 표시 여부

  // 검색어가 입력되었을 때의 핸들러
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // `Enter` 키를 눌렀을 때 검색 함수 호출
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(); // 검색 함수 실행
    }
  };

  // 검색 버튼을 클릭했을 때 실행할 함수
  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // 빈 검색어는 무시

    try {
      const result = await useArticleApi.getArticleSearch(searchQuery, 0);
      console.log(result, `[컴포넌트] "${searchQuery}"로 검색한 기사 데이터`);

      setArticles(result || []); // 결과 설정
      setShowResults(true); // 검색 결과를 표시
    } catch (error) {
      console.error(
        `[컴포넌트] "${searchQuery}"로 검색한 기사 가져오기 에러:`,
        error
      );
      setArticles([]); // 오류 발생 시에도 빈 배열로 설정하여 오류 방지
    }
  };

  return (
    <div className={styles.searchSection}>
      <div
        className={`${styles.searchContainer} ${
          showResults ? styles.moveUp : ""
        }`}
      >
        {/* 검색 인풋 */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress} // Enter 키 입력 시 검색
          placeholder="검색어를 입력하세요"
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>

      {/* 검색 결과 표시 */}
      {showResults && (
        <div className={styles.searchResults}>
          {articles && articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className={styles.articleCard}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className={styles.articleImage}
                />
                <div className={styles.articleInfo}>
                  <h4 className={styles.title}>{article.title}</h4>
                  <p className={styles.meta}>
                    {new Date(article.date).toLocaleDateString()} -{" "}
                    {article.source}
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
