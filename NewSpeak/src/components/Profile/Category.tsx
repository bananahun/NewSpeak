import React, { useState } from 'react';
import styles from './Category.module.scss';

const Category = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
    'Category 7',
    'Category 8',
    'Category 9',
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(
      prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category) // 이미 선택된 경우, 선택 해제
          : [...prev, category], // 새로 선택된 경우
    );
  };

  return (
    <div className={styles.categoryContainer}>
      {categories.map((category, index) => (
        <div
          key={index}
          className={`${styles.categoryBox} ${
            selectedCategories.includes(category) ? styles.selected : ''
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default Category;
