import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../../apis/UserApi';
import useArticleApi from '../../apis/ArticleApi';
import useArticleStore from '../../store/ArticleStore';
import useThemeStore from '../../store/ThemeStore';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import styles from './ArticleListComponent.module.scss';
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
  FaPlus,
} from 'react-icons/fa6';
import LoadingModal from '../Modal/LoadingModal';

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  publisher: string;
}

const ArticleListComponent = ({
  categoryId = 0,
  isScrap = false,
}: {
  categoryId?: number;
  isScrap?: boolean;
}) => {
  const navigate = useNavigate();
  const { setArticleMeta } = useArticleStore();
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrap) {
      fetchScrapArticles(0, true);
      return;
    }
  }, []);

  useEffect(() => {
    if (isScrap) return;
    fetchArticles(categoryId, 0, true);
  }, [categoryId]);

  const fetchArticles = async (
    categoryId: number,
    page: number = 0,
    reset = false,
  ) => {
    if (reset) {
      setCurrentPage(0);
      setArticles([]);
    }
    setFetchLoading(true);
    try {
      let result;
      if (categoryId === 0) {
        result = await useArticleApi.getArticleList(page);
      } else {
        result = await useArticleApi.getArticleCategory(categoryId, page);
      }
      if (result && Array.isArray(result)) {
        const formattedArticles = result.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content || '',
          imageUrl: article.imageUrl,
          date: article.publishedDate,
          publisher: article.publisher,
        }));

        setArticles(prev => [...prev, ...formattedArticles]);
      }
    } catch (error) {
      setArticles([]);
    } finally {
      setLoading(false);
      setFetchLoading(false);
    }
  };

  const fetchScrapArticles = async (page: number = 0, reset = false) => {
    if (reset) {
      setCurrentPage(0);
      setArticles([]);
    }
    setFetchLoading(true);
    try {
      const response = await userApi.getMyArticles(page, 5);
      const result = response?.data;

      if (result && Array.isArray(result)) {
        const formattedArticles = result.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content || '',
          imageUrl: article.imageUrl,
          date: article.publishedDate,
          publisher: article.publisher,
        }));
        setArticles(prev => [...prev, ...formattedArticles]);
      }
    } catch (error) {
      setArticles([]);
    } finally {
      setLoading(false);
      setFetchLoading(false);
    }
  };

  const loadArticleDetail = (article: Article) => {
    setArticleMeta({
      id: article.id,
      title: article.title,
      imageUrl: article.imageUrl,
    });
    navigate('/article');
  };

  const handleMoveLeft = () => {
    if (articleRef.current) {
      articleRef.current.scrollLeft -= 575;
    }
  };

  const handleMoveLeftEnd = () => {
    if (articleRef.current) {
      articleRef.current.scrollLeft = 0;
    }
  };

  const handleMoveRight = () => {
    if (articleRef.current) {
      articleRef.current.scrollLeft += 575;
    }
  };

  const handleMoveRightEnd = () => {
    if (articleRef.current) {
      articleRef.current.scrollLeft = articleRef.current.scrollWidth;
    }
  };

  useEffect(() => {
    if (!articles) return;

    const handleWheel = (event: WheelEvent) => {
      if (articleRef.current) {
        event.preventDefault();
        articleRef.current.scrollLeft += event.deltaY * 5;
      }
    };

    const currentRef = articleRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [articles]);

  const loadMoreArticles = () => {
    if (loading) return;
    if (isScrap) {
      fetchScrapArticles(currentPage + 1);
    } else {
      fetchArticles(categoryId, currentPage + 1);
    }
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (theme === 'dark') {
      setMainLogo(logoWhite);
      return;
    }
    setMainLogo(logo);
  }, [theme]);

  return (
    <div className={styles.articleListComponent}>
      {loading ? (
        <LoadingModal />
      ) : articles.length > 0 ? (
        <>
          <div className={styles.articleListContent} ref={articleRef}>
            {articles.map((article, index) => {
              return (
                <div
                  key={index}
                  className={styles.articleCard}
                  onClick={() => loadArticleDetail(article)}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={article.imageUrl ? article.imageUrl : mainLogo}
                      alt={article.title || 'Default News Image'}
                      className={styles.articleImage}
                    />
                  </div>
                  <div className={styles.articleInfo}>
                    <h4 className={styles.title}>{article.title}</h4>
                    <p className={styles.meta}>
                      {new Date(article.date).toLocaleDateString()}{' '}
                      <strong>|</strong> {article.publisher}
                    </p>
                    <p className={styles.content}>{article.content}</p>
                  </div>
                </div>
              );
            })}
            {fetchLoading ? (
              <LoadingModal />
            ) : (
              <div className={styles.loadMoreButton} onClick={loadMoreArticles}>
                <FaPlus size={20} />
              </div>
            )}
          </div>
          <div className={styles.scrollButtons}>
            <FaAnglesLeft size={30} onClick={handleMoveLeftEnd} />
            <FaAngleLeft size={30} onClick={handleMoveLeft} />
            <FaAngleRight size={30} onClick={handleMoveRight} />
            <FaAnglesRight size={30} onClick={handleMoveRightEnd} />
          </div>
        </>
      ) : (
        <div className={styles.noArticlesMessage}>
          No articles available for this category.
        </div>
      )}
    </div>
  );
};

export default ArticleListComponent;
