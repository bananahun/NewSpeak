import React from 'react';
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import styles from './Nav.module.scss'; // SCSS 스타일 임포트

interface NavProps {
  open: boolean;
  handleDrawerToggle: () => void;
}

const Nav: React.FC<NavProps> = ({ open, handleDrawerToggle }) => {
  return (
    <div className={styles.navContainer}>
      {/* 메뉴바 토글 버튼 */}
      <IconButton onClick={handleDrawerToggle} className={styles.menuButton}>
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      <Divider />

      {/* 네비게이션 메뉴 */}
      <List className={styles.list}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem
            disablePadding
            className={`${styles.listItem} ${
              open ? styles.listItemOpen : styles.listItemClosed
            }`}
          >
            <ListItemButton className={styles.listItemButton}>
              <ListItemIcon className={styles.icon}>
                <HomeIcon />
              </ListItemIcon>
              {open && (
                <ListItemText primary="Home" className={styles.listItemText} />
              )}
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink
          to="/mypage"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem
            disablePadding
            className={`${styles.listItem} ${
              open ? styles.listItemOpen : styles.listItemClosed
            }`}
          >
            <ListItemButton className={styles.listItemButton}>
              <ListItemIcon className={styles.icon}>
                <AccountCircleIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="My Page"
                  className={styles.listItemText}
                />
              )}
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink
          to="/about"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem
            disablePadding
            className={`${styles.listItem} ${
              open ? styles.listItemOpen : styles.listItemClosed
            }`}
          >
            <ListItemButton className={styles.listItemButton}>
              <ListItemIcon className={styles.icon}>
                <InfoIcon />
              </ListItemIcon>
              {open && (
                <ListItemText primary="About" className={styles.listItemText} />
              )}
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink
          to="/article"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem
            disablePadding
            className={`${styles.listItem} ${
              open ? styles.listItemOpen : styles.listItemClosed
            }`}
          >
            <ListItemButton className={styles.listItemButton}>
              <ListItemIcon className={styles.icon}>
                <ArticleIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Article"
                  className={styles.listItemText}
                />
              )}
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink
          to="/conversation"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItem
            disablePadding
            className={`${styles.listItem} ${
              open ? styles.listItemOpen : styles.listItemClosed
            }`}
          >
            <ListItemButton className={styles.listItemButton}>
              <ListItemIcon className={styles.icon}>
                <DescriptionIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Conversation"
                  className={styles.listItemText}
                />
              )}
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default Nav;
