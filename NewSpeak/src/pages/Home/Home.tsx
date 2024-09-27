import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import WordCloud from '../../components/WordCloud/WordCloud';
import ArticleList from '../../components/Article/ArticleList.tsx';
import { fullpageScroll } from './ScrollUtils.ts';
import useArticleApi from '../../apis/ArticleApi'; // API 호출용

// 워드 클라우드 데이터를 위한 인터페이스 정의
interface WordCloudItem {
  content: string;
  cnt: number;
}

interface FormattedWordData {
  text: string;
  size: number;
}

const Home = () => {
  const [wordData, setWordData] = useState<FormattedWordData[]>([]);

  useEffect(() => {
    fullpageScroll(); // Full-page scroll 적용

    const fetchWordData = async () => {
      try {
        const result: WordCloudItem[] = await useArticleApi.getWordCloud();
        const formattedData: FormattedWordData[] = result
          .slice(0, 50)
          .map((item: WordCloudItem) => ({
            text: item.content,
            size: item.cnt,
          }));
        setWordData(formattedData);
      } catch (error) {
        console.error('Error fetching word cloud data:', error);
      }
    };

    fetchWordData();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.section}>
        <WordCloud data={wordData} />
      </div>
      <div className={styles.section}>
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
