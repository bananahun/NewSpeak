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
import PrivateRoute from './components/Login/PrivateRoute'; // PrivateRoute 가져오기

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
          
          <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
          <Route path="/article" element={<PrivateRoute><Article /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/conversation" element={<PrivateRoute><Conversation /></PrivateRoute>} />
          <Route path="/word" element={<PrivateRoute><Word /></PrivateRoute>} />
          <Route path="/wordlist/test" element={<PrivateRoute><Test /></PrivateRoute>} />
          <Route path="/articlelist" element={<PrivateRoute><ArticleListDetail /></PrivateRoute>} />
          <Route path="/log" element={<PrivateRoute><Test /></PrivateRoute>} />
          <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
          <Route path="/reportlist" element={<PrivateRoute><ReportList /></PrivateRoute>} />
          <Route path="/scraplist" element={<PrivateRoute><ScrapList /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route
            path="/articlelist/category"
            element={<PrivateRoute><ArticleListCategory /></PrivateRoute>}
          />
          ///
          <Route path="/test/api" element={<PrivateRoute><TestApiComponent /></PrivateRoute>} />
          ///
        </Routes>
      </main>
    </div>
  );
}

export default App;
