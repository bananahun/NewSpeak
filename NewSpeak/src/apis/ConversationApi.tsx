import axiosInstance from './axiosConfig';
import useArticleStore from '../store/ArticleStore';
import useConversationStore from '../store/ConversationStore';
import { useEffect, useRef, useState } from 'react';

interface message {
  sender: 'user' | 'assistant';
  content: string;
}

interface RecommendItem {
  [key: string]: string;
}

interface GetRecommend {
  dialog: {
    recommend: RecommendItem[];
  };
}

const initMessage = 'I need a recommendation question for this article.';

const useConversationApi = () => {
  const { articleMeta } = useArticleStore();
  const {
    convThreadId,
    convRunId,
    reportThreadId,
    reportRunId,
    recommendedAnswers,
    conversation,
    reportCreated,
    isGeneratingReport,
    setConvThreadId,
    setConvRunId,
    setReportThreadId,
    setReportRunId,
    setRecommendedAnswers,
    setReportCreated,
    setIsGeneratingReport,
    clearConvData,
    clearConversation,
  } = useConversationStore();
  const isFirstRender = useRef(false);
  const isFirstRecommend = useRef(false);
  const reportThreadCreated = useRef(false);
  const reportRunCreated = useRef(false);

  const createThread = async () => {
    if (isGeneratingReport) return;
    const articleId = articleMeta?.id;
    if (!articleId) {
      console.error('No article is selected');
      return;
    }
    try {
      const response = await axiosInstance.post('/conversation/dialog', {
        articleId,
      });
      console.log('createThread:', response.data);
      setConvThreadId(response.data.id);
      isFirstRender.current = true;
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!convThreadId) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const recommendation = async () => {
        if (convThreadId) {
          try {
            await postSpeechToThread(initMessage);
          } catch (error) {
            console.error('Failed to get recommendation', error);
          }
        }
      };
      recommendation();
    }
  }, [convThreadId, isFirstRender.current]);

  useEffect(() => {
    if (!convThreadId) return;
    if (isFirstRecommend.current) {
      isFirstRecommend.current = false;
      const recommendation = async () => {
        if (convRunId) {
          try {
            const response: GetRecommend = await getResponseAudio();
            const recommendedSentences: string[] =
              response.dialog.recommend.map(item => {
                return Object.values(item)[0];
              });
            setRecommendedAnswers(recommendedSentences);
            setConvRunId('');
          } catch (error) {
            console.error('Failed to set recommendation', error);
          }
        }
      };
      recommendation();
    }
  }, [convRunId, isFirstRecommend.current]);

  const postSpeechToThread = async (answer: string) => {
    if (!convThreadId) {
      console.error('No thread is selected');
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/conversation/dialog/${convThreadId}`,
        {
          answer,
        },
      );
      console.log('postSpeechToThread:', response.data);
      if (answer === initMessage) {
        isFirstRecommend.current = true;
      }
      setConvRunId(response.data.id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getResponseAudio = async (count = 3, delay = 3000) => {
    if (!convThreadId) {
      console.error('No thread is selected for response audio');
      return;
    }
    if (!convRunId) {
      console.error('No run is selected for response audio');
      return;
    }
    try {
      await new Promise(res => {
        setTimeout(res, delay);
      });
      const response = await axiosInstance.get(
        `/conversation/dialog/${convThreadId}/${convRunId}`,
      );
      console.log('getResponseAudio:', response.data);
      if (response && response.data && response.data.dialog) {
        const recommendedSentences = response.data.dialog.recommend.map(
          (item: any) => {
            return Object.values(item)[0];
          },
        );
        setRecommendedAnswers(recommendedSentences);
        setConvRunId('');
        return response.data;
      }
    } catch (error) {
      if (count > 0) {
        console.warn(`audio 호출 실패, ${count}번 더 시도`);
        await new Promise(res => {
          setTimeout(res, delay);
        });
        return await getResponseAudio(count - 1, delay);
      } else {
        console.error(error);
      }
    }
  };

  const createReportThread = async () => {
    setIsGeneratingReport(true);
    try {
      const response = await axiosInstance.post('/conversation/report', {});
      console.log('createReportThread:', response.data);
      setReportThreadId(response.data.id);
      reportThreadCreated.current = true;
      return response.data;
    } catch (error) {
      console.error(error);
      setIsGeneratingReport(false);
    }
  };

  useEffect(() => {
    if (reportThreadId) {
      if (reportThreadCreated.current) {
        reportThreadCreated.current = false;
        postReportDetail();
      }
    }
  }, [reportThreadId]);

  const postReportDetail = async () => {
    if (!reportThreadId) return;

    const conversations = conversation
      .map((msg, index, arr) => {
        if (msg.sender === 'user') {
          const assistantMsg = arr[index + 1];
          if (assistantMsg && assistantMsg.sender === 'assistant') {
            return {
              user: msg.content,
              assistant: assistantMsg.content,
            };
          }
        }
        return null;
      })
      .filter(msg => msg !== null);

    console.log(conversations);

    try {
      const response = await axiosInstance.post(
        `/conversation/report/${reportThreadId}`,
        { conversations },
      );
      console.log('Report Run Id generated:', response.data);
      setReportRunId(response.data.id);
      reportRunCreated.current = true;
      return response.data;
    } catch (error) {
      console.error('Failed to post report details:', error);
      setIsGeneratingReport(false);
    }
  };

  useEffect(() => {
    if (reportRunId) {
      if (reportRunCreated.current) {
        reportRunCreated.current = false;
        generateReport();
      }
    }
  }, [reportRunId]);

  const generateReport = async (count = 10, delay = 10000) => {
    if (!reportThreadId) {
      console.error('No report thread is selected');
      return;
    }
    if (!reportRunId) {
      console.error('No run is selected for report');
      return;
    }
    await new Promise(res => {
      setTimeout(res, delay);
    });
    for (let i = 0; i < count; i++) {
      try {
        const response = await axiosInstance.get(
          `/conversation/report/${reportThreadId}/${reportRunId}`,
        );
        console.log('generateReport:', response.data);
        clearConvData();
        clearConversation();
        setReportCreated(true);
        return response.data;
      } catch (error) {
        console.error(
          `generateReport failed, attempt ${i + 1}/${count}:`,
          error,
        );
      }

      if (i === count - 1) {
        console.error('generateReport: 모든 시도 실패');
        setIsGeneratingReport(false);
      } else {
        console.log(`재시도 ${i + 2}/${count} 대기 중... ${delay / 1000}초`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  useEffect(() => {
    if (reportCreated) {
      console.log('완료');
      setIsGeneratingReport(false);
      setReportCreated(false);
      return;
    }
  }, [reportCreated]);

  return {
    convRunId,
    recommendedAnswers,
    createThread,
    postSpeechToThread,
    getResponseAudio,
    createReportThread,
    postReportDetail,
    generateReport,
  };
};

export default useConversationApi;
