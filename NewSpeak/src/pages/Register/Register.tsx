import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore';
import styles from './Register.module.scss';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import Category from '../../components/Profile/Category';
import { fetchEmail, signUp } from '../../apis/AuthApi';

interface UserCreateForm {
  email: string;
  nickname: string;
  categories: string[];
}

const Register = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [mainLogo, setMainLogo] = useState(logo);
  const [email, setEmail] = useState('이메일');
  const [nickname, setNickname] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetEmail = async () => {
      try {
        const userEmail = await fetchEmail();
        setEmail(userEmail || '이메일을 불러오지 못했습니다.');
      } catch (error) {
        console.error('Failed to fetch email', error);
      }
    };
    fetchAndSetEmail();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [theme]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formdata: UserCreateForm = { email, nickname, categories };
      const register = await signUp(formdata);
      if (register) {
        navigate('/');
      }
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={mainLogo} alt="메인로고" style={{ height: '150px' }} />
        </Link>
      </div>
      <div className={styles.registerFormContainer}>
        <form className={styles.step} onSubmit={handleSubmit}>
          <div className={styles.registerForm}>
            <input type="email" value={email} disabled />
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="닉네임"
              required
            />
            <div className={styles.categorySelector}>{/* <Category /> */}</div>
          </div>
          <button type="submit">회원가입 완료</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
