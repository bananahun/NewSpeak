import React, { useState } from 'react';
import styles from './ArticleOriginal.module.scss';
import SentenceDetailModal from '../Modal/SentenceDetailModal';

const ArticleOriginal = ({
  sentences,
  translatedSentences,
}: {
  sentences: string[];
  translatedSentences: string[];
}) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [sentenceDetailModalOpen, setSentenceDetailModalOpen] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<string>('');
  const [visibleTranslations, setVisibleTranslations] = useState<boolean[]>(
    new Array(sentences.length).fill(false),
  );

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const toggleTranslate = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setVisibleTranslations(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
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
        {sentences.map((sentence, index) => (
          <div
            key={index}
            className={`${styles.sentenceContainer} ${
              hoveredId === index ? styles.accent : ''
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => openSentenceDetail(sentence)}
            onContextMenu={e => toggleTranslate(e, index)}
          >
            <p className={styles.sentence}>
              {visibleTranslations[index]
                ? translatedSentences[index]
                : sentence}
            </p>
          </div>
        ))}
      </div>
      <SentenceDetailModal
        isOpen={sentenceDetailModalOpen}
        onClose={closeSentenceDetail}
        text={selectedSentence}
      />
    </>
  );
};

export default ArticleOriginal;
