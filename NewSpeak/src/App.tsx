import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MyPage from "./pages/MyPage/MyPage";
import Article from "./pages/Artricle/Article";
import Conversation from "./pages/Conversation/Conversation";
import WordList from "./components/Word/WordLIst";
import WordTest from "./components/Word/WordTest";
import Nav from "./components/Nav/Nav";

import useThemeStore from "./store/ThemeStore";
import "./App.scss";

function App() {
  const { theme } = useThemeStore();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className={`theme ${theme}`}>
      {!isAuthPage && <Nav />}
      <main className={`${isAuthPage ? "authMain" : "main"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/article" element={<Article />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/wordlist" element={<WordList />} />
          <Route path="/wordlist/test" element={<WordTest />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
