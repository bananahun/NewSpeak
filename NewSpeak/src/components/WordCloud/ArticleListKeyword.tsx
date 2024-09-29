import React, { useEffect, useState } from "react";
import useArticleApi from "../../apis/ArticleApi";
import styles from "./ArticleListKeyword.module.scss";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  source: string;
}

interface ArticleListKeywordProps {
  selectedWordId: number | null;
}

const ArticleListKeyword: React.FC<ArticleListKeywordProps> = ({
  selectedWordId,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticlesById = async () => {
      if (selectedWordId) {
        try {
          const result = await useArticleApi.getArticleWordCloud(
            selectedWordId,
            0
          );
          setArticles(result);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      }
    };

    fetchArticlesById();
  }, [selectedWordId]);

  return (
    <div className={styles.articleListContainer}>
      <div className={styles.articleListContent}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className={styles.articleCard}>
              <div className={styles.imageContainer}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className={styles.articleImage}
                />
              </div>
              <div className={styles.articleInfo}>
                <p className={styles.title}>{article.title}</p>
                <p className={styles.publishedDate}>
                  {new Date(article.date).toLocaleDateString()} -{" "}
                  {article.source}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noArticles}>No articles available</div>
        )}
      </div>
    </div>
  );
};

export default ArticleListKeyword;
