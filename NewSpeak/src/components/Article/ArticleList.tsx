import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 훅 추가
import useArticleApi from '../../apis/ArticleApi'; // API 함수 가져오기
import useArticleStore from '../../store/ArticleStore';
import styles from './ArticleList.module.scss';

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  source: string;
}

const ArticleList = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1); // 현재 선택된 카테고리 ID
  const { setArticleMeta } = useArticleStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 훅

  // 임의의 카테고리 ID 3개 설정
  const categoryIds = [1, 2, 3];

  // 선택된 카테고리의 기사만 가져오기
  const fetchArticles = async (categoryId: number) => {
    try {
      console.log(`Fetching articles for category ID: ${categoryId}`);
      const result = await useArticleApi.getArticleCategory(categoryId, 0);
      console.log('Fetched articles: ', result);

      if (result && Array.isArray(result)) {
        // 데이터 필드명 매핑
        const formattedArticles = result.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content || '', // content가 없는 경우 기본값 설정
          imageUrl: article.imageUrl,
          date: article.publishedDate, // publishedDate를 date로 매핑
          source: article.publisher, // publisher를 source로 매핑
        }));

        setArticles(formattedArticles);
        setLoading(false);
      } else {
        console.error('Invalid data structure:', result);
        setArticles([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
      setLoading(false);
    }
  };

  // 초기 로드시 첫 번째 카테고리 기사 가져오기
  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory]);

  // 카테고리 선택 시 기사 리스트 업데이트
  const handleCategoryChange = (categoryId: number) => {
    console.log(`Category changed to: ${categoryId}`);
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
    navigate('/article');
  };

  return (
    <div className={styles.articleListContainer}>
      {/* 카테고리 버튼 표시 */}
      <div className={styles.categoryButtons}>
        {categoryIds.map(id => (
          <button
            key={id}
            className={`${styles.categoryButton} ${
              selectedCategory === id ? styles.active : ''
            }`}
            onClick={() => handleCategoryChange(id)}
          >
            카테고리 {id}
          </button>
        ))}
        {/* 추가된 + 버튼 */}
        <button
          className={styles.addButton} // 새로운 스타일 추가
          onClick={() => navigate('/articlelist/category')} // 클릭 시 ArticleListCategory 페이지로 이동
        >
          +
        </button>
      </div>

      {/* 선택된 카테고리의 기사 리스트 표시 */}
      <h3 className={styles.title}>카테고리 {selectedCategory} 기사 리스트</h3>

      {/* 로딩 상태일 때 로딩 메시지 표시 */}
      {loading ? (
        <div className={styles.loadingMessage}>Loading articles...</div>
      ) : articles.length > 0 ? (
        <div className={styles.articleListContent}>
          {articles.map(article => (
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
                  {new Date(article.date).toLocaleDateString()} -{' '}
                  {article.source}
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
