import React, { useState, useEffect } from 'react';
import useElasticApi from '../../apis/ElasticApi'; // Elastic 관련 API 사용
import styles from './ArticleSearch.module.scss';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore';
import useArticleStore from '../../store/ArticleStore';
import logo from '../../assets/NewSpeak.png';
import useArticleApi from '../../apis/ArticleApi';
import logoWhite from '../../assets/NewSpeakWhite.png';

interface Article {
  id: number;
  title: string;
  imageUrl: string;
  publishedDate: string;
  publisher: string;
}

const ArticleSearch = () => {
  const { setArticleMeta } = useArticleStore();
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태
  const [searchType, setSearchType] = useState<string>('title'); // 선택된 검색 타입
  const [startDate, setStartDate] = useState<string>(''); // 시작 날짜
  const [endDate, setEndDate] = useState<string>(''); // 종료 날짜
  const [level, setLevel] = useState<number>(1); // 난이도 상태
  const [articles, setArticles] = useState<Article[]>([]); // 검색 결과 상태
  const [showResults, setShowResults] = useState<boolean>(false); // 결과 표시 여부

  const navigate = useNavigate(); // 라우팅을 위한 네비게이션 훅

  useEffect(() => {
    setMainLogo(theme === 'light' ? logo : logoWhite); // 로고 이미지 ���기화
  });

  // 검색 타입 변경 시, 관련 입력 필드를 초기화
  useEffect(() => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setLevel(1); // 난이도도 초기화
    setShowResults(false); // 검색 옵션이 바뀌면 이전 검색 결과를 숨김
  }, [searchType]);

  const loadArticleDetail = (article: Article) => {
    setArticleMeta({
      id: article.id,
      title: article.title,
      imageUrl: article.imageUrl,
    });
    navigate('/article');
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
      handleSearch(); // 검색 함수 실행
    }
  };

  const handleSearch = async () => {
    try {
      let result: Article[] | undefined;
      let title = '';
      let content = '';

      // `searchQuery`를 제목과 본문으로 분리하는 로직 추가
      if (searchType === 'titleContentDate') {
        // 특정 구분자 ':' 를 사용하여 나눔 (예: "제목:본문 내용")
        const splitIndex = searchQuery.indexOf(':');
        if (splitIndex !== -1) {
          title = searchQuery.slice(0, splitIndex).trim(); // 구분자 앞부분을 제목으로 설정
          content = searchQuery.slice(splitIndex + 1).trim(); // 구분자 뒷부분을 본문으로 설정
        } else {
          title = searchQuery; // 구분자가 없으면 전체를 제목으로
          content = searchQuery; // 본문은 빈 값으로 설정
        }
      }

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
            title,
            content,
            0,
          );
          break;
        case 'level': // 난이도별 검색 추가
          result = await useArticleApi.getArticleLevel(level, 0);
          break;
        default:
          result = [];
      }

      setArticles(result || []);
      setShowResults(true); // 검색 결과를 표시
    } catch (error) {
      console.error(`"${searchQuery}"로 검색한 기사 가져오기 에러:`, error);
      setArticles([]); // 오류 발생 시 빈 배열로 설정하여 오류 방지
    }
  };

  return (
    <div className={styles.searchSection}>
      <div
        className={`${styles.searchContainer} ${
          showResults ? styles.moveUp : ''
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
          <option value="level">난이도별 검색</option>
        </select>

        {/* 날짜 입력 칸 (옵션에 따라 표시) */}
        {(searchType.includes('Date') || searchType === 'date') && (
          <div className={styles.dateInputContainer}>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className={styles.dateInput}
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className={styles.dateInput}
            />
          </div>
        )}

        {/* 검색어 입력 필드 */}
        {searchType !== 'date' && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요"
            className={styles.searchInput}
          />
        )}

        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>

      {/* 검색 결과 표시 */}
      {showResults && (
        <div className={styles.searchResults}>
          {articles.length > 0 ? (
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
                    {new Date(article.publishedDate).toLocaleDateString()} |{' '}
                    {article.publisher}
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
