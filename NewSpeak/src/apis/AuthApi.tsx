import axiosInstance from './axiosConfig';

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

interface UserCreateForm {
  email: string;
  nickname: string;
  categories: string[];
}

export const loginWithOAuth = async (provider: string) => {
  try {
    const redirectUrl = `${AUTH_URL}/${provider}`;

    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const fetchEmail = async () => {
  try {
    const response = await axiosInstance.get('/auth/email');
    return response.data;
  } catch (error) {
    console.error('Fetch email error:', error);
    return error;
  }
};

export const signUp = async (form: UserCreateForm) => {
  try {
    const response = await axiosInstance.post('/auth/signUp', form);
    return response.data;
  } catch (error) {
    console.error('Create user error:', error);
    return null;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/my/info');
    return response.data;
  } catch (error) {
    console.error('Get user info error:', error);
    return false;
  }
};
