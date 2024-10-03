import React, { useState } from 'react';
import styles from './ArticleOriginal.module.scss';
import SentenceDetailModal from '../Modal/SentenceDetailModal';
import useArticleStore from '../../store/ArticleStore';
import { useSelectedSentenceStore } from '../../store/selectedSentenceStore';
import { useWordSelectorState } from '../../store/ModalStore';

interface Sentence {
  id: number;
  content: string;
  translation: string;
}

const ArticleOriginal = ({
  sentences,
  translatedSentences,
}: {
  sentences: Sentence[];
  translatedSentences: string[];
}) => {
  const { articleMeta } = useArticleStore();
  const { selectedSentenceId, setSelectedSentenceId } =
    useSelectedSentenceStore();
  const { isOpen } = useWordSelectorState();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [sentenceDetailModalOpen, setSentenceDetailModalOpen] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState<string>('');
  const [visibleTranslations, setVisibleTranslations] = useState<boolean[]>(
    new Array(sentences.length).fill(false),
  );

  const handleMouseEnter = (id: number) => {
    setHoveredId(id);
    setSelectedSentenceId(sentences[id].id);
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
    if (isOpen) return;
    setSelectedSentence(text);
    setSentenceDetailModalOpen(true);
  };

  const closeSentenceDetail = () => {
    if (isOpen) return;
    setSelectedSentence('');
    setSentenceDetailModalOpen(false);
  };

  return (
    <>
      <div className={styles.articleContent}>
        <img src={articleMeta?.imageUrl} className={styles.articleImage} />
        {sentences.map((sentence, index) => (
          <div
            key={index}
            className={`${styles.sentenceContainer} ${
              hoveredId === index ? styles.accent : ''
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => openSentenceDetail(sentence.content)}
            onContextMenu={e => toggleTranslate(e, index)}
          >
            <p className={styles.sentence}>
              {visibleTranslations[index]
                ? translatedSentences[index]
                : sentence.content}
            </p>
          </div>
        ))}
        <p>{selectedSentenceId}</p>
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
