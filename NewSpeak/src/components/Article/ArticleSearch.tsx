import React, { useState, useEffect, useRef } from 'react';
import useElasticApi from '../../apis/ElasticApi';
import styles from './ArticleSearch.module.scss';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore';
import useArticleStore from '../../store/ArticleStore';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import useArticleApi from '../../apis/ArticleApi';
import LoadingModal from '../Modal/LoadingModal';
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
  FaPlus,
} from 'react-icons/fa6';

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  publisher: string;
}

const ArticleSearch = () => {
  const { setArticleMeta } = useArticleStore();
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('title');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [level, setLevel] = useState<number>(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articleRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setMainLogo(theme === 'light' ? logo : logoWhite);
  }, [theme]);

  useEffect(() => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setLevel(1);
    setShowResults(false);
    setArticles([]);
  }, [searchType]);

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

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(Number(event.target.value));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(0, true);
    }
  };

  const handleSearch = async (page: number = 0, reset: boolean = false) => {
    if (reset) {
      setCurrentPage(0);
      setArticles([]);
    }
    setFetchLoading(true);
    try {
      let result;

      switch (searchType) {
        case 'title':
          result = await useElasticApi.getElasticByKeyword(searchQuery, page);
          break;
        case 'content':
          result = await useElasticApi.getElasticByContent(searchQuery, page);
          break;
        case 'contentKR':
          result = await useElasticApi.getElasticByContentKR(searchQuery, page);
          break;
        case 'date':
          result = await useElasticApi.getElasticByDate(
            startDate,
            endDate,
            page,
          );
          break;
        case 'titleDate':
          result = await useElasticApi.getElasticByTitleDate(
            startDate,
            endDate,
            searchQuery,
            page,
          );
          break;
        case 'contentDate':
          result = await useElasticApi.getElasticByContentDate(
            startDate,
            endDate,
            searchQuery,
            page,
          );
          break;
        case 'titleContentDate':
          result = await useElasticApi.getElasticByTitleContentDate(
            startDate,
            endDate,
            searchQuery,
            searchQuery,
            page,
          );
          break;
        case 'titleContent':
          result = await useElasticApi.getElasticByTitleContent(
            searchQuery,
            searchQuery,
            page,
          );
          break;
        case 'level':
          result = await useArticleApi.getArticleLevel(level, page);
          break;
        default:
          result = [];
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
        if (articles.length === 0) {
          setArticles(formattedArticles);
        } else {
          setArticles(prev => {
            return [...prev, ...formattedArticles];
          });
        }
        setShowResults(true);
        setLoading(false);
        setFetchLoading(false);
      }
    } catch (error) {
      console.error(`"${searchQuery}"로 검색한 기사 가져오기 에러:`, error);
      setArticles([]);
      setFetchLoading(false);
    }
  };

  const loadMoreArticles = () => {
    if (loading || fetchLoading) return;
    handleSearch(currentPage + 1);
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.searchSection}>
      <div
        className={`${styles.searchContainer} ${
          showResults && articles.length > 0 ? styles.moveUp : ''
        }`}
      >
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className={styles.searchDropdown}
        >
          <option value="title">제목 검색</option>
          <option value="content">본문 내용 검색</option>
          <option value="contentKR">한국어 본문 내용 검색</option>
          <option value="date">날짜로 검색</option>
          <option value="titleDate">날짜 + 제목 검색</option>
          <option value="contentDate">날짜 + 본문 검색</option>
          <option value="titleContentDate">날짜 + 제목 + 본문 검색</option>
          <option value="titleContent">제목 + 본문 검색</option>{' '}
          {/* 추가된 옵션 */}
          <option value="level">난이도별 검색</option>
        </select>

        <div className={styles.inputContainer}>
          {/* 검색 타입에 따라 검색창 또는 날짜 선택 창 표시 */}
          {searchType !== 'date' && searchType !== 'level' && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              placeholder="검색어를 입력하세요"
              className={styles.searchInput}
            />
          )}

          {(searchType.includes('Date') || searchType === 'date') && (
            <div className={styles.dateInputContainer}>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className={styles.dateInput}
              />
              부터
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className={styles.dateInput}
              />
              까지
            </div>
          )}

          {searchType === 'level' && (
            <select
              value={level}
              onChange={handleLevelChange}
              className={styles.searchDropdown}
            >
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
              <option value={4}>Level 4</option>
              <option value={5}>Level 5</option>
            </select>
          )}
        </div>

        <button
          onClick={() => handleSearch(0, true)}
          className={styles.searchButton}
        >
          검색
        </button>
      </div>

      <div className={styles.articleListComponent}>
        {showResults && !loading && (
          <>
            {articles.length > 0 ? (
              <>
                <div className={styles.searchResults} ref={articleRef}>
                  {articles.map((article, index) => (
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
                  ))}
                  {fetchLoading ? (
                    <LoadingModal />
                  ) : (
                    <div
                      className={styles.loadMoreButton}
                      onClick={loadMoreArticles}
                    >
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
                검색 결과가 없습니다.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleSearch;
