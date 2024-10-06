import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import useThemeStore from "../../store/ThemeStore";
import useAuthStore from "../../store/AuthStore";
import logo from "../../assets/NewSpeak.png";
import logoWhite from "../../assets/NewSpeakWhite.png";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import WordSearch from "./WordSearch";
import Footer from "./Footer";
import styles from "./Nav.module.scss";

const Nav = () => {
  const { theme } = useThemeStore();
  const { isLoggedIn, logout } = useAuthStore();
  const [mainLogo, setMainLogo] = useState(logo);
  const [isOpenedWordSearchBar, setIsOpenedWordSearchBar] = useState(false);
  const [overlayHide, setOverlayHide] = useState(false);
  const [isFirstWordRender, setIsFirstWordRender] = useState(true);
  const navigate = useNavigate();

  // 워드 검색 바 토글 함수
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

  // 로그인 여부에 따라 네비게이션 링크 렌더링
  const renderLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <MenuItem
            component={
              <NavLink
                to="/mypage"
                style={({ isActive }: { isActive: boolean }) => ({
                  backgroundColor: isActive ? "#ff8b5a" : "inherit",
                  fontWeight: isActive ? "bold" : "",
                })}
              />
            }
          >
            My Page
          </MenuItem>
          <MenuItem
            component={
              <NavLink
                to="/about"
                style={({ isActive }: { isActive: boolean }) => ({
                  backgroundColor: isActive ? "#ff8b5a" : "inherit",
                  fontWeight: isActive ? "bold" : "",
                })}
              />
            }
          >
            About
          </MenuItem>
          <MenuItem
            onClick={toggleWordSearchBar}
            style={{
              backgroundColor: isOpenedWordSearchBar ? "#ff8b5a" : "inherit",
              fontWeight: isOpenedWordSearchBar ? "bold" : "",
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

  // 테마 변경 시 로고 이미지 변경
  useEffect(() => {
    if (theme === "light") {
      setMainLogo(logo);
    } else {
      setMainLogo(logoWhite);
    }
  }, [theme]);

  return (
    <div className="fontContainer">
      <Sidebar>
        <Menu
          menuItemStyles={{
            root: {
              padding: "0",
            },
            button: {
              "&:hover": {
                backgroundColor: "#ff8b5a", // 메뉴 항목 호버 시 전체 배경색 변경
                fontWeight: "bold",
              },
            },
          }}
        >
          <nav className={styles.navbar}>
            {/* 네비게이션 바의 로고 */}
            <Link className={styles.logo} to="/">
              <img src={mainLogo} width={"160px"} />
            </Link>

            {/* 테마 스위처 */}
            <div className={styles.switcher}>
              <ThemeSwitcher />
            </div>

            {/* 네비게이션 링크들 */}
            <div className={styles.links}>
              <MenuItem
                component={
                  <NavLink
                    to="/"
                    style={({ isActive }: { isActive: boolean }) => ({
                      backgroundColor: isActive ? "#ff8b5a" : "inherit",
                      fontWeight: isActive ? "bold" : "",
                    })}
                  />
                }
              >
                Home
              </MenuItem>
              {renderLinks()}

              {/* 로그아웃 버튼 */}
              {isLoggedIn && (
                <MenuItem
                  onClick={() => logout(navigate)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Logout
                </MenuItem>
              )}

              {/* 푸터 */}
              <div className={styles.footerContainer}>
                <Footer />
              </div>
            </div>
          </nav>
        </Menu>
      </Sidebar>

      {/* 검색 바 오버레이 */}
      {overlayHide && (
        <div className={styles.searchBar}>
          <WordSearch
            isOpen={isOpenedWordSearchBar}
            isFirstRender={isFirstWordRender}
            toggleWordSearchBar={toggleWordSearchBar}
          />
        </div>
      )}
    </div>
  );
};

export default Nav;
