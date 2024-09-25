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
import Report from './components/Conversation/Report';
import ReportList from './pages/MyPage/ReportList';
import ScrapList from './pages/MyPage/ScrapList';
import useThemeStore from './store/ThemeStore';
import './App.scss';
import { handleContextMenu } from './utils/AddWord'; // 유틸 함수 임포트
import { useModalStore } from './store/ModalStore';
import AddWordModal from './components/Modal/AddWordModal';
import OAuthCallback from './utils/OAuthCallback';

function App() {
  const { theme } = useThemeStore();
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/register' || location.pathname === '/login';

  const { isOpen, selectedWord, openModal, closeModal } = useModalStore();

  useEffect(() => {
    const contextMenuHandler = (event: MouseEvent) =>
      handleContextMenu(event, openModal);

    // 우클릭 이벤트를 전역적으로 등록
    document.addEventListener('contextmenu', contextMenuHandler);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('contextmenu', contextMenuHandler);
    };
  }, [openModal]);

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
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/word" element={<Word />} />
          <Route path="/wordlist/test" element={<Test />} />
          <Route path="/articlelist" element={<ArticleListDetail />} />
          <Route path="/log" element={<Test />} />
          <Route path="/report" element={<Report />} />
          <Route path="/reportlist" element={<ReportList />} />
          <Route path="/scraplist" element={<ScrapList />} />
        </Routes>

        <div className="modal">
          {' '}
          <AddWordModal
            word={selectedWord}
            isOpen={isOpen}
            onClose={closeModal}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
