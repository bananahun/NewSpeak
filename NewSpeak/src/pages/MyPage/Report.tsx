import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useWordSelectorState } from '../../store/ModalStore';
import { useLocation } from 'react-router-dom';
import userApi from '../../apis/UserApi';
import styles from './Report.module.scss';

interface Report {
  id: number;
  title: string;
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

interface Conversation {
  user: string;
  assistant: string;
}

const Report = () => {
  const location = useLocation();
  const { getReportDetails } = userApi;
  const { isOpen } = useWordSelectorState();
  const { reportId } = location.state || {};
  const [reportData, setReportData] = useState<Report | null>(null);
  const [conversationData, setConversationData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [transitionClass, setTransitionClass] = useState('');

  const renderBarChart = (report: any) => {
    const data = [
      {
        subject: '명료성',
        score: report.feedback.clarity.score,
      },
      {
        subject: '이해력',
        score: report.feedback.comprehension.score,
      },
      {
        subject: '표현력',
        score: report.feedback.expressiveness.score,
      },
      {
        subject: '문법',
        score: report.feedback.grammar.score,
      },
      {
        subject: '어휘',
        score: report.feedback.vocabulary.score,
      },
    ];

    let colors = ['#6A9FB5', '#F4A261', '#E76F51', '#2A9D8F', '#264653'];

    const shuffleArray = (array: string[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    colors = shuffleArray(colors);

    return (
      <ResponsiveContainer width={`${100 / (2 - itemsPerPage)}%`} height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" stroke="var(--font-color)" />
          <YAxis stroke="var(--font-color)" />
          <Tooltip
            contentStyle={{ color: 'black' }}
            itemStyle={{ color: 'black' }}
          />
          <Legend />
          <Bar dataKey="score" name={'점수'} fill="var(--font-color)">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const nextPage = () => {
    if (isOpen) return;
    setTransitionClass(styles['pageExit']);
    setTimeout(() => {
      const nextPage = page + itemsPerPage;
      if (nextPage >= 3) setPage(0);
      else {
        setPage(nextPage);
      }
      setTransitionClass(styles['pageEnter']);
    }, 500);
  };

  const renderAPage = () => {
    if (isLoading) return <div>Loading</div>;
    if (!reportData) return <div>Loading</div>;

    return (
      <div className={`${styles.page} ${transitionClass}`}>
        <table className={styles.feedbackTable}>
          <thead>
            <tr>
              <th>항목</th>
              <th>내용</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>어휘</td>
              <td>{reportData.content.feedback.vocabulary.feedback}</td>
              <td>{reportData.content.feedback.vocabulary.score}</td>
            </tr>
            <tr>
              <td>표현력</td>
              <td>{reportData.content.feedback.expressiveness.feedback}</td>
              <td>{reportData.content.feedback.expressiveness.score}</td>
            </tr>
            <tr>
              <td>이해력</td>
              <td>{reportData.content.feedback.comprehension.feedback}</td>
              <td>{reportData.content.feedback.comprehension.score}</td>
            </tr>
            <tr>
              <td>명료성</td>
              <td>{reportData.content.feedback.clarity.feedback}</td>
              <td>{reportData.content.feedback.clarity.score}</td>
            </tr>
            <tr>
              <td>문법</td>
              <td>{reportData.content.feedback.grammar.feedback}</td>
              <td>{reportData.content.feedback.grammar.score}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>총점</td>
              <td>
                <ul>
                  {reportData.content.suggestions.map((suggestion, index) => (
                    <div key={index} className={styles.fontSize}>
                      {suggestion}
                    </div>
                  ))}
                </ul>
              </td>
              <td>{reportData.content.score}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

  const renderBPage = () => {
    if (isLoading) return <div>Loading</div>;
    if (!reportData) return <div>Loading</div>;
    return (
      <div className={`${styles.page} ${transitionClass}`}>
        {renderBarChart(reportData.content)}
      </div>
    );
  };

  const renderCPage = () => {
    if (isLoading) return <div>Loading</div>;
    if (!reportData) return <div>Loading</div>;
    return (
      <div className={`${styles.page} ${transitionClass}`}>
        <div className={styles.conversation}>
          {conversationData.map((item, index) => (
            <div key={index} className={styles.message}>
              {item.user && (
                <div className={styles.userMessage}>
                  <strong>나: </strong>
                  {item.user}
                </div>
              )}
              {item.assistant && (
                <div className={styles.assistantMessage}>
                  <strong>AI: </strong>
                  {item.assistant}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const pages = [renderAPage(), renderBPage(), renderCPage()];

  useEffect(() => {
    const updateItemsPerPage = () => {
      setPage(0);
      if (window.innerWidth >= 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    if (!reportId) return;

    getReportDetails(reportId)
      .then(response => {
        const parsedContent = JSON.parse(response.content);

        const parsedData: Report = {
          id: response.id,
          title: response.title || parsedContent.title,
          content: parsedContent.content,
        };
        setReportData(parsedData);
        console.log(parsedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [reportId]);

  useEffect(() => {
    if (reportData?.content) {
      try {
        const parsedConversation = JSON.parse(reportData.content.conversation);
        setConversationData(parsedConversation);
      } catch (error) {
        console.error('Failed to parse conversation data: ', error);
      }
      setIsLoading(false);
    }
  }, [reportData]);

  useEffect(() => {
    console.log(conversationData);
  }, [conversationData]);

  return (
    <div className={styles.reportContainer}>
      {!isLoading && reportData ? (
        <>
          <h1 className={styles.title}>{reportData.title}</h1>
          <div className={styles.content} onClick={nextPage}>
            {pages.slice(page, page + itemsPerPage)}
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Report;
