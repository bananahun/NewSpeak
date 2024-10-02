import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage/MyPage';
import Article from './pages/Artricle/Article';
import Conversation from './pages/Conversation/Conversation';
import Word from './pages/Word/Word';
import Test from './pages/Word/Test';
import Nav from './components/Nav/Nav';
import ArticleListDetail from './pages/Artricle/ArticleListDetail';
import Report from './pages/MyPage/Report';
import ReportList from './pages/MyPage/ReportList';
import ScrapList from './pages/MyPage/ScrapList';
import About from './pages/About/About';
import ArticleListCategory from './pages/Artricle/ArticleListCategory';
import useThemeStore from './store/ThemeStore';
import useAuthStore from './store/AuthStore';
import './App.scss';
import OAuthCallback from './utils/OAuthCallback';

///
import TestApiComponent from './pages/Test';
///

function App() {
  const { theme } = useThemeStore();
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/register' || location.pathname === '/login';

  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [location]);

  return (
    <div className={`theme ${theme}`}>
      {!isAuthPage && <Nav />}
      <main className={`${isAuthPage ? 'authMain' : 'main'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth2/code/kakao" element={<OAuthCallback />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/article" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/word" element={<Word />} />
          <Route path="/wordlist/test" element={<Test />} />
          <Route path="/articlelist" element={<ArticleListDetail />} />
          <Route path="/log" element={<Test />} />
          <Route path="/report" element={<Report />} />
          <Route path="/reportlist" element={<ReportList />} />
          <Route path="/scraplist" element={<ScrapList />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/articlelist/category"
            element={<ArticleListCategory />}
          />
          ///
          <Route path="/test/api" element={<TestApiComponent />} />
          ///
        </Routes>
      </main>
    </div>
  );
}

export default App;
