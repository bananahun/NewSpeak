import axiosInstance from './axiosConfig';

// 회원 정보 수정
const updateUserInfo = async (userData: string) => {
  try {
    const response = await axiosInstance.put('/user', userData);
    // console.log(response.data, '[API] updateUserInfo 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] updateUserInfo 에러:', error);
  }
};

// 로그인
const loginUser = async (credentials: string) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    // console.log(response.data, '[API] loginUser 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] loginUser 에러:', error);
  }
};

// 마이페이지 정보 가져오기
const getMyPage = async () => {
  try {
    const response = await axiosInstance.get('/my');
    // console.log(response.data, '[API] getMyPage 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] getMyPage 에러:', error);
  }
};

interface Voca {
  vocaId: number;
  title: string;
  quizSuccessCount: number;
}

interface VocaListResponse {
  vocas: Voca[];
  totalCount: number;
}

// 나만의 단어장 목록 가져오기
// pagination으로 수정가능
const getMyVocas = async (): Promise<number | null> => {
  try {
    const response = await axiosInstance.get<VocaListResponse>('/my/vocas');

    if (response.data && response.data.vocas.length > 0) {
      // console.log(response.data, '[API] getMyVocas 호출 결과');
      return response.data.vocas[0].vocaId;
    } else {
      // console.log('[API] 단어장이 비어있습니다. 새 단어장을 생성합니다.');
      createMyVocas('나의 단어장'); // 단어장이 없으면 새 단어장을 생성
      return getMyVocas(); // 재귀 호출
    }
  } catch (error) {
    console.error('[API] getMyVocas 에러:', error);
    return null;
  }
};

const createMyVocas = async (title: string) => {
  try {
    const response = await axiosInstance.post('/vocas', {
      title,
    });

    // console.log(response.data, '[API] createMyVocas 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] createMyVocas 에러:', error);
  }
};

// 나만의 단어장 상세 가져오기
const getMyVocasDetail = async (vocaId: number) => {
  try {
    const response = await axiosInstance.get(`/vocas/${vocaId}`);
    // console.log(response.data, '[API] getMyVocasDetail 호출 결과');
    return response.data.wordDetails;
  } catch (error) {
    console.error('[API] getMyVocasDetail 에러:', error);
  }
};

// 단어 문제 풀기
const getMyVocasQuiz = async (vocaId: number) => {
  try {
    const response = await axiosInstance.get(`/vocas/${vocaId}/quiz`);
    // console.log(response.data, '[API] getMyVocasQuiz 호출 결과');
    return response.data.wordQuizList;
  } catch (error) {
    console.error('[API] getMyVocasQuiz 에러:', error);
  }
};

// 단어 문제 채점
// 단어 문제 채점에서 quizId 가 필요하지 않나?
const gradeMyVocasQuiz = async (answerCount: number, vocaId: number) => {
  try {
    const response = await axiosInstance.post(`/vocas/${vocaId}/quiz/result`, {
      answerCount,
    });
    // console.log(response.data, '[API] gradeMyVocasQuiz 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] gradeMyVocasQuiz 에러:', error);
  }
};

interface Article {
  id: number;
  title: string;
  publishedDate: string; // API에서 오는 publishedDate의 타입
  // imageUrl,
  // publisher,
}
interface Article {
  id: number;
  title: string;
  publishedDate: string; // API에서 오는 publishedDate의 타입
  imageUrl: string;
  publisher: string;
}
// 스크랩한 기사 목록 가져오기
const getMyArticles = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get('/my/articles', {
      params: {
        page: page,
        size: size,
      },
    });
    // console.log(response.data, '[API] getMyArticles 호출 결과');

    const { content, totalPages } = response.data; // content 필드만 추출
    const articles = content.map((article: Article) => ({
      id: article.id,
      title: article.title,
      publishedDate: new Date(article.publishedDate),

      imageUrl: article.imageUrl,
      publisher: article.publisher,
    }));

    const filteredData = {
      count: articles.length,
      data: articles,
      totalPages,
    };

    // console.log(filteredData, '[API] getMyArticles 호출 결과');
    return filteredData;
  } catch (error) {
    console.error('[API] getMyArticles 에러:', error);
  }
};

