import React, { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import styles from './ReportList.module.scss';
import axiosInstance from '../../apis/axiosConfig';
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
  const [reportData, setReportData] = useState<Report[]>([]);
  const [parsedReportData, setParsedReportData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClick = (reportId: number) => {
    navigate('/report', { state: { reportId } });
  };

  const renderRadarChart = (report: any) => {
    const data = [
      {
        subject: '명료성',
        score: report.feedback.clarity.score,
        fullMark: 100,
      },
      {
        subject: '이해력',
        score: report.feedback.comprehension.score,
        fullMark: 100,
      },
      {
        subject: '표현력',
        score: report.feedback.expressiveness.score,
        fullMark: 100,
      },
      {
        subject: '문법',
        score: report.feedback.grammar.score,
        fullMark: 100,
      },
      {
        subject: '어휘',
        score: report.feedback.vocabulary.score,
        fullMark: 100,
      },
    ];

    const renderCustomTick = (props: any) => {
      const { payload, x, y, textAnchor, ...rest } = props;
      return (
        <text
          {...rest}
          x={x}
          y={y + 1.35}
          textAnchor="middle"
          fill="var(--font-color)"
          fontSize="12px"
        >
          {payload.value}
        </text>
      );
    };

    return (
      <RadarChart
        width={170}
        height={150}
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
        <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} />
        <Radar
          name="Feedback"
          dataKey="score"
          stroke="var(--accent-color)"
          fill="var(--accent-color)"
          fillOpacity={0.6}
        />
      </RadarChart>
    );
  };

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axiosInstance.get('/conversation');
        const rawData = response.data.reports;

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
