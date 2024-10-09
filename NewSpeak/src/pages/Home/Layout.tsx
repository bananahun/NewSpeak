import React, { useState, useMemo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router } from '@toolpad/core';
import useThemeStore, { Theme } from '../../store/ThemeStore';
import {
  Home,
  Lightbulb,
  Whatshot,
  PhotoFilter,
  Category,
  FindInPage,
  AutoStories,
  Bookmarks,
  Assessment,
} from '@mui/icons-material';

const NAVIGATION = [
  { segment: '', title: 'Home', icon: <Home /> },
  { segment: 'welcome', title: 'About Us', icon: <Lightbulb /> },
  {
    segment: 'articlelist/keyword',
    title: 'Hot Articles',
    icon: <Whatshot />,
  },
  { segment: 'preferred', title: 'Preferred Articles', icon: <PhotoFilter /> },
  {
    segment: 'articlelist',
    title: 'Category Articles',
    icon: <Category />,
  },
  { segment: 'scraplist', title: 'Scrapped Articles', icon: <Bookmarks /> },
  {
    segment: 'articlesearch',
    title: 'Article Search',
    icon: <FindInPage />,
  },
  { segment: 'word', title: 'Vocabulary Note', icon: <AutoStories /> },
  {
    segment: 'reportlist',
    title: 'Conversation Reports',
    icon: <Assessment />,
  },
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
