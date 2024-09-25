import React from 'react';
import WordList from '../../components/Word/WordList';
import styles from './Word.module.scss';

const Word = () => {
  return (
    <div>
      <div className={styles.title}>나의 단어장</div>
      <div className={styles.container}>
        <WordList />
      </div>
    </div>
  );
};

export default Word;
