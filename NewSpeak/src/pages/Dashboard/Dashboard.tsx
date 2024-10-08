import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import { renderRadarChart } from '../../utils/Chart';
import useAuthStore from '../../store/AuthStore';
import useArticleApi from '../../apis/ArticleApi';
import userApi from '../../apis/UserApi';
import LoadingModal from '../../components/Modal/LoadingModal';
import WordCloud from '../../components/WordCloud/WordCloud';
import WordSlider from '../../components/Slider/WordSlider';
import { useNavigate } from 'react-router-dom';
import { GoLightBulb } from 'react-icons/go';
import { TextField } from '@mui/material';
import DashboardModal from './DashboardModal';
import { MdOutlineReplay } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';

interface WordCloudItem {
  content: string;
  cnt: number;
  id: number;
}

interface FormattedWordData {
  text: string;
  size: number;
  id: number;
}

interface Report {
  id: number;
  title: string | null;
  content: ParsedContent;
}

interface ParsedContent {
  title: string;
  score: string;
  feedback: Feedback;
  suggestions: string[];
  conversation: string;
}

interface Feedback {
  vocabulary: FeedbackContent;
  expressiveness: FeedbackContent;
  comprehension: FeedbackContent;
  clarity: FeedbackContent;
  grammar: FeedbackContent;
}

interface FeedbackContent {
  score: number;
  feedback: string;
}

interface Word {}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getReportList } = userApi;
  const { getWordCloud, getWord } = useArticleApi;
  const [words, setWords] = useState<FormattedWordData[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [selectedWordCount, setSelectedWordCount] = useState<number | null>(
    null,
  );
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null,
  );
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [reportData, setReportData] = useState<any[]>([]);
  const [lastReport, setLastReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);
  const [word, setWord] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [searchedWord, setSearchedWord] = useState<any | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchWordData = async () => {
      setIsLoading(true);
      try {
        const result: WordCloudItem[] = await getWordCloud();
        const formattedData: FormattedWordData[] = result
          .slice(0, 50)
          .map((item: WordCloudItem) => ({
            text: item.content,
            size: item.cnt,
            id: item.id,
          }));

        setWords(formattedData);

        if (formattedData.length > 0) {
          setSelectedWordId(formattedData[0].id);
          setSelectedWordIndex(0);
        }
      } catch (error) {
        console.error('Error fetching word cloud data:', error);
      }
    };
    fetchWordData();
  }, []);

  useEffect(() => {
    const getReports = async () => {
      setIsLoading(true);
      try {
        const response = await getReportList();
        const rawData = response.reports;

        const parsedData = rawData.map((report: any) => {
          const parsedContent = JSON.parse(report.content);
          return {
            id: report.id,
            title: report.title || parsedContent.content.title,
            content: parsedContent.content,
          };
        });
        console.log(parsedData);
        setReportData(parsedData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getReports();
  }, []);

  const handleWordChange = (word: FormattedWordData) => {
    setSelectedWordId(word.id);
    setSelectedWordIndex(words.findIndex(item => item.id === word.id));
  };

  const handleWordClick = (_word: string, id: number) => {
    setSelectedWordId(id);
    const wordIndex = words.findIndex(item => item.id === id);
    setSelectedWordIndex(wordIndex);
    setResetTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (selectedWordIndex !== null) {
      setSelectedWordCount(words[selectedWordIndex]?.size);
    }
  }, [selectedWordIndex]);

  const handleReportClick = (reportId: number) => {
    navigate('/report', { state: { reportId } });
  };

  useEffect(() => {
    if (reportData.length > 0) {
      const lastData = reportData.slice(-1);
      const parsedContent = {
        id: lastData[0].id,
        title: lastData[0].title,
        content: lastData[0].content,
      };
      setLastReport(parsedContent);
    }
  }, [reportData]);

  useEffect(() => {
    console.log(lastReport);
  }, [lastReport]);

  const handleSearchArticle = () => {
    navigate('/articlelist/keyword', { state: selectedWordId });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await getWord(word);
      setSearchedWord(response);
    } catch (error) {
      setSearchedWord('검색된 단어가 없습니다');
    }
  };

  const selectSection = (section: string) => {
    if (section === selectedSection) {
      setSelectedSection(null);
      return;
    }
    setSelectedSection(section);
  };

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <strong>{user.nickname}</strong>님 환영합니다
        </div>
        <div
          className={`${styles.dashboardContent} ${
            selectedSection ? styles.hasSelectedSection : ''
          }`}
        >
          <div
            className={`${styles.gridBlock} ${styles.wordCloud}
            ${selectedSection === 'wordCloud' ? styles.selected : ''}`}
            onClick={() => selectSection('wordCloud')}
          >
            <WordCloud data={words} onWordClick={handleWordClick} />
          </div>
          <div
            className={`${styles.gridBlock} ${styles.wordSlide}
            ${selectedSection === 'wordSlide' ? styles.selected : ''}`}
            onClick={() => selectSection('wordSlide')}
          >
            <p className={styles.wordSlideTitle}>
              <strong>Hot Topic</strong> of the Week
            </p>
            <WordSlider
              words={words}
              onWordChange={handleWordChange}
              selectedWordIndex={selectedWordIndex}
              resetTrigger={resetTrigger}
            />
            {selectedSection === 'wordSlide' && (
              <div className={styles.wordSlideCount}>
                <button onClick={handleSearchArticle}>
                  이 키워드로 기사 검색
                </button>
                <p>
                  Counted&nbsp;
                  <strong>{selectedWordCount}</strong>
                  &nbsp;times
                </p>
              </div>
            )}
          </div>
          <div className={`${styles.gridBlock} ${styles.wordCount}`}>
            <p>
              Counted&nbsp;
              <strong>{selectedWordCount}</strong>
              &nbsp;times
            </p>
          </div>
          {!isMobile && (
            <div
              className={`${styles.gridBlock} ${styles.report}
              ${selectedSection === 'report' ? styles.selected : ''}`}
              onClick={() => {
                selectSection('report');
              }}
            >
              {isLoading ? (
                <LoadingModal />
              ) : (
                <>
                  {lastReport !== null ? (
                    <>
                      <div className={styles.cardHeader}>Last Report</div>
                      <div
                        className={styles.reportCard}
                        onClick={() => handleReportClick(lastReport.id)}
                      >
                        <div className={styles.chartHeader}>
                          <p>{lastReport.title}</p>
                          <p>score: {lastReport.content.score}</p>
                        </div>
                        <div className={styles.chartContainer}>
                          {renderRadarChart(lastReport.content, true)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.blankReport}>
                      <h1 className={styles.blankTitle}>
                        아직 생성된 회화 보고서가 없어요
                        {selectedSection === 'report' && (
                          <button>회화 하러 가기</button>
                        )}
                      </h1>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <div className={`${styles.gridBlock} ${styles.wordSearch}`}>
            {searchedWord && searchedWord.data ? (
              <>
                {searchedWord.data[0].meaning}
                <div className={styles.wordButtonContainer}>
                  <GoPlus size={30} />
                  <MdOutlineReplay
                    size={30}
                    onClick={() => {
                      setSearchedWord(null);
                    }}
                  />
                </div>
              </>
            ) : (
              <div className={styles.wordSearchInput}>
                <p style={{ width: 'fit-content' }}>단어 검색하기</p>
                <form onSubmit={handleSubmit}>
                  <TextField
                    id="outlined-basic"
                    label="word"
                    variant="outlined"
                    value={word}
                    onChange={e => setWord(e.target.value)}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
