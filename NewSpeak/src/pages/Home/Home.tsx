import React from 'react';
import Nav from '../../components/Nav/Nav';
import styles from './Home.module.scss';
import WordCloud from '../../components/WordCloud/WorldCloud';

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

const Home: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <div className={styles.home}>
          <WordCloud data={words} />
        </div>
      </main>
    </>
  );
};

export default Home;
