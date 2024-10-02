import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useThemeStore from "../../store/ThemeStore";
import styles from "./Register.module.scss";
import logo from "../../assets/NewSpeak.png";
import logoWhite from "../../assets/NewSpeakWhite.png";
import { categories } from "../../utils/Categories";
import { fetchEmail, signUp } from "../../apis/AuthApi";
import Modal from "react-modal";
import axios from "axios";

interface UserCreateForm {
  email: string;
  nickname: string;
}

const Register = () => {
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [mainLogo, setMainLogo] = useState(logo);
  const [email, setEmail] = useState("이메일");
  const [nickname, setNickname] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이메일을 불러오는 useEffect
  useEffect(() => {
    const fetchAndSetEmail = async () => {
      try {
        const userEmail = await fetchEmail();
        setEmail(userEmail || "이메일을 불러오지 못했습니다.");
      } catch (error) {
        console.error("Failed to fetch email", error);
      }
    };
    fetchAndSetEmail();
  }, []);

  // 테마에 따른 로고 설정
  useEffect(() => {
    if (theme === "dark") {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [theme]);

  // 카테고리 선택 로직
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  // 회원가입 폼 제출 로직
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // 회원가입 API 호출
      const formdata: UserCreateForm = { email, nickname };
      const register = await signUp(formdata);

      if (register) {
        // 카테고리 인덱스 배열 생성
        const categoryIndexes = selectedCategories.map((category) =>
          categories.indexOf(category)
        );

        // 선택한 카테고리를 서버로 POST 요청
        await axios.post("/my/categories", {
          categories: categoryIndexes,
        });

        // 성공 시 메인 페이지로 이동
        navigate("/");
      }
    } catch (error) {
      console.error("회원가입 또는 카테고리 전송 중 오류 발생:", error);
    }
  };

  // 모달 닫기 및 카테고리 확인
  const closeModal = () => {
    if (selectedCategories.length === 3) {
      setIsModalOpen(false);
    } else {
      alert("카테고리 3개를 선택해 주세요.");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={mainLogo} alt="메인로고" style={{ height: "150px" }} />
        </Link>
      </div>
      <div className={styles.registerFormContainer}>
        <form className={styles.step} onSubmit={handleSubmit}>
          <div className={styles.registerForm}>
            <input type="email" value={email} disabled />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임"
              required
            />
            <div className={styles.selectedCategories}>
              {selectedCategories.length > 0 ? (
                selectedCategories.map((category) => (
                  <span key={category} className={styles.selectedCategory}>
                    {category}
                  </span>
                ))
              ) : (
                <p>카테고리를 선택해 주세요 (필수 3개)</p>
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
        <h2>카테고리 선택 (최대 3개)</h2>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                selectedCategories.includes(category) ? styles.selected : ""
              }`}
              onClick={() => toggleCategory(category)}
              disabled={
                !selectedCategories.includes(category) &&
                selectedCategories.length >= 3
              }
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
