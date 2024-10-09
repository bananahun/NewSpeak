import React, { useEffect, useState } from 'react';
import styles from './Landing.module.scss';
import sectionStyles from '../../styles/section.module.scss';
import { fullpageScroll } from '../../utils/ScrollUtils';
import { loginWithOAuth } from '../../apis/AuthApi';
import background1 from '../../assets/landing/timeSquare.jpg';
import background2 from '../../assets/landing/newspaper.jpg';
import background3 from '../../assets/landing/mic.jpg';
import background4 from '../../assets/landing/technology.jpg';
import background5 from '../../assets/landing/newspaper2.jpg';
import background6 from '../../assets/landing/career.jpg';
import { RiArrowDownWideFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../components/ThemeSwitcher/ThemeSwitcher';
import useAuthStore from '../../store/AuthStore';
import googleLogo from '../../assets/oauth/web_neutral_sq_ctn@2x.png';
import kakaoLogo from '../../assets/oauth/kakao_login_medium_narrow.png';

const Landing = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [currentSection, setCurrentSection] = useState(0);
  const [background, setBackground] = useState<string>('');
  const [sectionChanging, setSectionChanging] = useState(false);
  const [openOAuthButtonTop, setOpenOAuthButtonTop] = useState(false);
  const [openOAuthButtonIn, setOpenOAuthButtonIn] = useState(false);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    fullpageScroll();
  }, []);

  useEffect(() => {
    if (sectionChanging) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        setSectionChanging(false);
        document.body.style.overflow = 'auto';
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [sectionChanging]);

  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.landingSection}`);

    const scrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setSectionChanging(true);
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
            const index = Array.from(sections).indexOf(entry.target);
            setCurrentSection(index);
            return;
          }
          entry.target.classList.remove(styles.fadeIn);
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(`.${styles.fadeInSection}`);
    elements.forEach(el => scrollObserver.observe(el));

    return () => {
      elements.forEach(el => scrollObserver.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if (sectionChanging) {
      const timer = setTimeout(() => {
        switch (currentSection) {
          case 1:
            setBackground(background1);
            break;
          case 2:
            setBackground(background2);
            break;
          case 3:
            setBackground(background3);
            break;
          case 4:
            setBackground(background4);
            break;
          case 5:
            setBackground(background5);
            break;
          case 6:
            setBackground(background6);
            break;
          default:
            setBackground('');
            break;
        }
        setSectionChanging(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentSection, sectionChanging]);

  const scrollDown = (index: number) => {
    if (index !== currentSection) return;
    return (
      <>
        <RiArrowDownWideFill
          size={40}
          className={`${styles.scrollDown} ${styles.first}`}
        />
        <RiArrowDownWideFill
          size={40}
          className={`${styles.scrollDown} ${styles.second}`}
        />
        <RiArrowDownWideFill
          size={40}
          className={`${styles.scrollDown} ${styles.third}`}
        />
      </>
    );
  };

  const handleSectionClick = () => {
    const scrollEvent = new WheelEvent('wheel', {
      bubbles: true,
      deltaY: 10,
    });
    window.dispatchEvent(scrollEvent);
  };

  const handleClickHomeButton = () => {
    navigate('/');
  };

  const handleClickLoginButton = (pos: string) => {
    if (pos === 'top') {
      setOpenOAuthButtonTop(prev => !prev);
      return;
    }
    setOpenOAuthButtonIn(prev => !prev);
  };

  const loginWith = loginWithOAuth;

  const oauthContainer = () => {
    return (
      <div className={styles.oAuthContainer}>
        <div className={styles.google} onClick={() => loginWith('google')}>
          <img src={googleLogo} alt="구글" />
        </div>
        <div className={styles.kakao}>
          <img
            src={kakaoLogo}
            alt="카카오"
            onClick={() => loginWith('kakao')}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
      {isLoggedIn ? (
        <button className={styles.loginButton} onClick={handleClickHomeButton}>
          Home
        </button>
      ) : (
        <>
          <button
            className={styles.loginButton}
            onClick={() => handleClickLoginButton('top')}
          >
            Login
            {openOAuthButtonTop && oauthContainer()}
          </button>
        </>
      )}
      <div className={`${styles.landingBackground}`}>
        <div className={styles.backgroundInner}>
          <div
            className={`${styles.bgImageContainer} ${
              sectionChanging ? '' : styles.active
            }`}
          >
            <img src={background} className={styles.bg1} />
          </div>
        </div>
      </div>
      <div className={styles.landing}>
        <div className={sectionStyles.section} onClick={handleSectionClick}>
          <div className={`${styles.landingSection} ${styles.fadeInSection}`}>
            <h1 className={styles.landingText}>News, Speak</h1>
            <h1 className={styles.landingText}>NewSpeak</h1>
            {scrollDown(0)}
          </div>
        </div>
        <div className={sectionStyles.section} onClick={handleSectionClick}>
          <div className={`${styles.landingSection} ${styles.fadeInSection}`}>
            <h1 className={styles.landingText}>영어를 배우세요 자연스럽게</h1>
            <h2 className={styles.landingSubText}>
              세상을 읽고, 언어로 말하다
            </h2>
            {scrollDown(1)}
          </div>
        </div>
        <div className={sectionStyles.section} onClick={handleSectionClick}>
          <div
            className={`${styles.landingSection} ${styles.pageA} ${styles.fadeInSection}`}
          >
            <h1 className={styles.landingText}>뉴스, 당신의 새로운 선생님</h1>
            <h2 className={styles.landingSubText}>
              실시간 뉴스로 배우는 진짜 영어
            </h2>
            {scrollDown(2)}
          </div>
        </div>
        <div className={sectionStyles.section} onClick={handleSectionClick}>
          <div
            className={`${styles.landingSection} ${styles.pageA} ${styles.fadeInSection}`}
          >
            <h1 className={styles.landingText}>자연스럽게 말하세요</h1>
            <h2 className={styles.landingSubText}>
              듣고, 배우고, 대화를 이끌다
            </h2>
            {scrollDown(3)}
          </div>
        </div>
        <div className={sectionStyles.section} onClick={handleSectionClick}>
          <div
            className={`${styles.landingSection} ${styles.pageA} ${styles.fadeInSection}`}
          >
            <h1 className={styles.landingText}>
              AI로 더 똑똑하게, 당신으로 완성되다
            </h1>
            <h2 className={styles.landingSubText}>
              최첨단 음성 인식과 맞춤형 피드백
            </h2>
            {scrollDown(4)}
          </div>
        </div>
        <div className={sectionStyles.section} onClick={handleSectionClick}>
          <div
            className={`${styles.landingSection} ${styles.pageA} ${styles.fadeInSection}`}
          >
            <h1 className={styles.landingText}>어디서든 영어를 정복하세요</h1>
            <h2 className={styles.landingSubText}>
              당신만의 속도, 당신만의 방식으로
            </h2>
            {scrollDown(5)}
          </div>
        </div>
        <div className={sectionStyles.section}>
          <div
            className={`${styles.landingSection} ${styles.pageA} ${styles.fadeInSection}`}
          >
            <h1 className={styles.landingText}>이제, 말할 준비가 되셨나요?</h1>
            <h2 className={styles.landingSubText}>
              당신의 여정이 지금 시작됩니다
            </h2>
            {isLoggedIn ? (
              <button
                className={styles.loginButton}
                onClick={handleClickHomeButton}
              >
                Home
              </button>
            ) : (
              <>
                <button
                  className={styles.startButton}
                  onClick={() => handleClickLoginButton('in')}
                >
                  NewSpeak 시작하기
                  {openOAuthButtonIn && oauthContainer()}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
