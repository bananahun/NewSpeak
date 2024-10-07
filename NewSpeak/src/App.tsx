import React, { useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage/MyPage';
import Article from './pages/Artricle/Article';
import Conversation from './pages/Conversation/Conversation';
import Word from './pages/Word/Word';
import Nav from './components/Nav/Nav';
import NotFound from './pages/NotFound/NotFound';
import Report from './pages/MyPage/Report';
import ReportList from './pages/MyPage/ReportList';
import ScrapList from './pages/MyPage/ScrapList';
import About from './pages/About/About';
import ArticleList from './pages/Artricle/ArticleList';
import useThemeStore from './store/ThemeStore';
import useAuthStore from './store/AuthStore';
import './App.scss';
import OAuthCallback from './utils/OAuthCallback';
import PrivateRoute from './components/Login/PrivateRoute';
import Landing from './pages/Landing/Landing';

function App() {
  const { theme } = useThemeStore();
  const location = useLocation();

  const hideNav =
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/notfound' ||
    location.pathname === '/welcome';

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [location]);

  return (
    <div className={`theme ${theme}`}>
      {!hideNav && <Nav />}
      <main className={`${hideNav ? 'authMain' : 'main'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/welcome" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth2/code/kakao" element={<OAuthCallback />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
          <Route path="/notfound" element={<NotFound />} />

          <Route element={<PrivateRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/article" element={<Article />} />
            <Route path="/about" element={<About />} />
            <Route path="/conversation" element={<Conversation />} />
            <Route path="/word" element={<Word />} />
            <Route path="/report" element={<Report />} />
            <Route path="/reportlist" element={<ReportList />} />
            <Route path="/scraplist" element={<ScrapList />} />
            <Route path="/about" element={<About />} />
            <Route path="/articlelist" element={<ArticleList />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
