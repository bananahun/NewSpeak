import React, { useState, useEffect } from 'react';
import useElasticApi from '../../apis/ElasticApi'; // Elastic 관련 API 사용
import styles from './ArticleSearch.module.scss';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore';
import useArticleStore from '../../store/ArticleStore';
import useAuthStore from '../../store/AuthStore'; // AuthStore에서 로그인 상태를 가져오기 위해 추가
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';

interface Article {
  id: number;
  title: string;
  imageUrl: string;
  publishedDate: string;
  publisher: string;
}

const ArticleSearch: React.FC = () => {
  const { setArticleMeta } = useArticleStore();
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [searchTitle, setSearchTitle] = useState<string>(''); // 제목 입력 상태
  const [searchContent, setSearchContent] = useState<string>(''); // 본문 입력 상태
  const [searchType, setSearchType] = useState<string>('title'); // 선택된 검색 타입
  const [startDate, setStartDate] = useState<string>(''); // 시작 날짜
  const [endDate, setEndDate] = useState<string>(''); // 종료 날짜
  const [articles, setArticles] = useState<Article[]>([]); // 검색 결과 상태
  const [showResults, setShowResults] = useState<boolean>(false); // 결과 표시 여부

  const { isLoggedIn } = useAuthStore(); // 로그인 상태를 가져옴
  const navigate = useNavigate(); // 라우팅을 위한 네비게이션 훅

  // 검색 타입 변경 시, 관련 입력 필드를 초기화
  useEffect(() => {
    setSearchQuery('');
    setSearchTitle('');
    setSearchContent('');
    setStartDate('');
    setEndDate('');
    setShowResults(false); // 검색 옵션이 바뀌면 이전 검색 결과를 숨김
  }, [searchType]);

  // 드롭다운에서 검색 타입 변경 핸들러
  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchType(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch(); // 검색 함수 실행
    }
  };

  const handleSearch = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
      return; // 로그인되지 않은 경우 검색 함수 중단
    }

    try {
      let result: Article[] | undefined;

      switch (searchType) {
        case 'title':
          result = await useElasticApi.getElasticByKeyword(searchQuery, 0);
          break;
        case 'content':
          result = await useElasticApi.getElasticByContent(searchQuery, 0);
          break;
        case 'contentKR':
          result = await useElasticApi.getElasticByContentKR(searchQuery, 0);
          break;
        case 'date':
          result = await useElasticApi.getElasticByDate(startDate, endDate, 0);
          break;
        case 'titleDate':
          result = await useElasticApi.getElasticByTitleDate(
            startDate,
            endDate,
            searchQuery,
            0,
          );
          break;
        case 'contentDate':
          result = await useElasticApi.getElasticByContentDate(
            startDate,
            endDate,
            searchQuery,
            0,
          );
          break;
        case 'titleContentDate':
          result = await useElasticApi.getElasticByTitleContentDate(
            startDate,
            endDate,
            searchTitle,
            searchContent,
            0,
          );
          break;
        default:
          result = [];
      }

      setArticles(result || []); // 결과 설정
      setShowResults(true); // 검색 결과를 표시
    } catch (error) {
      console.error(`"${searchQuery}"로 검색한 기사 가져오기 에러:`, error);
      setArticles([]); // 오류 발생 시 빈 배열로 설정하여 오류 방지
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

  useEffect(() => {
    if (theme === 'light') {
      setMainLogo(logo);
    } else {
      setMainLogo(logoWhite);
    }
  }, [theme]);

  return (
    <div className={styles.searchSection}>
      <div
        className={`${styles.searchContainer} ${
          showResults ? styles.moveUp : ''
        }`}
      >
        {/* 검색 타입 선택 드롭다운 */}
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
        </select>

        {/* 날짜 입력 칸 (옵션에 따라 표시) */}
        {(searchType.includes('Date') || searchType === 'date') && (
          <div className={styles.dateInputContainer}>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="시작 날짜"
              className={styles.dateInput}
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="종료 날짜"
              className={styles.dateInput}
            />
          </div>
        )}

        {/* 검색 인풋 (기본 인풋 필드) */}
        {searchType !== 'date' && searchType !== 'titleContentDate' && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
          />
        )}

        {/* 제목과 본문을 따로 입력할 수 있는 필드 */}
        {searchType === 'titleContentDate' && (
          <div className={styles.multiInputContainer}>
            <input
              type="text"
              value={searchTitle}
              onChange={handleTitleChange}
              onKeyPress={handleKeyPress}
              placeholder="제목을 입력하세요"
              className={styles.searchInput}
            />
            <input
              type="text"
              value={searchContent}
              onChange={handleContentChange}
              onKeyPress={handleKeyPress}
              placeholder="본문을 입력하세요"
              className={styles.searchInput}
            />
          </div>
        )}

        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>

      {/* 검색 결과 표시 */}
      {showResults && (
        <div className={styles.searchResults}>
          {articles && articles.length > 0 ? (
            articles.map(article => (
              <div
                key={article.id}
                className={styles.articleCard}
                onClick={() => loadArticleDetail(article)}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={article.imageUrl || mainLogo}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                </div>
                <div className={styles.articleInfo}>
                  <h4 className={styles.title}>{article.title}</h4>
                  <p className={styles.meta}>
                    {new Date(article.publishedDate).toLocaleDateString()}{' '}
                    <strong>|</strong> {article.publisher}
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
