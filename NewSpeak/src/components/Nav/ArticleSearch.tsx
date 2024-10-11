import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './ArticleSearch.module.scss';

interface ArticleSearchProps {
  isOpen: boolean;
  isFirstRender: boolean;
}

const ArticleSearch = ({ isOpen, isFirstRender }: ArticleSearchProps) => {
  const animationClass = isFirstRender
    ? ''
    : isOpen
    ? styles.open
    : styles.close;

  return (
    <div className={`${styles.searchBar} ${animationClass}`}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          className={styles.inputBar}
        />
        <button>
          <FaSearch size={'20'} />
        </button>
      </div>
      <div className={styles.searchedArticles}>
        <li>list</li>
        <li>list</li>
        <li>list</li>
      </div>
    </div>
  );
};

export default ArticleSearch;
