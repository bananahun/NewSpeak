import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import sectionStyles from '../../styles/section.module.scss';
import WordCloud from '../../components/WordCloud/WordCloud';
import WordSlider from '../../components/Slider/WordSlider';
import PreferredArticleList from '../../components/Article/PreferredArticleList';
import ArticleListKeyword from '../../components/WordCloud/ArticleListKeyword';
import ArticleSearch from '../../components/Article/ArticleSearch';
import { fullpageScroll } from '../../utils/ScrollUtils';
import useArticleApi from '../../apis/ArticleApi';
import useAuthStore from '../../store/AuthStore';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const [wordData, setWordData] = useState<FormattedWordData[]>([]);
  const [words, setWords] = useState<FormattedWordData[]>([]);
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null,
  );
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/welcome');
    }
  }, [isLoggedIn]);

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

        // 첫 번째 단어의 ID를 선택된 단어 ID로 설정
        if (formattedData.length > 0) {
          setSelectedWordId(formattedData[0].id);
          setSelectedWordIndex(0); // 첫 번째 인덱스로 설정
        }
      } catch (error) {
        console.error('Error fetching word cloud data:', error);
      }
    };

    fetchWordData();
  }, []);

  const handleWordChange = (word: FormattedWordData) => {
    setSelectedWordId(word.id);
  };

  const handleWordClick = (_word: string, id: number) => {
    setSelectedWordId(id);
    const wordIndex = words.findIndex(item => item.id === id);
    setSelectedWordIndex(wordIndex);
    setResetTrigger(prev => prev + 1);
  };

  return (
    <div className={styles.home}>
      <div className={`${sectionStyles.section} ${sectionStyles.wordSection}`}>
        <div className={styles.wordCloud}>
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
          {selectedWordId && (
            <ArticleListKeyword selectedWordId={selectedWordId} />
          )}
        </div>
      </div>
      <div
        className={`${sectionStyles.section} ${sectionStyles.articleSection}`}
      >
        <PreferredArticleList />
      </div>
      <div
        className={`${sectionStyles.section} ${sectionStyles.searchSection}`}
      >
        <ArticleSearch />
      </div>
    </div>
  );
};

export default Home;
