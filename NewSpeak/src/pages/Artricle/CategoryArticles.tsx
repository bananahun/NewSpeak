import React, { useEffect, useState } from "react";
import useArticleApi from "../../apis/ArticleApi";
import styles from "./CategoryArticles.module.scss";
import noImage from "../../assets/NewSpeak.png"; // 대체 이미지 import

interface Article {
  id: number;
  title: string;
  imageUrl: string | null;
  publishedDate: string;
  publisher: string;
}

interface CategoryArticlesProps {
  categoryId: number;
}

const CategoryArticles: React.FC<CategoryArticlesProps> = ({ categoryId }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [categoryId]);

  useEffect(() => {
    fetchArticles(categoryId, page);
  }, [page, categoryId]);

  const fetchArticles = async (categoryId: number, page: number) => {
    setLoading(true);
    try {
      const result = await useArticleApi.getArticleCategory(categoryId, page);
      if (result.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => [...prevArticles, ...result]);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.articlesContainer}>
        {articles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className={styles.articleImage}
              />
            ) : (
              <img
                src={noImage} // 이미지가 없는 경우 대체 이미지 사용
                alt="No Image Available"
                className={`${styles.articleImage} ${styles.noImage}`} // 스타일 추가
              />
            )}
            <div className={styles.articleInfo}>
              <h4 className={styles.articleTitle}>{article.title}</h4>
              <p className={styles.articleMeta}>
                {new Date(article.publishedDate).toLocaleDateString()} |{" "}
                {article.publisher}
              </p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && !loading && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
      {loading && <div className={styles.loading}>Loading...</div>}
      {!loading && !hasMore && (
        <div className={styles.noMore}>No more articles available.</div>
      )}
    </div>
  );
};

export default CategoryArticles;
