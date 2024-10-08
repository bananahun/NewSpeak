// import { create } from 'zustand';
// import { useMediaQuery } from '@mui/material';
// import logoWhite from '../assets/NewSpeakWhite.png';
// import logoBlack from '../assets/NewSpeak.png';

// export enum Theme {
//   Light = 'light',
//   Dark = 'dark',
// }

// interface ThemeState {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
//   syncWithSystemTheme: () => void;
// }

// const getStoredTheme = (): Theme => {
//   const storedTheme = localStorage.getItem('theme');
//   if (storedTheme === Theme.Dark || storedTheme === Theme.Light) {
//     return storedTheme as Theme;
//   }
//   return Theme.Light;
// };

// const useThemeStore = create<ThemeState>(set => ({
//   theme: getStoredTheme(),
//   setTheme: (theme: Theme) => {
//     set({ theme });
//     localStorage.setItem('theme', theme);
//   },
//   syncWithSystemTheme: () => {
//     const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//     const systemTheme = prefersDarkMode ? Theme.Dark : Theme.Light;
//     set({ theme: systemTheme });
//     localStorage.setItem('theme', systemTheme);
//   },
// }));

// export const getLogo = (): string => {
//   const theme = useThemeStore.getState().theme;
//   return theme === Theme.Dark ? logoWhite : logoBlack;
// };

// export default useThemeStore;

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

const updateToolpadMode = (theme: Theme) => {
  // localStorage에 toolpad 관련 모드 및 색상 설정
  localStorage.setItem('toolpad-mode', theme);
};

const useThemeStore = create<ThemeState>(set => ({
  theme: getStoredTheme(),
  setTheme: (theme: Theme) => {
    set({ theme });
    localStorage.setItem('theme', theme);
    updateToolpadMode(theme); // MUI 테마도 동기화
  },
  syncWithSystemTheme: () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const systemTheme = prefersDarkMode ? Theme.Dark : Theme.Light;
    set({ theme: systemTheme });
    localStorage.setItem('theme', systemTheme);
    updateToolpadMode(systemTheme); // 시스템 테마 변경 시 MUI 테마도 동기화
  },
}));

export const getLogo = (): string => {
  const theme = useThemeStore.getState().theme;
  return theme === Theme.Dark ? logoWhite : logoBlack;
};

export default useThemeStore;
