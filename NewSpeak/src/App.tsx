import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Layout from './pages/Home/Layout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyPage from './pages/MyPage/MyPage';
import Article from './pages/Artricle/Article';
import Conversation from './pages/Conversation/Conversation';
import Word from './pages/Word/Word';
import NotFound from './pages/NotFound/NotFound';
import Test from './pages/Word/Test';
import Report from './pages/MyPage/Report';
import ReportList from './pages/MyPage/ReportList';
import ScrapList from './pages/MyPage/ScrapList';
import About from './pages/About/About';
import ArticleListKeyword from './components/WordCloud/ArticleListKeyword';
import PreferredArticleList from './components/Article/PreferredArticleList';
import ArticleList from './pages/Artricle/ArticleList';
import ArticleSearch from './components/Article/ArticleSearch';
import './App.scss';
import OAuthCallback from './utils/OAuthCallback';
import PrivateRoute from './components/Login/PrivateRoute';
import Landing from './pages/Landing/Landing';
import useThemeStore from './store/ThemeStore';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import useAuthStore from './store/AuthStore';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const { theme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const hideNav =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/notfound' ||
    location.pathname === '/welcome';

  const { checkAuth, isLoggedIn } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/' && !isLoggedIn) {
      navigate('/welcome');
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className={`theme ${theme}`}>
        <main className={`${hideNav ? 'authMain' : 'main'}`}>
          {/* 랜딩 페이지 제외하고 ThemeSwitcher 표시 */}
          {location.pathname !== '/welcome' && (
            <div className="themeswitcher">
              <ThemeSwitcher />
            </div>
          )}
          <Routes>
            <Route path="/welcome" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/login/oauth2/code/kakao"
              element={<OAuthCallback />}
            />
            <Route path="*" element={<Navigate to="/notfound" />} />
            <Route path="/notfound" element={<NotFound />} />

            <Route element={<Layout />}>
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route
                  path="/articlelist/keyword"
                  element={<ArticleListKeyword />}
                />
                <Route path="/preferred" element={<PreferredArticleList />} />
                <Route path="/article" element={<Article />} />
                <Route path="/about" element={<About />} />
                <Route path="/articlesearch" element={<ArticleSearch />} />
                <Route path="/conversation" element={<Conversation />} />
                <Route path="/word" element={<Word />} />
                <Route path="/wordlist/test" element={<Test />} />
                <Route path="/report" element={<Report />} />
                <Route path="/reportlist" element={<ReportList />} />
                <Route path="/scraplist" element={<ScrapList />} />
                <Route path="/articlelist" element={<ArticleList />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
