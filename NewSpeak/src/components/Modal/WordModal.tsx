import React, {useState}from "react";
import styles from './WordModal.module.scss';
import { FaMicrophone } from 'react-icons/fa';
import PronounceModal from "./PronounceModal";
import ReactDOM from 'react-dom';

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

  return ReactDOM.createPortal(
    <>
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.wordTitle}>{word}</h1>         

        {meanings.map((meaning, index) => (
          <React.Fragment key={index}> {/* key 속성 추가 */}
            <div className={styles.meaningContainer}>
              <p className={styles.wordMeaning}><strong>뜻:</strong> {meaning.meaning}</p> {/* bold 적용 */}
              <p className={styles.wordExample}><strong>예문:</strong> {meaning.example}</p>
              <p className={styles.wordExampleKorean}><strong>해석:</strong> {meaning.exampleKorean}</p>

              <FaMicrophone
                className={styles.iconButton}
                title="발음 평가"
                onClick={() => openPronounceModal(meaning.example)}
              />
            </div>
            <hr className={styles.separator} /> {/* 구분선 추가 */}
          </React.Fragment>
        ))}
        <button onClick={onClose} className={styles.closeButton}>x</button>
      </div>
      <PronounceModal
        isOpen={isPronounceModalOpen}
        onClose={closePronounceModal}
        text={selectedText}
        sourcePage={'NoWordList'}
      />
    </div>
    <div className={styles.modalOverlayShadow}></div>
    </>,
    document.getElementById('modal-root'),

  );
};

export default WordModal;
