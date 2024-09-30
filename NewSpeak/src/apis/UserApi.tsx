import axiosInstance from './axiosConfig';

// 회원 정보 수정
const updateUserInfo = async (userData:string) => {
  try {
    const response = await axiosInstance.put('/user', userData);
    console.log(response.data, '[API] updateUserInfo 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] updateUserInfo 에러:', error);
  }
};

// 로그인
const loginUser = async (credentials:string) => {
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

// 나만의 단어장 목록 가져오기
// pagination으로 수정가능
const getMyVocas = async (vocaId:number) => {
  try {
    const response = await axiosInstance.get('/my/vocas',{
        params: {
            vocaId: vocaId, // 또는 간단히 vocaId
          },
    });

    console.log(response.data, '[API] getMyVocas 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] getMyVocas 에러:', error);
  }
};

// 나만의 단어장 상세 가져오기
const getMyVocasDetail = async (vocaId:number) => {
  try {
    const response = await axiosInstance.get(`/my/vocas/${vocaId}`);
    console.log(response.data, '[API] getMyVocasDetail 호출 결과');
    return response.data.wordDetails;
  } catch (error) {
    console.error('[API] getMyVocasDetail 에러:', error);
  }
};

// 단어 문제 풀기
const getMyVocasQuiz = async (vocaId:number) => {
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
const gradeMyVocasQuiz = async (answerCount:number) => {
  try {
    const response = await axiosInstance.post('/my/vocas/quiz/result',{answerCount});
    console.log(response.data, '[API] gradeMyVocasQuiz 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] gradeMyVocasQuiz 에러:', error);
  }
};

// 스크랩한 기사 목록 가져오기
const getMyArticles = async () => {
  try {
    const response = await axiosInstance.get('/my/articles');
    console.log(response.data, '[API] getMyArticles 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] getMyArticles 에러:', error);
  }
};

const createMyArticles = async (articleId: number) => {
  try {
    const response = await axiosInstance.post(`/my/articles/${articleId}`);
    console.log(response.data, '[API] createMyArticles 호출 결과');
    return response.data;
  } catch (error) {
    console.error('[API] createMyArticles 에러:', error);
  }
};

const deleteMyArticles = async (articleId: number) => {
  try {
    const response = await axiosInstance.delete(`/my/articles/${articleId}`);
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
    formData.append('file', audioFile); // "file" 필드에 음성 파일 추가

    // POST 요청 보내기
    const response = await axiosInstance.post('/my/pronounce', formData, {
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
    const expData = response.data.dailyExpList.reduce((acc: Record<string, number>, exp: { date: string; totalExp: number }) => {
      acc[exp.date] = exp.totalExp;
      return acc;
    }, {});
    return expData;
  } catch (error) {
    console.error('[API] getUserStreaks 에러:', error);
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
    createMyArticles,
    deleteMyArticles
}

export default userApi;
