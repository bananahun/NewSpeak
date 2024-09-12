import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './WordSearch.module.scss';

interface WordSearchProps {
  isOpen: boolean;
  isFirstRender: boolean;
}

const WordSearch = ({ isOpen, isFirstRender }: WordSearchProps) => {
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
      <div>
        <li>
          listlistlistlistlistlistlistlistlistlistlistlistlistlistlistlistlistlist
        </li>
        <li>list</li>
        <li>list</li>
      </div>
    </div>
  );
};

export default WordSearch;
