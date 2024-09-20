import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import useRegisterStore from '../../store/RegisterStore';
import styles from './Register.module.scss';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';

const Register = () => {
  const navigate = useNavigate();
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

  const nextStep = () => setStep(prevStep => Math.min(prevStep + 1, 2));

  const handleSubmit = async () => {
    try {
      // 회원가입 api
      resetFormData();
      navigate('/');
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
      default:
        return <Step1 />;
    }
  };

  const actionButtonNext = () => {
    if (step === 1) {
      return <button onClick={nextStep}>다음</button>;
    } else {
      return <button onClick={handleSubmit}>회원가입 완료</button>;
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
        <div className={styles.step}>
          <div className={styles.registerForm}>{renderStep(step)}</div>
        </div>
        <div className={styles.buttonGroup}>{actionButtonNext()}</div>
      </div>
    </div>
  );
};

export default Register;
