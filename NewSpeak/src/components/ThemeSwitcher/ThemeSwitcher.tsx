// import React from 'react';
// import Switch from '@mui/material/Switch';
// import { CiLight, CiDark } from 'react-icons/ci';
// import useThemeStore, { Theme } from '../../store/ThemeStore';
// import { Box } from '@mui/material';

// const ThemeSwitcher = () => {
//   const { theme, setTheme } = useThemeStore();

//   const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTheme(event.target.checked ? Theme.Dark : Theme.Light);
//   };

//   return (
//     <Box display="flex" alignItems="center">
//       <CiLight size="30" />
//       <Switch
//         checked={theme === Theme.Dark}
//         onChange={handleToggle}
//         color="default"
//         inputProps={{ 'aria-label': 'theme switch' }}
//       />
//       <CiDark size="30" />
//     </Box>
//   );
// };

// export default ThemeSwitcher;

import React from 'react';
import Switch from '@mui/material/Switch';
import { CiLight, CiDark } from 'react-icons/ci';
import { Box, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; // 로그아웃 아이콘 추가
import useThemeStore, { Theme } from '../../store/ThemeStore';
import useAuthStore from '../../store/AuthStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutWithOAuth } from '../../apis/AuthApi'; // 로그아웃 함수 가져오기

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // 테마 전환 핸들러
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? Theme.Dark : Theme.Light);
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await logoutWithOAuth(navigate);
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {/* 테마 스위치 */}
      <div style={{ width: '150px', display: 'flex', alignItems: 'center' }}>
        <CiLight size="30" />
        <Switch
          checked={theme === Theme.Dark}
          onChange={handleToggle}
          color="default"
          inputProps={{ 'aria-label': 'theme switch' }}
        />
        <CiDark size="30" />
      </div>
      {/* 로그아웃 버튼 */}
      {isLoggedIn && location.pathname !== '/welcome' && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{ ml: 2 }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default ThemeSwitcher;
