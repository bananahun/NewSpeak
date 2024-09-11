import { create } from 'zustand';

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

export default useThemeStore;
