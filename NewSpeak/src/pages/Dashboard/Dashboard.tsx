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

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getReportList } = userApi;
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize(); // 초기 렌더 시 체크
    window.addEventListener('resize', handleResize); // 창 크기 변경 시 체크
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchWordData = async () => {
      setIsLoading(true);
      try {
        const result: WordCloudItem[] = await useArticleApi.getWordCloud();
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

  const handleCountClick = () => {
    navigate('/articlelist');
  };

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
      // console.log(parsedContent);
      setLastReport(parsedContent);
    }
  }, [reportData]);

  useEffect(() => {
    console.log(lastReport);
  }, [lastReport]);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <strong>{user.nickname}</strong>님 환영합니다
        </div>
        <div className={styles.dashboardContent}>
          <div className={`${styles.gridBlock} ${styles.wordCloud}`}>
            <WordCloud data={words} onWordClick={handleWordClick} />
          </div>
          <div className={`${styles.gridBlock} ${styles.wordSlide}`}>
            <p className={styles.wordSlideTitle}>
              <strong>Hot Topic</strong> of the Week
            </p>
            <WordSlider
              words={words}
              onWordChange={handleWordChange}
              selectedWordIndex={selectedWordIndex}
              resetTrigger={resetTrigger}
            />
          </div>
          <div className={`${styles.gridBlock} ${styles.wordCount}`}>
            Counted&nbsp;
            <strong onClick={handleCountClick}>{selectedWordCount}</strong>
            &nbsp;times
          </div>
          {!isMobile && (
            <div className={`${styles.gridBlock} ${styles.report}`}>
              {isLoading ? (
                <LoadingModal />
              ) : (
                <>
                  {lastReport !== null ? (
                    <>
                      <div
                        className={styles.reportCard}
                        onClick={() => handleReportClick(lastReport.id)}
                      >
                        <div className={styles.cardHeader}>Last Report</div>
                        <div className={styles.chartHeader}>
                          <p>{lastReport.title}</p>
                          <p>score: {lastReport.content.score}</p>
                        </div>
                        <div className={styles.chartContainer}>
                          <p className={styles.innerScore}>
                            score: {lastReport.content.score}
                          </p>
                          {renderRadarChart(lastReport.content, true)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className={styles.blankReport}>
                      <h1 className={styles.blankTitle}>
                        아직 생성된 회화 보고서가 없어요
                      </h1>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          <div className={`${styles.gridBlock} ${styles.example}`}>
            단어 검색
          </div>
          <div className={`${styles.gridBlock} ${styles.example}`}>
            단어 검색 결과
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
