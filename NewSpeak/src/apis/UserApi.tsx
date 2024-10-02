import axiosInstance from './axiosConfig';

// 회원 정보 수정
const updateUserInfo = async (userData: string) => {
  try {
    const response = await axiosInstance.put('/user', userData);
    console.log(response.data, '[API] updateUserInfo 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] updateUserInfo 에러:', error);
  }
};

// 로그인
const loginUser = async (credentials: string) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    console.log(response.data, '[API] loginUser 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] loginUser 에러:', error);
  }
};

// 마이페이지 정보 가져오기
const getMyPage = async () => {
  try {
    const response = await axiosInstance.get('/my');
    console.log(response.data, '[API] getMyPage 호출 결과');
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
      console.log(response.data, '[API] getMyVocas 호출 결과');
      return response.data.vocas[0].vocaId;
    } else {
      console.log('[API] 단어장이 비어있습니다. 새 단어장을 생성합니다.');
      createMyVocas('나의 단어장'); // 단어장이 없으면 새 단어장을 생성
      return getMyVocas(); // 재귀 호출
    }
  } catch (error) {
    console.error('[API] getMyVocas 에러:', error);
    return null; // 오류 발생 시 빈 배열 반환
  }
};

const createMyVocas = async (title: string) => {
  try {
    const response = await axiosInstance.post('/vocas', {
      title,
    });

    console.log(response.data, '[API] createMyVocas 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] createMyVocas 에러:', error);
  }
};

// 나만의 단어장 상세 가져오기
const getMyVocasDetail = async (vocaId: number) => {
  try {
    const response = await axiosInstance.get(`/vocas/${vocaId}`);
    console.log(response.data, '[API] getMyVocasDetail 호출 결과');
    return response.data.wordDetails;
  } catch (error) {
    console.error('[API] getMyVocasDetail 에러:', error);
  }
};

// 단어 문제 풀기
const getMyVocasQuiz = async (vocaId: number) => {
  try {
    const response = await axiosInstance.get(`/my/vocas/${vocaId}/quiz`);
    console.log(response.data, '[API] getMyVocasQuiz 호출 결과');
    return response.data.wordQuizList;
  } catch (error) {
    console.error('[API] getMyVocasQuiz 에러:', error);
  }
};

// 단어 문제 채점
// 단어 문제 채점에서 quizId 가 필요하지 않나?
const gradeMyVocasQuiz = async (answerCount: number) => {
  try {
    const response = await axiosInstance.post('/my/vocas/quiz/result', {
      answerCount,
    });
    console.log(response.data, '[API] gradeMyVocasQuiz 호출 결과');
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
// 스크랩한 기사 목록 가져오기
const getMyArticles = async (page: number, size: number) => {
  try {
    const response = await axiosInstance.get('/my/articles', {
      params: {
        page: page, // 페이지 번호
        size: size, // 페이지 당 기사 개수
      },
    });
    console.log(response.data, '[API] getMyArticles 호출 결과');

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

    console.log(filteredData, '[API] getMyArticles 호출 결과');
    return filteredData;
  } catch (error) {
    console.error('[API] getMyArticles 에러:', error);
  }
};

const createMyArticles = async (articleId: number) => {
  try {
    const response = await axiosInstance.post(`/articles/${articleId}/scrap`);
    console.log(response.data, '[API] createMyArticles 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] createMyArticles 에러:', error);
  }
};

const deleteMyArticles = async (articleId: number) => {
  try {
    const response = await axiosInstance.delete(`/articles/${articleId}/scrap`);
    console.log(response.data, '[API] deleteMyArticles 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] deleteMyArticles 에러:', error);
  }
};

const fetchPronounce = async (audioFile: File) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append('audioFile', audioFile); // "file" 필드에 음성 파일 추가

    // POST 요청 보내기
    const response = await axiosInstance.post('/pronounce', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data 형식으로 요청
      },
    });
    console.log(response.data, '[API] fetchPronounce 호출 결과');
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

    console.log(response.data, '[API] getUserStreaks 호출 결과');
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

// 임시
// const getUserStreaks = async () => {
//   try {
//     const now = new Date();
//     const requests = [];

//     // 5개월 전까지의 데이터를 가져오기 위한 반복문
//     for (let i = 0; i < 6; i++) {
//       const date = new Date(now.getFullYear(), now.getMonth() - i);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');

//       // 각 월의 데이터를 가져오는 요청을 배열에 추가
//       const request = axiosInstance.get('my/exp-logs', {
//         params: {
//           year: year,
//           month: month,
//         },
//       });

//       requests.push(request);
//     }

//     // 모든 요청이 완료될 때까지 기다림
//     const responses = await Promise.all(requests);

//     // 응답 데이터를 합침
//     const expData = responses.reduce((acc: Record<string, number>, response) => {
//       const data = response.data.dailyExpList;
//       data.forEach((exp: { date: string; totalExp: number }) => {
//         acc[exp.date] = exp.totalExp;
//       });
//       return acc;
//     }, {});

//     console.log(expData, '[API] getUserStreaks 5개월치 호출 결과');
//     return expData;

//   } catch (error) {
//     console.error('[API] getUserStreaks 에러:', error);
//   }
// };

const getReportDetails = async (reportId: number) => {
  try {
    const response = await axiosInstance.get(`/conversation/${reportId}`);
    console.log(response.data, '[API] getReportDetails 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] getReportDetails 에러:', error);
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
  getReportDetails,
  fetchPronounce,
  createMyArticles,
  deleteMyArticles,
};

export default userApi;
