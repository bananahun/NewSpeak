import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePreferredCategoryStore } from "../../store/CategoryStore";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ArticleListComponent from "./ArticleListComponent";
import { categories } from "../../utils/Categories";

const PreferredArticleList: React.FC = () => {
  const { preferredCategories, getPreferredCategory } =
    usePreferredCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPreferredCategory(() => {
      console.error("Authentication error occurred");
    });
  }, []);

  useEffect(() => {
    if (preferredCategories.length > 0) {
      setSelectedCategory(preferredCategories[0]);
      setIsLoading(false);
    }
  }, [preferredCategories]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Box sx={{ padding: 2, textAlign: "center" }}>
      {/* 카테고리 버튼 컨테이너 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          marginBottom: 3,
        }}
      >
        {preferredCategories.map((id) => (
          <Button
            key={id}
            variant={selectedCategory === id ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleCategoryChange(id)}
            sx={{
              fontSize: "0.875rem",
              padding: "8px 16px",
              minWidth: "80px",
              borderRadius: "20px",
            }}
          >
            {categories[id]}
          </Button>
        ))}
      </Box>

      {/* 로딩 상태 표시 */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <ArticleListComponent categoryId={selectedCategory} />
      )}
    </Box>
  );
};

export default PreferredArticleList;
