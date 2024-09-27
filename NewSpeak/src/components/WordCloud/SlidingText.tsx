import React from 'react';
import styles from './SlidingText.module.scss';

interface SlidingTextProps {
  words: { text: string }[];
}

const SlidingText: React.FC<SlidingTextProps> = ({ words }) => {
  return (
    <div className={styles.wordCloudSlider}>
      <div className={styles.slideText}>
        {words.map((word, index) => (
          <span key={index} style={{ marginRight: '2rem' }}>
            {word.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SlidingText;
