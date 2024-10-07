import React, {useState}from "react";
import styles from './WordModal.module.scss';
import { FaMicrophone } from 'react-icons/fa';
import { GiSpeaker } from 'react-icons/gi';
import PronounceModal from "./PronounceModal";

interface WordModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  meanings: { meaning: string; example: string; exampleKorean: string }[];
}

const WordModal: React.FC<WordModalProps> = ({ isOpen, onClose, word, meanings }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 null 반환
  const [selectedText, setSelectedText] = useState<string>('');
  const [isPronounceModalOpen, setPronounceModalOpen] = useState(false);
  
  const openPronounceModal = (text: string) => {
    setSelectedText(text);
    setPronounceModalOpen(true);
  };

  const closePronounceModal = () => {
    setPronounceModalOpen(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.wordTitle}>{word}</h1>         
        <hr className={styles.separator} /> {/* 구분선 추가 */}

        {meanings.map((meaning, index) => (
          <div key={index} className={styles.meaningContainer}>
            
            <p className={styles.meaningText}>{meaning.meaning}</p> {/* bold 적용 */}
            <p>예문: {meaning.example}</p>
            <p>예문 (한국어): {meaning.exampleKorean}</p>
            <div
              className={styles.iconButton}
              title="발음 평가"
              onClick={() => openPronounceModal(meaning.example)} // 발음 평가 모달 열기
            >
              <FaMicrophone />
            </div>
            <hr className={styles.separator} /> {/* 구분선 추가 */}
          </div>
        ))}
        <button onClick={onClose} className={styles.closeButton}>닫기</button>
      </div>
      <PronounceModal
        isOpen={isPronounceModalOpen}
        onClose={closePronounceModal}
        text={selectedText}
        sourcePage={'NoWordList'}
      />
    </div>
  );
};

export default WordModal;