const fetchPronounce = async (audioFile: File) => {
  try {
    // FormData 객체 생성
    // console.log(audioFile);
    const formData = new FormData();
    formData.append('audioFile', audioFile); // "file" 필드에 음성 파일 추가

    // POST 요청 보내기
    const response = await axiosInstance.post('/pronounce', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log(response.data, '[API] fetchPronounce 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] fetchPronounce 에러:', error);
  }
};

// 사용자 스트릭 조회
const getUserStreaks = async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const response = await axiosInstance.get('my/exp-logs', {
      params: {
        year: year,
        month: month,
      },
    });

    // console.log(response.data, '[API] getUserStreaks 호출 결과');
    const expData = response.data.dailyExpList.reduce(
      (
        acc: Record<string, number>,
        exp: { date: string; totalExp: number },
      ) => {
        acc[exp.date] = exp.totalExp;
        return acc;
      },
      {},
    );
    return expData;
  } catch (error) {
    console.error('[API] getUserStreaks 에러:', error);
  }
};

const fetchMyWord = async (
  articleId: number,
  vocaId: number,
  wordContent: string,
  sentenceId: number,
) => {
  try {
    const response = await axiosInstance.post(`/articles/${articleId}/vocas`, {
      vocaId,
      wordContent,
      sentenceId,
    });
    // console.log(response.data, '[API] fetchMyWord 호출 결과');
    return response; // 응답 데이터 반환
  } catch (error) {
    console.error('[API] fetchMyWord 에러:', error);
  }
};

const deleteMyWord = async (vocaId: number, wordId: number) => {
  try {
    const response = await axiosInstance.delete(`/vocas/${vocaId}/word`, {
      params: { wordId }, // 쿼리 매개변수로 wordId 전달
    });
    // console.log(response.data, '[API] deleteMyWord 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] deleteMyWord 에러:', error);
  }
};

const createMyArticles = async (articleId: number) => {
  try {
    const response = await axiosInstance.post(`/articles/${articleId}/scrap`);
    // console.log(response.data, '[API] createMyArticles 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] createMyArticles 에러:', error);
  }
};

const deleteMyArticles = async (articleId: number) => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}/scrap`);
    // console.log(response.data, '[API] deleteMyArticles 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] deleteMyArticles 에러:', error);
  }
};

const getReportList = async () => {
  try {
    const response = await axiosInstance.get('/conversation');
    // console.log(response.data, '[API] getReportList 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] getReportList 에러:', error);
  }
};

const getReportDetails = async (reportId: number) => {
  try {
    const response = await axiosInstance.get(`/conversation/${reportId}`);
    // console.log(response.data, '[API] getReportDetails 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] getReportDetails 에러:', error);
  }
};

const getMyWord = async (vocaId: number | null, wordContent: string) => {
  try {
    // API 요청 보내기
    const response = await axiosInstance.post(`vocas/${vocaId}/word`, {
      wordContent,
    });
    // console.log(response, '[API] getMyWord 호출 결과');
    return response;
  } catch (error) {
    // console.log(error, '[API] getMyWord 에러');
  }
};

const userApi = {
  updateUserInfo,
  loginUser,
  getMyPage,
  getMyVocas,
  getMyVocasDetail,
  getMyVocasQuiz,
  gradeMyVocasQuiz,
  getMyArticles,
  getUserStreaks,
  fetchPronounce,
  createMyVocas,
  fetchMyWord,
  createMyArticles,
  deleteMyArticles,
  getReportList,
  getReportDetails,
  deleteMyWord,
  getMyWord,
};

export default userApi;
