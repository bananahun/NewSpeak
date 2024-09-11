import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoPersonCircleOutline, IoLogOutOutline } from 'react-icons/io5';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import ArticleSearch from './ArticleSearch';
import WordSearch from './WordSearch';
import styles from './Nav.module.scss';

const Nav: React.FC = () => {
  const [mainLogo, setMainLogo] = useState(logo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenedArticleSearchBar, setIsOpenedArticleSearchBar] =
    useState(false);
  const [isOpenedWordSearchBar, setIsOpenedWordSearchBar] = useState(false);
  const [displayLoggedIn, setDisplayLoggedIn] = useState('Login');
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('theme') || 'light',
  );
  const [isFirstArticleRender, setIsFirstArticleRender] = useState(true);
  const [isFirstWordRender, setIsFirstWordRender] = useState(true);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleArticleSearchBar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isOpenedArticleSearchBar) {
      setIsOpenedArticleSearchBar(false);
    } else {
      setIsOpenedArticleSearchBar(true);
      setIsOpenedWordSearchBar(false); // Close WordSearch
      setIsFirstArticleRender(false);
    }
  };

  const toggleWordSearchBar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isOpenedWordSearchBar) {
      setIsOpenedWordSearchBar(false);
    } else {
      setIsOpenedWordSearchBar(true);
      setIsOpenedArticleSearchBar(false); // Close ArticleSearch
      setIsFirstWordRender(false);
    }
  };

  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <div className={styles.buttonContainer}>
            <Link to="/mypage">
              <IoPersonCircleOutline size={'40'} />
            </Link>
            <IoLogOutOutline size={'40'} />
          </div>
          <button
            onClick={e => toggleArticleSearchBar(e)}
            className={styles.articleSearch}
          >
            <FaSearch size={'25'} />
            Article
          </button>
          <button
            onClick={e => toggleWordSearchBar(e)}
            className={styles.wordSearch}
          >
            <FaSearch size={'25'} />
            Word
          </button>
          <Link to="/about">
            <button className={styles.vocaButton}>About</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login">
            <button className={styles.loginButton}>Login</button>
          </Link>
          <Link to="/register">
            <button className={styles.registerButton}>Register</button>
          </Link>
        </>
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setDisplayLoggedIn('LogOut');
    } else {
      setDisplayLoggedIn('Login');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setSelectedTheme(localStorage.getItem('theme') || 'light');
  }, [localStorage.getItem('theme')]);

  useEffect(() => {
    if (selectedTheme === 'light') {
      setMainLogo(logo);
    } else {
      setMainLogo(logoWhite);
    }
  }, [selectedTheme]);

  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/">
          <div className={styles.logo}>
            <img src={mainLogo} width={'160px'} />
          </div>
        </Link>
        <div className={styles.switcher}>
          <ThemeSwitcher />
        </div>
        <button onClick={handleLogin}>dev {displayLoggedIn}</button>
        <div className={styles.links}>
          <div className={styles.links}>{renderLinks()}</div>
        </div>
      </nav>
      <ArticleSearch
        isOpen={isOpenedArticleSearchBar}
        isFirstRender={isFirstArticleRender}
      />
      <WordSearch
        isOpen={isOpenedWordSearchBar}
        isFirstRender={isFirstWordRender}
      />
    </>
  );
};

export default Nav;
