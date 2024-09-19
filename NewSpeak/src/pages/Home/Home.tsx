import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import WordCloud from '../../components/WordCloud/WordCloud';
import ArticleList from '../../components/Article/ArticleList.tsx';
import { fullpageScroll } from './ScrollUtils.ts';

const words = [
  { text: 'CJW', size: 40 },
  { text: 'KDH', size: 30 },
  { text: 'CJW', size: 25 },
  { text: 'LCH', size: 50 },
  { text: 'LKM', size: 35 },
  { text: 'JH', size: 35 },
  { text: 'APLLE', size: 35 },
  { text: 'Banana', size: 35 },
  { text: 'Messi', size: 35 },
  { text: 'PigBoy', size: 35 },
];

const Home = () => {
  useEffect(() => {
    fullpageScroll(); // Applying the full-page scroll functionality
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.section}>
        <WordCloud data={words} />
      </div>
      <div className={styles.section}>
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
