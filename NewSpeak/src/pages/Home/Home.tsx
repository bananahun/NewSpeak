import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import WordCloud from "../../components/WordCloud/WordCloud";
import ArticleList from "../../components/Article/ArticleList.tsx";
import { scrollToSection, handleWheelEvent } from "../../utils/ScrollUtils.ts";

const words = [
  { text: "CJW", size: 40 },
  { text: "KDH", size: 30 },
  { text: "CJW", size: 25 },
  { text: "LCH", size: 50 },
  { text: "LKM", size: 35 },
  { text: "JH", size: 35 },
  { text: "APLLE", size: 35 },
  { text: "Banana", size: 35 },
  { text: "Messi", size: 35 },
  { text: "PigBoy", size: 35 },
];

const Home = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) =>
      handleWheelEvent(e, setCurrentSectionIndex);

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    scrollToSection(currentSectionIndex);
  }, [currentSectionIndex]);

  return (
    <>
      <div className={styles.home}>
        <div className={`${styles.section} ${styles.wordCloudContainer}`}>
          <WordCloud data={words} />
        </div>
        <div className={`${styles.section} ${styles.articleListContainer}`}>
          <ArticleList />
        </div>
      </div>
    </>
  );
};

export default Home;
