import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useArticleApi from "../../apis/ArticleApi";
import useArticleStore from "../../store/ArticleStore";
import styles from "./ArticleList.module.scss";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  publisher: string;
}

const ArticleList = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const { setArticleMeta } = useArticleStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const categoryIds = [1, 2, 3];

  const fetchArticles = async (categoryId: number) => {
    try {
      const result = await useArticleApi.getArticleCategory(categoryId, 0);
      if (result && Array.isArray(result)) {
        const formattedArticles = result.map((article) => ({
          id: article.id,
          title: article.title,
          content: article.content || "",
          imageUrl: article.imageUrl,
          date: article.publishedDate,
          publisher: article.publisher,
        }));
        setArticles(formattedArticles);
        setLoading(false);
      } else {
        setArticles([]);
        setLoading(false);
      }
    } catch (error) {
      setArticles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    fetchArticles(categoryId);
  };

  const loadArticleDetail = (article: Article) => {
    setArticleMeta({
      id: article.id,
      title: article.title,
      imageUrl: article.imageUrl,
    });
    navigate("/article");
  };

  return (
    <div className={styles.articleListContainer}>
      {/* 카테고리 버튼 표시 */}
      <div className={styles.categoryButtons}>
        <div className={styles.categoryButtonContainer}>
          {categoryIds.map((id) => (
            <button
              key={id}
              className={`${styles.categoryButton} ${
                selectedCategory === id ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange(id)}
            >
              카테고리 {id}
            </button>
          ))}
        </div>
        {/* 우측 all 버튼 */}
        <button
          className={styles.addButton}
          onClick={() => navigate("/articlelist/category")}
        >
          ALL
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingMessage}>Loading articles...</div>
      ) : articles.length > 0 ? (
        <div className={styles.articleListContent}>
          {articles.map((article) => (
            <div
              key={article.id}
              className={styles.articleCard}
              onClick={() => loadArticleDetail(article)}
            >
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
                  {new Date(article.date).toLocaleDateString()}{" "}
                  <strong>|</strong> {article.publisher}
                </p>
                <p className={styles.content}>{article.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noArticlesMessage}>
          No articles available for this category.
        </div>
      )}
    </div>
  );
};

export default ArticleList;
