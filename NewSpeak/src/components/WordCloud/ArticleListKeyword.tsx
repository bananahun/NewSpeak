import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useArticleStore from '../../store/ArticleStore';
import styles from './ArticleListKeyword.module.scss';
import useArticleApi from '../../apis/ArticleApi';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  publisher: string;
}

interface Word {
  id: number;
  content: string;
  size: number;
}

const ArticleListKeyword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setArticleMeta } = useArticleStore();
  const [articles, setArticles] = useState<Article[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const articleRef = useRef<HTMLDivElement>(null);
  const keywordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWordData();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // 페이지가 처음 마운트될 때 location.state 값을 selectedWordId로 설정
    if (location.state && typeof location.state === 'number') {
      setSelectedWordId(location.state); // 전달받은 state 값으로 초기 상태 설정
    }
    fetchWordData();
  }, [location.state]); // location.state가 바뀔 때마다 실행

  const handleResize = () => setWidth(window.innerWidth);

  const fetchWordData = async () => {
    try {
      const wordData = await useArticleApi.getWordCloud();
      const formattedData = Array.isArray(wordData) ? wordData : wordData?.data;
      setWords(formattedData || []);
    } catch (error) {
      console.error('Error fetching word data:', error);
    }
  };

  useEffect(() => {
    if (selectedWordId !== null) {
      setArticles([]);
      fetchArticlesById(selectedWordId, 0);
    }
  }, [selectedWordId]);

  const fetchArticlesById = async (wordId: number, page: number = 0) => {
    try {
      const result = await useArticleApi.getArticleWordCloud(wordId, page);
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
      console.error('Error fetching articles:', error);
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

  // 키워드 스크롤 관련 핸들러
  const handleMoveUp = () => {
    if (keywordRef.current) keywordRef.current.scrollTop -= 56;
  };

  const handleMoveDown = () => {
    if (keywordRef.current) keywordRef.current.scrollTop += 56;
  };

  // 마우스 휠을 이용한 가로 스크롤 처리
  useEffect(() => {
    const handleHorizontalScroll = (e: WheelEvent) => {
      if (articleRef.current) {
        e.preventDefault();
        articleRef.current.scrollLeft += e.deltaY; // 마우스 휠을 아래로 하면 오른쪽으로 이동
      }
    };

    const articleElement = articleRef.current;
    if (articleElement) {
      articleElement.addEventListener('wheel', handleHorizontalScroll);
    }

    return () => {
      if (articleElement) {
        articleElement.removeEventListener('wheel', handleHorizontalScroll);
      }
    };
  }, [articles]);

  return (
    <div className={styles.articleListKeyword}>
      {/* 카테고리와 동일한 키워드 나열 레이아웃 */}
      <div className={styles.keywordNavbarContainer}>
        <div className={styles.keywordNavbar} ref={keywordRef}>
          {words.length > 0 ? (
            words.map(word => (
              <button
                key={word.id}
                className={`${styles.keywordButton} ${word.id === selectedWordId ? styles.active : ''}`}
                onClick={() => setSelectedWordId(word.id)}
              >
                {word.content}
              </button>
            ))
          ) : (
            <p>No words available</p>
          )}
        </div>
        {
          <div className={styles.upDownButtons}>
            <FaAngleUp size={30} onClick={handleMoveUp} />
            <FaAngleDown size={30} onClick={handleMoveDown} />
          </div>
        }
      </div>

      <div className={styles.articleListComponent}>
        {articles.length > 0 ? (
          <>
            <div className={styles.articleListContent} ref={articleRef}>
              {articles.map((article, index) => (
                <div
                  key={index}
                  className={styles.articleCard}
                  onClick={() => loadArticleDetail(article)}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={article.imageUrl || 'default_image.png'}
                      alt={article.title || 'Default News Image'}
                      className={styles.articleImage}
                    />
                  </div>
                  <div className={styles.articleInfo}>
                    <h4 className={styles.title}>{article.title}</h4>
                    <p className={styles.meta}>
                      {new Date(article.date).toLocaleDateString()} |{' '}
                      {article.publisher}
                    </p>
                    <p className={styles.content}>{article.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noArticlesMessage}>No articles available.</div>
        )}
      </div>
    </div>
  );
};

export default ArticleListKeyword;
