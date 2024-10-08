import { create } from 'zustand';
import { useMediaQuery } from '@mui/material';
import logoWhite from '../assets/NewSpeakWhite.png';
import logoBlack from '../assets/NewSpeak.png';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  syncWithSystemTheme: () => void;
}

const getStoredTheme = (): Theme => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === Theme.Dark || storedTheme === Theme.Light) {
    return storedTheme as Theme;
  }
  return Theme.Light;
};

const useThemeStore = create<ThemeState>(set => ({
  theme: getStoredTheme(),
  setTheme: (theme: Theme) => {
    set({ theme });
    localStorage.setItem('theme', theme);
  },
  syncWithSystemTheme: () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const systemTheme = prefersDarkMode ? Theme.Dark : Theme.Light;
    set({ theme: systemTheme });
    localStorage.setItem('theme', systemTheme);
  },
}));

export const getLogo = (): string => {
  const theme = useThemeStore.getState().theme;
  return theme === Theme.Dark ? logoWhite : logoBlack;
};

export default useThemeStore;
