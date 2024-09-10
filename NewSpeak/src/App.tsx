import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Article from './pages/Artricle/Article';
import useThemeStore from './store/ThemeStore';
import './App.scss';

function App() {
  const { theme } = useThemeStore();

  return (
    <div className={`theme ${theme}`}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article" element={<Article />} />
      </Routes>
    </div>
  );
}

export default App;
