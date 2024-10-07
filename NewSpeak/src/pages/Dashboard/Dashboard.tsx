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
  const [reportData, setReportData] = useState<Report[]>([]);
  const [recentReport, setRecentReport] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWordData = async () => {
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

    const getReports = async () => {
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

        setReportData(parsedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWordData();
    getReports();
  }, []);

  useEffect(() => {
    const parseReport = () => {
      if (reportData.length > 0) {
        const parsedData = reportData.map(report => ({
          id: report.id,
          title: report.content.title || report.title || 'Untitled Report',
          score: report.content.score,
          feedback: report.content.feedback,
          suggestions: report.content.suggestions.join(', '),
          conversation: report.content.conversation,
        }));

        const lastReports = parsedData.slice(-3);
        setRecentReport(lastReports);
        console.log(lastReports);
      }
    };
    parseReport();
  }, [reportData]);

  useEffect(() => {
    setIsLoading(false);
  }, [recentReport]);

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

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <strong>{user.nickname}</strong>님 환영합니다
        </div>
        <div className={styles.dashboardContent}>
          <div className={`${styles.gridBlock} ${styles.wordCloud}`}>
            <WordCloud
              data={words}
              dashboard={true}
              onWordClick={handleWordClick}
            />
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
          <div className={`${styles.gridBlock} ${styles.example}`}>
            회화 튜토리얼 보기
          </div>
          <div className={`${styles.gridBlock} ${styles.example}`}>
            기사 전체 조회
          </div>
          <div className={`${styles.gridBlock} ${styles.report}`}>
            {isLoading ? (
              <LoadingModal />
            ) : (
              <>
                <h1 className={styles.reportGridHeader}>
                  Recent {Math.min(reportData.length, 3)} Reports
                </h1>
                {recentReport.length > 0 ? (
                  <>
                    {recentReport.map((report, index) => (
                      <div
                        key={report.id}
                        className={styles.reportCard}
                        onClick={() => handleReportClick(report.id)}
                      >
                        <div className={styles.chartHeader}>
                          {reportData.length <= 2
                            ? index == reportData.length - 1 && <>new!</>
                            : index == 2 && <>new!</>}
                        </div>
                        <div className={styles.chartContainer}>
                          score: {report.score}
                          {renderRadarChart(report, true)}
                        </div>
                      </div>
                    ))}
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
