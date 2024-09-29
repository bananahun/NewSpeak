import axiosInstance from "./axiosConfig";

// 기사 리스트 조회
const getArticleList = async () => {
  try {
    const response = await axiosInstance.get("/articles");
    console.log(response.data, "[API] getArticleList 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getArticleList 에러:", error);
  }
};

const getArticleLevel = async (level: number) => {
  try {
    const response = await axiosInstance.get(`/articles/level/${level}`);
    console.log(response.data, "[API] getArticleLevel 호출 결과");
    return response.data;
  } catch (error) {
    console.error("[API] getArticleLevel 에러:", error);
  }
};

const getArticleSearch = async (title: string, page: number) => {
  try {
    // `params`를 객체 형태로 전달하여 쿼리 파라미터를 설정
    const response = await axiosInstance.get(`/articles/search/${title}`, {
      params: { page }, // page를 객체로 전달
    });
    console.log(response.data, "[API] getArticleSearch 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getArticleSearch 에러:", error);
  }
};

const getWordCloud = async () => {
  try {
    const response = await axiosInstance.get("/keywords");
    console.log(response.data, "[API] getWordCloud 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getWordCloud 에러:", error);
  }
};

const getArticleCategory = async (categoryid: number, page: number) => {
  try {
    const response = await axiosInstance.get(
      `/articles/category/${categoryid}`,
      {
        params: { page },
      }
    );
    console.log(response.data, "[API] getArticleCategory 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getArticleCategory 에러:", error);
  }
};

const getArticleWordCloud = async (keyword_id: number, page: number) => {
  try {
    const response = await axiosInstance.get(
      `/articles/keyword/${keyword_id}`,
      {
        params: { page }, // 쿼리 파라미터를 객체로 전달
      }
    );
    console.log(response.data, "[API] getArticleWordCloud 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getArticleWordCloud 에러:", error);
  }
};

const getArticleDetail = async (articleid: number) => {
  try {
    const response = await axiosInstance.get(`/articles/${articleid}`);
    console.log(response.data, "[API] getArticleDetail 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getArticleDetail 에러:", error);
  }
};

const getArticleListCategory = async () => {
  try {
    const response = await axiosInstance.get(`/articles/main`);
    console.log(response.data, "[API] getArticleListCategory 호출 결과");
    return response.data.data;
  } catch (error) {
    console.error("[API] getArticleListCategory 에러:", error);
  }
};

const useArticleApi = {
  getArticleList,
  getArticleLevel,
  getArticleCategory,
  getArticleSearch,
  getWordCloud,
  getArticleWordCloud,
  getArticleDetail,
  getArticleListCategory,
};

export default useArticleApi;
