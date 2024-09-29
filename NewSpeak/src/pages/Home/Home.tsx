import React, { useState, useEffect } from "react";
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
  const [selectedWord, setSelectedWord] = useState<string | null>(null); // 선택된 단어
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null); // 선택된 단어의 ID

  useEffect(() => {
    console.log("Home 컴포넌트 렌더링");
    fullpageScroll();

    const fetchWordData = async () => {
      try {
        console.log("API 호출 시작: 워드 클라우드 데이터");
        const result: WordCloudItem[] = await useArticleApi.getWordCloud();
        console.log(result, "[컴포넌트] 워드 클라우드 API 데이터");

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

  // WordSlider에서 단어가 바뀔 때마다 실행될 핸들러
  const handleWordChange = (word: FormattedWordData) => {
    console.log("WordSlider에서 선택된 단어:", word);
    setSelectedWord(word.text);
    setSelectedWordId(word.id);
  };

  // WordCloud에서 단어 클릭 시 실행될 핸들러
  const handleWordClick = (word: string, id: number) => {
    console.log("WordCloud에서 클릭된 단어:", word, "ID:", id);
    setSelectedWord(word);
    setSelectedWordId(id);
  };

  return (
    <div className={styles.home}>
      {/* 첫 번째 섹션 - WordSlider, WordCloud, 그리고 ArticleListKeyword */}
      <div className={`${styles.section} ${styles.wordSection}`}>
        {/* WordSlider 컴포넌트 */}
        <div className={styles.home1container}>
          <div>
            <div className={styles.wordCloudSlider}>
              <WordSlider words={words} onWordChange={handleWordChange} />
            </div>
            {/* WordCloud 컴포넌트 */}
            <div className={styles.wordCloudContainer}>
              <WordCloud data={wordData} onWordClick={handleWordClick} />
            </div>
          </div>
          {/* 선택된 단어에 따른 기사 표시 컴포넌트 */}
          <div className={styles.articleListKeywordContainer}>
            <ArticleListKeyword selectedWordId={selectedWordId} />
          </div>
        </div>
      </div>
      {/* 두 번째 섹션 - ArticleList */}
      <div className={`${styles.section} ${styles.articleSection}`}>
        <ArticleList />
      </div>
      {/* 세 번째 섹션 - ArticleList */}
      <div className={`${styles.section} ${styles.searchSection}`}>
        <ArticleSearch />
      </div>
    </div>
  );
};

export default Home;
