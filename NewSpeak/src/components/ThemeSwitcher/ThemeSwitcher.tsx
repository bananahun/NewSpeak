import React from 'react';
import Switch from '@mui/material/Switch';
import { CiLight, CiDark } from 'react-icons/ci';
import useThemeStore, { Theme } from '../../store/ThemeStore';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? Theme.Dark : Theme.Light);
  };

  return (
    <>
      <CiLight size="30" />
      <Switch
        checked={theme === Theme.Dark}
        onChange={handleToggle}
        color="default"
        inputProps={{ 'aria-label': 'theme switch' }}
      />
      <CiDark size="30" />
    </>
  );
};

export default ThemeSwitcher;
