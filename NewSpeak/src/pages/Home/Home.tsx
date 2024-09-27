import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import WordCloud from '../../components/WordCloud/WordCloud';
import ArticleList from '../../components/Article/ArticleList.tsx';
import { fullpageScroll } from './ScrollUtils.ts';
import useArticleApi from '../../apis/ArticleApi'; // API 호출용

const Home = () => {
  const [wordData, setWordData] = useState([]); // WordCloud에 사용할 데이터 상태

  useEffect(() => {
    fullpageScroll(); // Full-page scroll 적용

    // 워드 클라우드 데이터를 불러오는 함수
    const fetchWordData = async () => {
      try {
        const result = await useArticleApi.getWordCloud(); // 워드 클라우드 데이터 호출
        const formattedData = result.slice(0, 100).map((item: any) => ({
          text: item.content,
          size: item.cnt, // `cnt`를 `size`로 사용
        }));
        setWordData(formattedData); // 데이터를 상태로 저장
        console.log('asd', wordData);
      } catch (error) {
        console.error('Error fetching word cloud data:', error);
      }
    };

    fetchWordData(); // 컴포넌트가 마운트되면 API 호출
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
