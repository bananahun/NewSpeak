import axiosInstance from './axiosConfig';
import useArticleStore from '../store/ArticleStore';
import useConversationStore from '../store/ConversationStore';

interface message {
  sender: 'user' | 'assistant';
  content: string;
}

const useConversationApi = () => {
  const { articleMeta } = useArticleStore();
  const {
    convThreadId,
    convRunId,
    reportThreadId,
    reportRunId,
    setConvThreadId,
    setConvRunId,
    setReportThreadId,
    setReportRunId,
    clearConvData,
  } = useConversationStore();

  const createThread = async () => {
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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

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
      setConvRunId(response.data.id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getResponseAudio = async () => {
    if (!convThreadId) {
      console.error('No thread is selected for response audio');
      return;
    }
    if (!convRunId) {
      console.error('No run is selected for response audio');
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/conversation/dialog/${convThreadId}/${convRunId}`,
      );
      console.log('getResponseAudio:', response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createReportThread = async () => {
    try {
      const response = await axiosInstance.post('/conversation/report', {});
      console.log('createReportThread:', response.data);
      setReportThreadId(response.data.id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const postReportDetail = async (conversation: message[]) => {
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
      console.log('Report generated:', response.data);
      setReportRunId(response.data.id);
      return response.data;
    } catch (error) {
      console.error('Failed to post report details:', error);
    }
  };

  const generateReport = async () => {
    if (!reportThreadId) {
      console.error('No report thread is selected');
      return;
    }
    if (!reportRunId) {
      console.error('No run is selected for report');
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/conversation/report/${reportThreadId}/${reportRunId}`,
      );
      console.log('generateReport:', response.data);
      clearConvData();
      // 보고서는 return하는거보다, 어디 저장을 바로 해야될거같은데 ?
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createThread,
    postSpeechToThread,
    getResponseAudio,
    createReportThread,
    postReportDetail,
    generateReport,
  };
};

export default useConversationApi;
