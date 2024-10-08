import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router } from "@toolpad/core";
import Home from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import SearchIcon from "@mui/icons-material/Search";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import WordSearchModal from "../../components/Modal/WordSearchModal";

// 커스텀 Navigation 타입 정의
interface CustomNavigationItem {
  segment?: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

// 네비게이션 메뉴 아이템 설정
const NAVIGATION: CustomNavigationItem[] = [
  { segment: "", title: "Home", icon: <Home /> },
  { segment: "about", title: "About Us", icon: <LightbulbIcon /> },
  {
    segment: "articlelist/keyword",
    title: "Hot Articles",
    icon: <WhatshotIcon />,
  },
  {
    segment: "preferred",
    title: "Favorite Articles",
    icon: <ArticleIcon />,
  },
  {
    segment: "articlelist",
    title: "Category Articles",
    icon: <CategoryIcon />,
  },
  { segment: "wordSearch", title: "Word Search", icon: <SearchIcon /> },
  {
    segment: "articlesearch",
    title: "Article Search",
    icon: <FindInPageIcon />,
  },
  { segment: "scraplist", title: "Scrap", icon: <BookmarksIcon /> },
];

// 테마 설정
const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F9F9FE",
          paper: "#EEEEF9",
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: "#2A4364",
          paper: "#112E4D",
        },
      },
    },
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

function Layout({ pathname }: { pathname: string }) {
  const [isWordSearchModalOpen, setIsWordSearchModalOpen] = useState(false);

  // WordSearch 아이콘 클릭 핸들러
  const handleWordSearchIconClick = () => {
    setIsWordSearchModalOpen(true);
  };

  // WordSearchModal 닫기 핸들러
  const handleCloseWordSearchModal = () => {
    setIsWordSearchModalOpen(false);
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* WordSearchModal 모달 컴포넌트 */}
      <WordSearchModal
        open={isWordSearchModalOpen}
        onClose={handleCloseWordSearchModal}
      />
      <Outlet />
    </Box>
  );
}

export default function AppProviderTheme() {
  const navigate = useNavigate();
  const [pathname, setPathname] = React.useState("/");

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));
        navigate(path);
      },
    };
  }, [pathname]);

  // WordSearch 아이콘 클릭 핸들러
  const [isWordSearchModalOpen, setIsWordSearchModalOpen] =
    React.useState(false);
  const handleWordSearchIconClick = () => {
    setIsWordSearchModalOpen(true);
  };

  // `navigation`에서 Word Search 클릭 시 `handleWordSearchIconClick`만 실행하도록 수정
  const customizedNavigation = NAVIGATION.map((navItem) => {
    if (navItem.segment === "wordSearch") {
      return {
        ...navItem,
        onClick: (event: React.MouseEvent) => {
          event.preventDefault();
          handleWordSearchIconClick(); // WordSearch 모달 열기
        },
      };
    }
    return navItem;
  });

  return (
    <AppProvider
      branding={{
        logo: null,
        title: "NewSpeak",
      }}
      navigation={customizedNavigation}
      router={router}
      theme={customTheme}
    >
      <DashboardLayout>
        <Layout pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
