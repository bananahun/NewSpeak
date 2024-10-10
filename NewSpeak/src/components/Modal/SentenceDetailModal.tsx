import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PronounceModal from '../Modal/PronounceModal';
import styles from './SentenceDetailModal.module.scss';

interface SentenceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

const SentenceDetailModal = ({
  isOpen,
  onClose,
  text,
}: SentenceDetailModalProps) => {
  if (!isOpen) return null;

  const [isPronounceModalOpen, setPronounceModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const openPronounceModal = () => {
    setPronounceModalOpen(true);
  };

  const closePronounceModal = () => {
    setPronounceModalOpen(false);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = 'en-US';
      speech.onstart = () => {
        // console.log('Speech started');
        setIsSpeaking(true);
      };

      speech.onend = () => {
        // console.log('Speech ended');
        setIsSpeaking(false);
      };

      speech.onerror = event => {
        console.error('SpeechSynthesis error', event);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(speech);
    } else {
      // console.log('Browser does not support Text-to-Speech');
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 클릭한 요소가 modalContent가 아닐 경우에만 onClose 호출
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.modalOverlay} onClick={handleOverlayClick}>
        <div className={styles.sentenceDetailModal}>
          <button className={styles.closeButton} onClick={onClose}>
            x
          </button>
          <p>{text}</p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              disabled={isSpeaking}
              onClick={handleSpeak}
            >
              문장 듣기
            </button>
            <button className={styles.button} onClick={openPronounceModal}>
              발음 평가
            </button>
          </div>
        </div>
        <PronounceModal
          isOpen={isPronounceModalOpen}
          onClose={closePronounceModal}
          text={text}
          sourcePage={'SentenceDetailModal'}
        />
      </div>
      <div className={styles.modalOverlayShadow}> </div>
    </>,
    document.getElementById('modal-root'),
  );
};

export default SentenceDetailModal;
