import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import useThemeStore from '../../store/ThemeStore';
import useAuthStore from '../../store/AuthStore';
import logo from '../../assets/NewSpeak.png';
import logoWhite from '../../assets/NewSpeakWhite.png';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import WordSearch from './WordSearch';
import styles from './Nav.module.scss';

const Nav = () => {
  const { theme } = useThemeStore();
  const { isLoggedIn, logout } = useAuthStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [isOpenedWordSearchBar, setIsOpenedWordSearchBar] = useState(false);
  const [overlayHide, setOverlayHide] = useState(false);
  const [isFirstWordRender, setIsFirstWordRender] = useState(true);
  const navigate = useNavigate(); // 추가된 navigate
  const location = useLocation();

  const toggleWordSearchBar = () => {
    if (isOpenedWordSearchBar) {
      setIsOpenedWordSearchBar(false);
      setTimeout(() => {
        setOverlayHide(false);
      }, 500);
    } else {
      setIsOpenedWordSearchBar(true);
      setIsFirstWordRender(false);
      setOverlayHide(true);
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
          <MenuItem
            onClick={toggleWordSearchBar}
            style={{
              backgroundColor: isOpenedWordSearchBar ? '#ff8b5a' : 'inherit',
              fontWeight: isOpenedWordSearchBar ? 'bold' : '',
            }}
          >
            Search Word
          </MenuItem>
        </>
      );
    } else {
      return (
        <>
          <MenuItem component={<Link to="/login" />}>Login</MenuItem>
        </>
      );
    }
  };

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
              {isLoggedIn && (
                <>
                  <MenuItem onClick={() => logout(navigate)}>
                    <div
                      className={styles.logout}
                      // navigate 전달
                    >
                      Logout
                    </div>
                  </MenuItem>
                </>
              )}
            </div>
          </nav>
        </Menu>
      </Sidebar>
      {overlayHide && (
        <div className={styles.searchBar}>
          <WordSearch
            isOpen={isOpenedWordSearchBar}
            isFirstRender={isFirstWordRender}
            toggleWordSearchBar={toggleWordSearchBar}
          />
        </div>
      )}
    </>
  );
};

export default Nav;
