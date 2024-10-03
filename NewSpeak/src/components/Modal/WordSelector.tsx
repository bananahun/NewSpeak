import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useModalStore } from '../../store/ModalStore';
import AddWordModal from './AddWordModal';
import styles from './WordSelector.module.scss';
import { FiSearch } from 'react-icons/fi';
import useArticleStore from '../../store/ArticleStore';
import { useSelectedSentenceStore } from '../../store/selectedSentenceStore';

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
  event.preventDefault();
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
  const articleMeta = useArticleStore.getState().articleMeta;
  const { isOpen, selectedWord, openModal, closeModal } = useModalStore();
  const { selectedSentenceId, setSelectedSentenceId } =
    useSelectedSentenceStore();
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

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
      if (!selectedSentenceId) return;
      if (selectedText) {
        handleOpenModal(e, openModal);
        window.getSelection()?.removeAllRanges();
      }
    };

    document.body.style.cursor = 'none';

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [closeWordSelector]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setSelectedSentenceId(null);
    closeModal();
  };

  return ReactDOM.createPortal(
    <>
      <div
        className={styles.overlay}
        onClick={handleClick}
        style={{ cursor: 'none' }}
      >
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
      <AddWordModal
        word={selectedWord}
        articleId={articleMeta ? articleMeta.id : 0}
        isOpen={isOpen}
        onClose={() => {
          closeModal(); // 모달 닫기
          closeWordSelector(); // WordSelector 닫기
        }}
      />
    </>,
    document.body,
  );
};

export default WordSelector;
