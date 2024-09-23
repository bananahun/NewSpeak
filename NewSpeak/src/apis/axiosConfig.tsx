import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.error('Axios 에러: ', error.response);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
