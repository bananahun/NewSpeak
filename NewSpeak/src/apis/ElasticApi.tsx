import axiosInstance from './axiosConfig';

// 1. 키워드로 검색
const getElasticByKeyword = async (keyword: string, page: number) => {
  try {
    const response = await axiosInstance.get('/elastic', {
      params: { keyword, page },
    });
    // console.log(response.data, "[API] getElasticByKeyword 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByKeyword 에러:', error);
  }
};

// 2. 키워드로 본문 내용 검색
const getElasticByContent = async (keyword: string, page: number) => {
  try {
    const response = await axiosInstance.get('/elastic/content', {
      params: { keyword, page },
    });
    // console.log(response.data, "[API] getElasticByContent 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByContent 에러:', error);
  }
};

// 3. 한국어 본문 내용 검색
const getElasticByContentKR = async (keyword: string, page: number) => {
  try {
    const response = await axiosInstance.get('/elastic/content/kr', {
      params: { keyword, page },
    });
    // console.log(response.data, "[API] getElasticByContentKR 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByContentKR 에러:', error);
  }
};

// 4. 날짜로 검색
const getElasticByDate = async (
  startDate: string,
  endDate: string,
  page: number,
) => {
  try {
    const response = await axiosInstance.get('/elastic/date', {
      params: { startDate, endDate, page },
    });
    // console.log(response.data, "[API] getElasticByDate 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByDate 에러:', error);
  }
};

// 5. 날짜와 제목으로 검색
const getElasticByTitleDate = async (
  startDate: string,
  endDate: string,
  title: string,
  page: number,
) => {
  try {
    const response = await axiosInstance.get('/elastic/titleDate', {
      params: { startDate, endDate, title, page },
    });
    // console.log(response.data, "[API] getElasticByTitleDate 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByTitleDate 에러:', error);
  }
};

// 6. 날짜와 본문 내용으로 검색
const getElasticByContentDate = async (
  startDate: string,
  endDate: string,
  content: string,
  page: number,
) => {
  try {
    const response = await axiosInstance.get('/elastic/contentDate', {
      params: { startDate, endDate, content, page },
    });
    // console.log(response.data, "[API] getElasticByContentDate 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByContentDate 에러:', error);
  }
};

// 7. 제목과 본문 내용으로 검색
const getElasticByTitleContent = async (
  title: string,
  content: string,
  page: number,
) => {
  try {
    const response = await axiosInstance.get('/elastic/titleContent', {
      params: { title, content, page },
    });
    // console.log(response.data, "[API] getElasticByTitleContent 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByTitleContent 에러:', error);
  }
};

// 8. 날짜, 제목, 본문 내용으로 검색
const getElasticByTitleContentDate = async (
  startDate: string,
  endDate: string,
  title: string,
  content: string,
  page: number,
) => {
  try {
    const response = await axiosInstance.get('/elastic/titleContentDate', {
      params: { startDate, endDate, title, content, page },
    });
    // console.log(response.data, "[API] getElasticByTitleContentDate 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error('[API] getElasticByTitleContentDate 에러:', error);
  }
};

// Elastic API 함수들을 객체로 모아 내보내기
const useElasticApi = {
  getElasticByKeyword,
  getElasticByContent,
  getElasticByContentKR,
  getElasticByDate,
  getElasticByTitleDate,
  getElasticByContentDate,
  getElasticByTitleContent,
  getElasticByTitleContentDate,
};

export default useElasticApi;
