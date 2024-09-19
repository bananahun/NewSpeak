import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import ArticleSearch from './ArticleSearch';
import WordSearch from './WordSearch';
import styles from './Nav.module.scss';

const Nav = () => {
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

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleArticleSearchBar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOpenedArticleSearchBar) {
      setIsOpenedArticleSearchBar(false);
    } else {
      setIsOpenedArticleSearchBar(true);
      setIsOpenedWordSearchBar(false);
      setIsFirstArticleRender(false);
    }
  };

  const toggleWordSearchBar = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(1);
    console.log(isOpenedWordSearchBar);
    if (isOpenedWordSearchBar) {
      setIsOpenedWordSearchBar(false);
    } else {
      setIsOpenedWordSearchBar(true);
      setIsOpenedArticleSearchBar(false);
      setIsFirstWordRender(false);
    }
  };

  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <MenuItem component={<Link to="/mypage" />}>MyPage</MenuItem>
          <MenuItem component={<Link to="/about" />}>About</MenuItem>
          <SubMenu active label="Search" icon={<FaSearch size={'25'} />}>
            <MenuItem
              style={{
                padding: '0',
              }}
              onClick={e => toggleArticleSearchBar(e)}
            >
              ArticleSearch
            </MenuItem>
            <MenuItem
              className={styles.lastButton}
              onClick={e => toggleWordSearchBar(e)}
            >
              Word
            </MenuItem>
          </SubMenu>
        </>
      );
    } else {
      return (
        <>
          <MenuItem component={<Link to="/login" />}>Login</MenuItem>
          <MenuItem component={<Link to="/register" />}>Register</MenuItem>
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
      <Sidebar>
        <Menu
          menuItemStyles={{
            root: {
              padding: '0',
            },
            button: {
              '&:hover': {
                backgroundColor: 'transparent',
              },
            },
            subMenuContent: {
              backgroundColor: 'transparent',
            },
          }}
        >
          <nav className={styles.navbar}>
            <div className={styles.logo}>
              <img src={mainLogo} width={'160px'} />
            </div>
            <div className={styles.switcher}>
              <ThemeSwitcher />
            </div>
            <button onClick={handleLogin}>dev {displayLoggedIn}</button>
            <div className={styles.links}>
              <MenuItem component={<Link to="/" />}>Home</MenuItem>
              {renderLinks()}
            </div>
          </nav>
        </Menu>
      </Sidebar>
      <div className={styles.searchBar}>
        <ArticleSearch
          isOpen={isOpenedArticleSearchBar}
          isFirstRender={isFirstArticleRender}
        />
        <WordSearch
          isOpen={isOpenedWordSearchBar}
          isFirstRender={isFirstWordRender}
        />
      </div>
    </>
  );
};

export default Nav;
