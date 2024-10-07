// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Drawer from '@mui/material/Drawer';
// import Typography from '@mui/material/Typography';
// import Nav from '../../components/Nav/Nav';
// import './Layout.module.scss';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// const Layout = () => {
//   const [open, setOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed">
//         <Toolbar>
//           <Typography variant="h6" noWrap>
//             NewsSpeak Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: open ? drawerWidth : 60,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: open ? drawerWidth : 60,
//             boxSizing: 'border-box',
//             overflowX: 'hidden',
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//         open={open}
//       >
//         <Nav open={open} handleDrawerToggle={handleDrawerToggle} />
//       </Drawer>
//       <Main open={open}>
//         <Toolbar />
//         <Outlet />
//       </Main>
//     </Box>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Nav/Nav'; // 네비게이션 컴포넌트
import type { Router } from '@toolpad/core';
import { createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import styles from './Layout.module.scss'; // SCSS 파일 불러오기

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

const Layout = () => {
  const [pathname, setPathname] = useState('/home');
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const router: Router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: path => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      branding={{
        logo: null,
        title: 'title',
      }}
      navigation={[
        { segment: 'home', title: 'Home', icon: <Home /> },
        { segment: 'about', title: 'About Us', icon: <InfoIcon /> },
      ]}
      router={router}
      theme={theme}
    >
      <DashboardLayout
        sidebar={<Nav open={open} />} // Nav 컴포넌트에서 열림 상태를 관리
        header={
          <AppBar position="fixed" open={open} className={styles.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label={open ? 'Close drawer' : 'Open drawer'}
                edge="start"
                onClick={handleDrawerToggle}
              >
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                NewsSpeak Dashboard {/* 기존의 "Toolpad" 텍스트를 변경 */}
              </Typography>
            </Toolbar>
          </AppBar>
        }
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 8 }}>
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
};

export default Layout;
