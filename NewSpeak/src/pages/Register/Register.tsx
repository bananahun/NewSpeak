import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useThemeStore from '../../store/ThemeStore';
import styles from './Register.module.scss';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import { categories } from '../../utils/Categories';
import { fetchEmail, signUp } from '../../apis/AuthApi';
import Modal from 'react-modal';
import { mySwal } from '../../components/Alert/CustomSwal';

interface UserCreateForm {
  email: string;
  nickname: string;
  socialId?: string;
  categoryIds: number[];
}

const Register = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져오기 위한 useLocation 훅
  const [mainLogo, setMainLogo] = useState(logo);
  const [email, setEmail] = useState('이메일');
  const [nickname, setNickname] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [socialId, setSocialId] = useState<string | undefined>(''); // 소셜 ID 상태 추가

  // 이메일 불러오기
  useEffect(() => {
    const fetchAndSetEmail = async () => {
      try {
        const userEmail = await fetchEmail();
        if (userEmail?.response?.status === 403) {
          navigate('/');
        }
        setEmail(userEmail || '이메일을 불러오지 못했습니다.');
      } catch (error) {
        console.error('Failed to fetch email', error);
      }
    };
    fetchAndSetEmail();
  }, []);

  // 소셜 ID가 URL 쿼리 파라미터에 있는 경우 설정
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const socialIdParam = params.get('socialId');
    if (socialIdParam) {
      setSocialId(socialIdParam);
    }
  }, [location]);

  // 테마에 따른 로고 설정
  useEffect(() => {
    if (theme === 'dark') {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [theme]);

  // 카테고리 선택 로직
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(prev => prev.filter(cat => cat !== category));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  // 카테고리 선택 시 핸들러 (경고창 띄우기)
  const handleCategoryClick = (category: string) => {
    if (
      !selectedCategories.includes(category) &&
      selectedCategories.length >= 5
    ) {
      mySwal(
        '카테고리 선택 제한',
        '최대 5개의 카테고리만 선택할 수 있습니다.',
        'error',
      );
    } else {
      toggleCategory(category);
    }
  };

  // 회원가입 폼 제출
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const categoryIds = selectedCategories.map(category =>
      categories.indexOf(category),
    );

    if (categoryIds.length < 1 || categoryIds.length > 5) {
      mySwal(
        '회원가입 실패',
        '카테고리는 최소 1개, 최대 5개 선택해야 합니다.',
        'error',
      );
      return;
    }

    try {
      const formdata: UserCreateForm = {
        email,
        nickname,
        categoryIds,
        socialId, // 소셜 ID를 함께 전송
      };

      const register = await signUp(formdata);
      console.log(register);
      if (register) {
        mySwal('회원가입 성공', '회원가입이 완료되었습니다!', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error('회원가입 오류 발생:', error);
      mySwal('회원가입 실패', '회원가입 중 오류가 발생했습니다.', 'error');
    }
  };

  // 모달 닫기
  const closeModal = () => {
    if (selectedCategories.length >= 1 && selectedCategories.length <= 5) {
      setIsModalOpen(false);
    } else {
      mySwal(
        '카테고리 선택 오류',
        '카테고리는 최소 1개, 최대 5개 선택해야 합니다.',
        'error',
      );
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
            <div className={styles.selectedCategories}>
              {selectedCategories.length > 0 ? (
                selectedCategories.map(category => (
                  <span key={category} className={styles.selectedCategory}>
                    {category}
                  </span>
                ))
              ) : (
                <p>카테고리를 선택해 주세요 (필수 1개 이상, 최대 5개)</p>
              )}
            </div>
            <button type="button" onClick={() => setIsModalOpen(true)}>
              카테고리 선택
            </button>
          </div>
          <button type="submit">회원가입 완료</button>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="카테고리 선택"
        className={styles.modal}
        ariaHideApp={false}
      >
        <h2>카테고리 선택 (최소 1개, 최대 5개)</h2>
        <div className={styles.categoryButtons}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategories.includes(category) ? styles.selected : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button onClick={closeModal}>선택 완료</button>
      </Modal>
    </div>
  );
};

export default Register;
