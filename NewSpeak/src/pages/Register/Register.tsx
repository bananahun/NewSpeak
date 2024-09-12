import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import useRegisterStore from '../../store/RegisterStore';
import styles from './Register.module.scss';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import googleLogo from '../../assets/google_login.png';
import kakaoLogo from '../../assets/kakao_login_medium_narrow.png';

const Register = () => {
  const [mainLogo, setMainLogo] = useState(logo);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'light',
  );
  const [step, setStep] = useState(1);
  const { formData, resetFormData } = useRegisterStore();

  useEffect(() => {
    resetFormData();
  }, []);

  useEffect(() => {
    if (selectedTheme === 'dark') {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [selectedTheme, setSelectedTheme]);

  const nextStep = () => setStep(prevStep => Math.min(prevStep + 1, 3));
  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 1));

  const handleSubmit = async () => {
    try {
      // 회원가입 api
      resetFormData();
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  const renderStep = (step: Number) => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  const actionButtonPrev = () => {
    if (step === 1) {
      return (
        <button onClick={prevStep} disabled>
          이전
        </button>
      );
    } else if (step === 3) {
      return <button onClick={handleSubmit}>나중에 입력하기</button>;
    }
    return <button onClick={prevStep}>이전</button>;
  };

  const actionButtonNext = () => {
    if (step < 3) {
      return <button onClick={nextStep}>다음</button>;
    } else {
      return <button onClick={handleSubmit}>회원가입 완료</button>;
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={mainLogo} alt="메인로고" />
        </Link>
      </div>
      <div className={styles.registerFormContainer}>
        <div className={styles.step}>
          <div className={styles.registerForm}>{renderStep(step)}</div>
        </div>
        <div className={styles.buttonGroup}>
          {actionButtonPrev()}
          {actionButtonNext()}
        </div>
      </div>
      <div className={styles.oAuthLogin}>
        <button className={styles.google}>
          <img src={googleLogo} alt="구글" />
          구글 로그인
        </button>
        <div className={styles.kakao}>
          <img src={kakaoLogo} alt="카카오" />
        </div>
      </div>
    </div>
  );
};

export default Register;
