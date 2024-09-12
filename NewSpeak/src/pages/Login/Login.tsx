import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/AuthStore";
import styles from "./Login.module.scss";
import logo from "../../assets/NewSpeak.png";
import logoWhite from "../../assets/NewSpeakWhite.png";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [mainLogo, setMainLogo] = useState(logo);
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedTheme === "dark") {
      setMainLogo(logoWhite);
    } else {
      setMainLogo(logo);
    }
  }, [selectedTheme, setSelectedTheme]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(1);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("로그인 중 오류발생:", error);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={mainLogo} alt="메인로고" style={{ height: "20vh" }} />
        </Link>
      </div>
      <div className={styles.loginFormContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <article>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
            />
          </article>
          <article>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </article>
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
