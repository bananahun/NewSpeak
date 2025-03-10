import React, { useEffect, useState } from 'react';
import { usePreferredCategoryStore } from '../../store/CategoryStore';
import ArticleListComponent from './ArticleListComponent';
import { categories } from '../../utils/Categories';
import styles from './PreferredArticleList.module.scss';
import LoadingModal from '../Modal/LoadingModal';

const PreferredArticleList: React.FC = () => {
  const { preferredCategories, getPreferredCategory } =
    usePreferredCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    <div className={styles.container}>
      <div className={styles.categoryButtonContainer}>
        {preferredCategories.map(index => (
          <button
            key={index}
            className={`${styles.categoryButton} ${
              selectedCategory === index ? styles.active : ''
            }`}
            color="primary"
            onClick={() => handleCategoryChange(index)}
          >
            {categories[index]}
          </button>
        ))}
      </div>
      {isLoading ? (
        <LoadingModal />
      ) : (
        <ArticleListComponent categoryId={selectedCategory} />
      )}
    </div>
  );
};

export default PreferredArticleList;
