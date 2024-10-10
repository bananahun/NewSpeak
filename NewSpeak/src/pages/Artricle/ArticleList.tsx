import React, { useEffect, useRef, useState } from 'react';
import { categories } from '../../utils/Categories';
import ArticleListComponent from '../../components/Article/ArticleListComponent';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa6';
import styles from './ArticleList.module.scss';

const ArticleList = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const categoryRef = useRef<HTMLDivElement>(null);
  const viewWidth = useRef<number>(window.innerWidth);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleMoveUp = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollTop -= 56;
    }
  };

  const handleMoveDown = () => {
    if (categoryRef.current) {
      categoryRef.current.scrollTop += 56;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      viewWidth.current = window.innerWidth;
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderCategoryNavbar = () => {
    return (
      <div className={styles.categoryNavbarContainer}>
        <div className={styles.categoryNavbar} ref={categoryRef}>
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
        {
          <div className={styles.upDownButtons}>
            <FaAngleUp size={30} onClick={handleMoveUp} />
            <FaAngleDown size={30} onClick={handleMoveDown} />
          </div>
        }
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {renderCategoryNavbar()}
      <ArticleListComponent categoryId={selectedCategory} />
    </div>
  );
};

export default ArticleList;
