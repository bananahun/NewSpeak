import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import useThemeStore from '../../store/ThemeStore';
import { FaSearch } from 'react-icons/fa';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import ArticleSearch from './ArticleSearch';
import WordSearch from './WordSearch';
import styles from './Nav.module.scss';

const Nav = () => {
  const { theme } = useThemeStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenedArticleSearchBar, setIsOpenedArticleSearchBar] =
    useState(false);
  const [isOpenedWordSearchBar, setIsOpenedWordSearchBar] = useState(false);
  const [displayLoggedIn, setDisplayLoggedIn] = useState('Login');
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
          <MenuItem
            component={
              <NavLink
                to="/mypage"
                style={({ isActive }: { isActive: boolean }) => ({
                  backgroundColor: isActive ? '#ff8b5a' : 'inherit',
                  fontWeight: isActive ? 'bold' : '',
                })}
              />
            }
          >
            MyPage
          </MenuItem>
          <MenuItem
            component={
              <NavLink
                to="/about"
                style={({ isActive }: { isActive: boolean }) => ({
                  backgroundColor: isActive ? '#ff8b5a' : 'inherit',
                  fontWeight: isActive ? 'bold' : '',
                })}
              />
            }
          >
            About
          </MenuItem>
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
    if (theme === 'light') {
      setMainLogo(logo);
    } else {
      setMainLogo(logoWhite);
    }
  }, [theme]);

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
            <Link className={styles.logo} to="/">
              <img src={mainLogo} width={'160px'} />
            </Link>
            <div className={styles.switcher}>
              <ThemeSwitcher />
            </div>
            <button onClick={handleLogin}>dev {displayLoggedIn}</button>
            <div className={styles.links}>
              <MenuItem
                component={
                  <NavLink
                    to="/"
                    style={({ isActive }: { isActive: boolean }) => ({
                      backgroundColor: isActive ? '#ff8b5a' : 'inherit',
                      fontWeight: isActive ? 'bold' : '',
                    })}
                  />
                }
              >
                Home
              </MenuItem>
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
