import React from 'react';
import styles from './AddWordModal.module.scss'; // CSS 모듈 임포트

interface AddWordModalProps {
  word: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddWordModal = ({ word, isOpen, onClose }: AddWordModalProps) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>단어 추가</h2>
        <p>
          선택된 단어: <span>{word}</span>
        </p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default AddWordModal;
