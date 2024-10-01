import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import WordCloud from "../../components/WordCloud/WordCloud";
import WordSlider from "../../components/Slider/WordSlider";
import ArticleList from "../../components/Article/ArticleList";
import ArticleListKeyword from "../../components/WordCloud/ArticleListKeyword";
import ArticleSearch from "../../components/Article/ArticleSearch";
import { fullpageScroll } from "./ScrollUtils";
import useArticleApi from "../../apis/ArticleApi";

interface WordCloudItem {
  content: string;
  cnt: number;
  id: number;
}

interface FormattedWordData {
  text: string;
  size: number;
  id: number;
}

const Home = () => {
  const [wordData, setWordData] = useState<FormattedWordData[]>([]);
  const [words, setWords] = useState<FormattedWordData[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null
  );
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  useEffect(() => {
    fullpageScroll();

    const fetchWordData = async () => {
      try {
        const result: WordCloudItem[] = await useArticleApi.getWordCloud();
        const formattedData: FormattedWordData[] = result
          .slice(0, 50)
          .map((item: WordCloudItem) => ({
            text: item.content,
            size: item.cnt,
            id: item.id,
          }));
        setWordData(formattedData);
        setWords(formattedData);
      } catch (error) {
        console.error("Error fetching word cloud data:", error);
      }
    };

    fetchWordData();
  }, []);

  const handleWordChange = (word: FormattedWordData) => {
    setSelectedWordId(word.id);
  };

  const handleWordClick = (_word: string, id: number) => {
    setSelectedWordId(id);
    const wordIndex = words.findIndex((item) => item.id === id);
    setSelectedWordIndex(wordIndex);
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className={styles.home}>
      <div className={`${styles.section} ${styles.wordSection}`}>
        <div className={styles.home1container}>
          <div>
            <div className={styles.wordCloudSlider}>
              <WordSlider
                words={words}
                onWordChange={handleWordChange}
                selectedWordIndex={selectedWordIndex}
                resetTrigger={resetTrigger}
              />
            </div>
            <div className={styles.wordCloudContainer}>
              <WordCloud data={wordData} onWordClick={handleWordClick} />
            </div>
          </div>
          <div className={styles.articleListKeywordContainer}>
            <ArticleListKeyword selectedWordId={selectedWordId} />
          </div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.articleSection}`}>
        <ArticleList />
      </div>
      <div className={styles.section}>
        <ArticleSearch />
      </div>
    </div>
  );
};

export default Home;
