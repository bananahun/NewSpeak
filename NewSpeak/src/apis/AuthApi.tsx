import axiosInstance from './axiosConfig';

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const loginWithOAuth = async (provider: string) => {
  try {
    const redirectUrl = `${AUTH_URL}/${provider}`;
    console.log(redirectUrl);
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const fetchEmail = async () => {
  try {
    const response = await axiosInstance.get('/auth/email');
    console.log(response);
  } catch (error) {
    console.error('Fetch email error:', error);
  }
};
