// import React from "react";
// import { NavLink } from "react-router-dom";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LightbulbIcon from "@mui/icons-material/Lightbulb";
// import ArticleIcon from "@mui/icons-material/Article";
// import DescriptionIcon from "@mui/icons-material/Description";
// import styles from "./Nav.module.scss"; // SCSS 스타일 임포트

// interface NavProps {
//   open: boolean;
// }

// const Nav: React.FC<NavProps> = ({ open }) => {
//   return (
//     <div className={styles.navContainer}>
//       <List className={styles.list}>
//         ///home ///home ///home
//         <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <HomeIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText primary="Home" className={styles.listItemText} />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///about ///about ///about
//         <NavLink
//           to="/mypage"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <AccountCircleIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="My Page"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///HotArticleList ///HotArticleList ///HotArticleList
//         <NavLink
//           to="/about"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <LightbulbIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText primary="About" className={styles.listItemText} />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///favoriteArticleList ///favoriteArticleList ///favoriteArticleList
//         <NavLink
//           to="/article"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <ArticleIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Article"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///favoriteArticleList ///favoriteArticleList ///favoriteArticleList
//         <NavLink
//           to="/conversation"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <DescriptionIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Conversation"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///CategoryArticles ///CategoryArticles ///CategoryArticles
//         <NavLink
//           to="/conversation"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <DescriptionIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Conversation"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///WordSearch ///WordSearch ///WordSearch
//         <NavLink
//           to="/conversation"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <DescriptionIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Conversation"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///ArticleSearch ///ArticleSearch ///ArticleSearch
//         <NavLink
//           to="/conversation"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <DescriptionIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Conversation"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//         ///ArticleSearch ///ArticleSearch ///ArticleSearch
//         <NavLink
//           to="/conversation"
//           style={{ textDecoration: "none", color: "inherit" }}
//         >
//           <ListItem
//             disablePadding
//             className={`${styles.listItem} ${
//               open ? styles.listItemOpen : styles.listItemClosed
//             }`}
//           >
//             <ListItemButton className={styles.listItemButton}>
//               <ListItemIcon className={styles.icon}>
//                 <DescriptionIcon />
//               </ListItemIcon>
//               {open && (
//                 <ListItemText
//                   primary="Conversation"
//                   className={styles.listItemText}
//                 />
//               )}
//             </ListItemButton>
//           </ListItem>
//         </NavLink>
//       </List>
//     </div>
//   );
// };

// export default Nav;
