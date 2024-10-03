import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useArticleApi from "../../apis/ArticleApi";
import useArticleStore from "../../store/ArticleStore";
import styles from "./ArticleListKeyword.module.scss";
import noImage from "../../assets/NewSpeak.png";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishedDate: string;
  publisher: string;
}

interface ArticleListKeywordProps {
  selectedWordId: number | null;
}

const ArticleListKeyword: React.FC<ArticleListKeywordProps> = ({
  selectedWordId,
}) => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const { setArticleMeta } = useArticleStore();

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

  const loadArticleDetail = (article: Article) => {
    setArticleMeta({
      id: article.id,
      title: article.title,
      imageUrl: article.imageUrl,
    });
    navigate("/article");
  };

  // 날짜 형식을 변환하는 함수
  const formatDate = (dateString: string) => {
    try {
      const dateObject = new Date(dateString);
      return dateObject.toLocaleDateString(); // 기본 형식 (e.g., "9/15/2024")
    } catch (error) {
      console.error("Date format error:", error);
      return "";
    }
  };

  return (
    <div className={styles.articleListContainer}>
      <div className={styles.articleListContent}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id}
              className={styles.articleCard}
              onClick={() => {
                loadArticleDetail(article);
              }}
            >
              <div className={styles.imageContainer}>
                {/* 이미지 URL이 있으면 이미지, 없으면 아이콘 표시 */}
                {article.imageUrl ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title || "Default News Image"}
                    className={styles.articleImage}
                  />
                ) : (
                  <img src={noImage} alt="" className={styles.noImageIcon} />
                )}
              </div>
              <div className={styles.articleInfo}>
                <p className={styles.title}>{article.title}</p>
              </div>
              {/* 날짜 변환 함수 formatDate를 사용하여 표시 */}
              <p className={styles.publishedDate}>
                {formatDate(article.publishedDate)} <strong>|</strong>{" "}
                {article.publisher}
              </p>
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
