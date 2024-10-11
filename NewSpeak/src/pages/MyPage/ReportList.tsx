import React, { useEffect, useState } from 'react';
import { renderRadarChart } from '../../utils/Chart';
import styles from './ReportList.module.scss';
import userApi from '../../apis/UserApi';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../../components/Modal/LoadingModal';

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

const ReportList = () => {
  const navigate = useNavigate();
  const { getReportList } = userApi;
  const [reportData, setReportData] = useState<Report[]>([]);
  const [parsedReportData, setParsedReportData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClick = (reportId: number) => {
    navigate('/report', { state: { reportId } });
  };

  useEffect(() => {
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
        setParsedReportData(parsedData);
      }
    };
    parseReport();
  }, [reportData]);

  useEffect(() => {
    setIsLoading(false);
  }, [parsedReportData]);

  return (
    <>
      <div className={styles.reportList}>
        {isLoading ? (
          <LoadingModal />
        ) : (
          <>
            {parsedReportData.length > 0 && (
              <>
                {parsedReportData.map(report => (
                  <div
                    className={styles.reportCard}
                    key={report.id}
                    onClick={() => handleClick(report.id)}
                  >
                    <div className={styles.reportCardHeader}>
                      <p>{report.title}</p>
                      <p>Total Score: {report.score}</p>
                    </div>
                    <div className={styles.chartContainer}>
                      {renderRadarChart(report)}
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      {parsedReportData.length <= 0 && !isLoading && (
        <div className={styles.blankList}>
          <LoadingModal />
          <h1 className={styles.blankTitle}>아직 생성된 보고서가 없어요!</h1>
          <div className={styles.blankContent}>
            <p>마음에 드는 기사를 주제로 SPEAKO와 회화를 진행해보세요!</p>
            <p>회화가 모두 종료되면, SPEAKO가 보고서를 제작해 줄거에요</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportList;
