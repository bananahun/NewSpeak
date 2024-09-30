import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './WordSearch.module.scss';

interface WordSearchProps {
  isOpen: boolean;
  isFirstRender: boolean;
  toggleWordSearchBar: () => void;
}

const WordSearch = ({
  isOpen,
  isFirstRender,
  toggleWordSearchBar,
}: WordSearchProps) => {
  const animationClass = isFirstRender
    ? ''
    : isOpen
    ? styles.open
    : styles.close;

  const handleOverlayClick = () => {
    toggleWordSearchBar();
  };

  return (
    <>
      <div className={styles.searchBarOverlay} onClick={handleOverlayClick}>
        <div
          className={`${styles.searchBar} ${animationClass}`}
          onClick={e => e.stopPropagation()}
        >
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
          <div className={styles.searchedWords}>
            <li>listlistlistlistlistlistlistlistlistlistlistlistlist</li>
            <li>list</li>
            <li>list</li>
          </div>
        </div>
      </div>
    </>
  );
};

export default WordSearch;
