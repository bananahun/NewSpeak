import React, { useState, useMemo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router } from '@toolpad/core';
import useThemeStore, { Theme } from '../../store/ThemeStore';
import Home from '@mui/icons-material/Home';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const NAVIGATION = [
  { segment: '', title: 'Home', icon: <Home /> },
  { segment: 'about', title: 'About Us', icon: <LightbulbIcon /> },
  {
    segment: 'articlelist/keyword',
    title: 'Hot Articles',
    icon: <WhatshotIcon />,
  },
  { segment: 'preferred', title: 'Favorite Articles', icon: <ArticleIcon /> },
  {
    segment: 'articlelist',
    title: 'Category Articles',
    icon: <CategoryIcon />,
  },
  {
    segment: 'articlesearch',
    title: 'Article Search',
    icon: <FindInPageIcon />,
  },
  { segment: 'scraplist', title: 'Scrap', icon: <BookmarksIcon /> },
];

// 테마 설정 함수
const createCustomTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: { default: '#F9F9FE', paper: '#EEEEF9' },
          }
        : {
            background: { default: '#2A4364', paper: '#112E4D' },
          }),
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1024,
        lg: 1440,
        xl: 1536,
      },
    },
  });

function Layout() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Outlet />
    </Box>
  );
}

export default function AppProviderTheme() {
  const navigate = useNavigate();
  const [pathname, setPathname] = useState('/');
  const { theme } = useThemeStore(); // zustand에서 테마 상태 가져오기
  const muiMode = theme === Theme.Dark ? 'dark' : 'light';

  // MUI 테마 설정
  const muiTheme = useMemo(() => createCustomTheme(muiMode), [muiMode]);

  useEffect(() => {
    localStorage.getItem('toolpad-mode');
  }, [theme]);

  const router = useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: path => {
        setPathname(String(path));
        navigate(path);
      },
    };
  }, [pathname]);

  const customizedNavigation = NAVIGATION.map(navItem => {
    return {
      ...navItem,
      onClick: () => navigate(navItem.segment ? `/${navItem.segment}` : '/'),
    };
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <AppProvider
        branding={{ logo: null, title: 'NewSpeak' }}
        navigation={customizedNavigation}
        router={router}
      >
        <DashboardLayout>
          <Layout />
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}
