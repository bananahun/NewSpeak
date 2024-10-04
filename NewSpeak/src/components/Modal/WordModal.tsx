import React from "react";
import styles from './WordModal.module.scss';

interface WordModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  meanings: { meaning: string; example: string; exampleKorean: string }[];
}

const WordModal: React.FC<WordModalProps> = ({ isOpen, onClose, word, meanings }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 null 반환

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{word}</h2>
        {meanings.map((meaning, index) => (
          <div key={index} className={styles.meaningContainer}>
            <p>뜻: {meaning.meaning}</p>
            <p>예문: {meaning.example}</p>
            <p>예문 (한국어): {meaning.exampleKorean}</p>
          </div>
        ))}
        <button onClick={onClose} className={styles.closeButton}>닫기</button>
      </div>
    </div>
  );
};

export default WordModal;
