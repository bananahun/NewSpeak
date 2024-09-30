import React from 'react';
import ReactDOM from 'react-dom';
// import useVocaStore from '../../store/VocaStore';
import styles from './AddWordModal.module.scss';

interface AddWordModalProps {
  word: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddWordModal = ({ word, isOpen, onClose }: AddWordModalProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>
          선택된 단어: <span>{word}</span>
        </p>
        <div>
          <button>내 단어장에 추가하기</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AddWordModal;
