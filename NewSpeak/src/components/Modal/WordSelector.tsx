import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useModalStore } from '../../store/ModalStore';
import AddWordModal from './AddWordModal';
import styles from './WordSelector.module.scss';
import { FiSearch } from 'react-icons/fi';

const isEnglishWord = (word: string) => {
  const englishWordPattern = /^[a-zA-Z]+$/;
  return englishWordPattern.test(word);
};

const getSelectedText = (): string => {
  return window.getSelection()?.toString().trim() || '';
};

const handleOpenModal = (
  event: MouseEvent,
  openModal: (word: string) => void,
) => {
  const word = getSelectedText();
  if (!word) {
    alert('단어를 선택해주세요.');
    return;
  }
  const wordsArray = word.split(' ');
  if (wordsArray.length > 1 || !isEnglishWord(word)) {
    alert('하나의 영어 단어만 선택해주세요.');
  } else {
    openModal(word); // Zustand store를 사용하여 모달을 엽니다
  }
};

const WordSelector = ({
  closeWordSelector,
}: {
  closeWordSelector: () => void;
}) => {
  const { isOpen, selectedWord, openModal, closeModal } = useModalStore();
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // const handleMouseEnter = (e: React.MouseEvent) => {
  //   setCursorPosition({ x: e.clientX, y: e.clientY });
  // };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      closeWordSelector();
    };

    const handleMouseUp = (e: MouseEvent) => {
      const selectedText = getSelectedText();
      if (selectedText) {
        handleOpenModal(e, openModal);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [closeWordSelector]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleClick}>
        <div>단어 선택 하는 모드</div>
        {cursorPosition && (
          <div
            className={styles.cursorPosition}
            style={{
              top: cursorPosition.y - 25,
              left: cursorPosition.x - 25,
            }}
          >
            <FiSearch />
          </div>
        )}
      </div>
      <AddWordModal word={selectedWord} isOpen={isOpen} onClose={closeModal} />
    </>,
    document.body,
  );
};

export default WordSelector;
