import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreferredCategoryStore } from '../../store/CategoryStore'; // zustand store import
import styles from './PreferredArticleList.module.scss';
import ArticleListComponent from './ArticleListComponent';
import { categories } from '../../utils/Categories';

const PreferredArticleList = () => {
  const { preferredCategories, getPreferredCategory } =
    usePreferredCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPreferredCategory(() => {
      console.error('Authentication error occurred');
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
    <div className={styles.articleListContainer}>
      <div className={styles.categoryButtons}>
        <div className={styles.categoryButtonContainer}>
          {preferredCategories.map(id => (
            <button
              key={id}
              className={`${styles.categoryButton} ${
                selectedCategory === id ? styles.active : ''
              }`}
              onClick={() => handleCategoryChange(id)}
            >
              {categories[id]}
            </button>
          ))}
        </div>
        <button
          className={styles.addButton}
          onClick={() => navigate('/articlelist')}
        >
          ALL
        </button>
      </div>
      {!isLoading && <ArticleListComponent categoryId={selectedCategory} />}
    </div>
  );
};

export default PreferredArticleList;
