import axiosInstance from './axiosConfig';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchArticleList = async () => {
  try {
    const response = await axiosInstance.get('/articles');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching article list:', error);
  }
};
