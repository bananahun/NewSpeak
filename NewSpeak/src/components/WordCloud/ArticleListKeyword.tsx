import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import useArticleApi from "../../apis/ArticleApi";
import noImage from "../../assets/NewSpeak.png";

interface Article {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  publishedDate: string;
  publisher: string;
}

interface Word {
  id: number;
  content: string;
  size: number;
}

const ArticleListKeyword: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // 단어 데이터를 가져오는 함수
  const fetchWordData = async () => {
    try {
      const wordData = await useArticleApi.getWordCloud();
      const formattedData = Array.isArray(wordData) ? wordData : wordData?.data;
      setWords(formattedData || []);
    } catch (error) {
      console.error("Error fetching word data:", error);
    }
  };

  // 선택된 단어 ID에 맞는 기사 데이터를 가져오는 함수
  const fetchArticlesById = async (wordId: number) => {
    try {
      const result = await useArticleApi.getArticleWordCloud(wordId, 0);
      setArticles(result);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchWordData();
  }, []);

  useEffect(() => {
    if (selectedWordId !== null) {
      fetchArticlesById(selectedWordId);
    }
  }, [selectedWordId]);

  // 드롭다운 메뉴 열기
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // 드롭다운 메뉴 닫기
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const loadArticleDetail = (article: Article) => {
    navigate("/article", { state: { articleId: article.id } });
  };

  const formatDate = (dateString: string) => {
    try {
      const dateObject = new Date(dateString);
      return dateObject.toLocaleDateString();
    } catch (error) {
      console.error("Date format error:", error);
      return "";
    }
  };

  return (
    <Box sx={{ padding: "20px", margin: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        핫 키워드 뉴스
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        {words.length > 10 ? (
          <>
            <Tooltip title="단어 선택">
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "50%",
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <ArrowDropDownCircleIcon fontSize="large" color="primary" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { width: 200, backgroundColor: "#f7f7f7" },
              }}
            >
              {words.map((word) => (
                <MenuItem
                  key={word.id}
                  onClick={() => {
                    setSelectedWordId(word.id);
                    handleMenuClose();
                  }}
                  sx={{
                    fontSize: "1rem",
                    "&:hover": { backgroundColor: "#eeeeee" },
                  }}
                >
                  {word.content}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          words.map((word) => (
            <Button
              key={word.id}
              variant={word.id === selectedWordId ? "contained" : "outlined"}
              onClick={() => setSelectedWordId(word.id)}
              sx={{ margin: 1, fontSize: `${word.size * 0.08 + 12}px` }}
            >
              {word.content}
            </Button>
          ))
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {selectedWordId === null && (
          <Typography variant="body1" color="textSecondary">
            Please select a word to view related articles.
          </Typography>
        )}

        {selectedWordId !== null && articles.length > 0
          ? articles.map((article) => (
              <Card
                key={article.id}
                onClick={() => loadArticleDetail(article)}
                sx={{ maxWidth: 600, margin: 2, cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={article.imageUrl || noImage}
                  alt={article.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(article.publishedDate)} | {article.publisher}
                  </Typography>
                </CardContent>
              </Card>
            ))
          : selectedWordId !== null && (
              <Typography variant="body1" color="textSecondary">
                No articles available
              </Typography>
            )}
      </Box>
    </Box>
  );
};

export default ArticleListKeyword;
