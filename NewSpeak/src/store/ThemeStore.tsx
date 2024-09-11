import { create } from 'zustand';
import logoWhite from '../assets/NewSpeakWhite.png';
import logoBlack from '../assets/NewSpeak.png';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
}));

export const getLogo = (): string => {
  const theme = useThemeStore.getState().theme;
  return theme === Theme.Dark ? logoWhite : logoBlack;
};

export default useThemeStore;
