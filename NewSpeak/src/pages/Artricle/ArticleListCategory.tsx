import React, { useState, useEffect } from "react";
import useArticleApi from "../../apis/ArticleApi";
import styles from "./ArticleListCategory.module.scss";

interface Article {
  id: number;
  title: string;
  imageUrl: string | null;
  publishedDate: string;
  publisher: string;
}

interface CategoryArticles {
  categoryId: number;
  articleList: Article[];
}

const ArticleListCategory = () => {
  const [allArticles, setAllArticles] = useState<CategoryArticles[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // 선택된 카테고리 상태
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAllCategoryArticles();
  }, []);

  // 모든 카테고리의 기사를 불러오는 함수
  const fetchAllCategoryArticles = async () => {
    setLoading(true);
    try {
      const results: CategoryArticles[] =
        await useArticleApi.getArticleListCategory();
      setAllArticles(results);
    } catch (error) {
      console.error(
        "[컴포넌트] 전체 카테고리 기사 데이터 가져오기 에러:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // 선택된 카테고리에 따른 기사 필터링 함수
  const getFilteredArticles = () => {
    if (selectedCategory === 0) {
      // 전체 카테고리일 때 모든 기사 출력
      return allArticles.flatMap((category) => category.articleList);
    } else {
      // 특정 카테고리 선택 시 해당 카테고리의 기사만 출력
      const selectedCategoryData = allArticles.find(
        (category) => category.categoryId === selectedCategory
      );
      return selectedCategoryData ? selectedCategoryData.articleList : [];
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // 카테고리 네브바 생성
  const renderCategoryNavbar = () => {
    const categoryButtons = Array.from({ length: 20 }, (_, index) => index); // 0부터 19까지 카테고리 버튼 생성
    const firstRow = categoryButtons.slice(0, 10); // 첫 번째 줄 (0-9)
    const secondRow = categoryButtons.slice(10); // 두 번째 줄 (10-19)

    return (
      <div className={styles.categoryNavbar}>
        <div className={styles.categoryRow}>
          {firstRow.map((id) => (
            <button
              key={id}
              className={`${styles.categoryButton} ${
                selectedCategory === id ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange(id)}
            >
              {id === 0 ? "All" : `Category ${id}`}
            </button>
          ))}
        </div>
        <div className={styles.categoryRow}>
          {secondRow.map((id) => (
            <button
              key={id}
              className={`${styles.categoryButton} ${
                selectedCategory === id ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange(id)}
            >
              {`Category ${id}`}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const filteredArticles = getFilteredArticles();

  return (
    <div className={styles.container}>
      {/* 카테고리 네브바 */}
      {renderCategoryNavbar()}

      {/* 선택된 카테고리의 기사 리스트 */}
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : filteredArticles.length > 0 ? (
        <div className={styles.articlesContainer}>
          {filteredArticles.map((article) => (
            <div key={article.id} className={styles.articleCard}>
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className={styles.articleImage}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
              <div className={styles.articleInfo}>
                <h4 className={styles.articleTitle}>{article.title}</h4>
                <p className={styles.articleMeta}>
                  {new Date(article.publishedDate).toLocaleDateString()} -{" "}
                  {article.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noArticlesMessage}>
          해당 카테고리의 기사가 없습니다.
        </div>
      )}
    </div>
  );
};

export default ArticleListCategory;
