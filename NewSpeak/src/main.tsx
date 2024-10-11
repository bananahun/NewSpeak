import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.scss';
import useThemeStore, { Theme } from './store/ThemeStore';

const RootComponent = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) {
      html.setAttribute(
        'data-toolpad-color-scheme',
        theme === Theme.Dark ? 'dark' : 'light',
      );
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')!).render(<RootComponent />);
