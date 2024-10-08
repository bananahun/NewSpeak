import React from 'react';
import WordList from '../../components/Word/WordList';
import styles from './Word.module.scss';


const Word = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>나의 단어장</div>
      <div>
        <WordList />
      </div>
    </div>
  );
};

export default Word;
