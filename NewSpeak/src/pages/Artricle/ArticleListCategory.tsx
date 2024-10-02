import React, { useState } from 'react';
import { categories } from '../../utils/Categories';
import styles from './ArticleListCategory.module.scss';
import CategoryArticles from './CategoryArticles';

const ArticleListCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // 선택된 카테고리

  const renderCategoryNavbar = () => {
    return (
      <div className={styles.categoryNavbar}>
        {categories.map((category, index) => (
          <button
            key={index}
            className={`${styles.categoryButton} ${
              selectedCategory === index ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(index)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderCategoryNavbar()}
      {/* 선택된 카테고리에 따라 해당 CategoryArticles 컴포넌트 렌더링 */}
      <CategoryArticles categoryId={selectedCategory} />
    </div>
  );
};

export default ArticleListCategory;
