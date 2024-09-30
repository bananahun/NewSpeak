import React, { useState, useEffect, useRef } from 'react';
import SentenceDetailModal from '../Modal/SentenceDetailModal';
import styles from './ArticleTranslation.module.scss';

const ArticleDetail = ({
  sentences,
  translatedSentences,
}: {
  sentences: string[];
  translatedSentences: string[];
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [sentenceDetailModalOpen, setSentenceDetailModalOpen] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<string>('');
  const [sentenceHeights, setSentenceHeights] = useState<number[]>(
    new Array(sentences.length).fill(0),
  );
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const translatedRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const heights = sentences.map((_, index) => {
      const englishHeight = sentenceRefs.current[index]?.clientHeight || 0;
      const translatedHeight = translatedRefs.current[index]?.clientHeight || 0;
      return Math.max(englishHeight, translatedHeight);
    });
    setSentenceHeights(heights);
  }, [sentences, translatedSentences]);

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const openSentenceDetail = (text: string) => {
    setSelectedSentence(text);
    setSentenceDetailModalOpen(true);
  };

  const closeSentenceDetail = () => {
    setSelectedSentence('');
    setSentenceDetailModalOpen(false);
  };

  return (
    <>
      <div className={styles.articleContent}>
        <div className={styles.articleOriginal}>
          {sentences.map((sentence, index) => (
            <div
              key={index}
              ref={el => {
                sentenceRefs.current[index] = el;
              }}
              className={`${styles.sentenceContainer} ${
                hoveredId === index ? styles.accent : ''
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => openSentenceDetail(sentence)}
              style={{ height: sentenceHeights[index] || 'auto' }}
            >
              <p className={styles.sentence}>{sentence}</p>
            </div>
          ))}
        </div>
        <div className={styles.articleTranslation}>
          {translatedSentences.map((sentence, index) => (
            <div
              key={index}
              ref={el => {
                translatedRefs.current[index] = el;
              }}
              className={`${styles.sentenceContainer} ${
                hoveredId === index ? styles.highlight : ''
              }`}
              style={{ height: sentenceHeights[index] || 'auto' }}
            >
              <p className={styles.sentence}>{sentence}</p>
            </div>
          ))}
          <SentenceDetailModal
            isOpen={sentenceDetailModalOpen}
            onClose={closeSentenceDetail}
            text={selectedSentence}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
