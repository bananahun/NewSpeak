import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useModalStore } from '../../store/ModalStore';
import AddWordModal from './AddWordModal';
import styles from './WordSelector.module.scss';
import { FiSearch } from 'react-icons/fi';
import useArticleStore from '../../store/ArticleStore';
import { useSelectedSentenceStore } from '../../store/selectedSentenceStore';
import { mySwalWithTimer } from '../Alert/CustomSwal';

const cleanWord = (word: string): string => {
  // 양 끝의 영어가 아닌 문자 제거
  return word.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '').trim();
};

const hasNonEnglishCharacters = (word: string): boolean => {
  // 단어 중간에 영어가 아닌 문자가 있는지 확인
  const nonEnglishPattern = /[^a-zA-Z]/;
  return nonEnglishPattern.test(word);
};

const WordSelector = ({
  closeWordSelector,
}: {
  closeWordSelector: () => void;
}) => {
  const articleMeta = useArticleStore.getState().articleMeta;
  const { isOpen, selectedWord, openModal, closeModal } = useModalStore();
  const { selectedSentenceId } = useSelectedSentenceStore();
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
      closeModal();
      closeWordSelector();
    };

    const getWordAtCursor = (event: MouseEvent): string => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return '';

      const range = selection.getRangeAt(0);
      const startContainer = range.startContainer;

      if (startContainer.nodeType === Node.TEXT_NODE) {
        const text = startContainer.textContent || '';
        const offset = range.startOffset;

        const beforeCursor = text.slice(0, offset).trim();
        const afterCursor = text.slice(offset).trim();

        const startOfWord = beforeCursor.search(/\S+$/);
        const endOfWord = afterCursor.search(/\s/);
        console.log(startOfWord, endOfWord);

        const word =
          (startOfWord === -1 ? '' : beforeCursor.slice(startOfWord)) +
          afterCursor.slice(
            0,
            endOfWord === -1 ? afterCursor.length : endOfWord,
          );

        return word.trim();
      }

      return '';
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 1 || e.button === 2) return;

      const target = e.target as HTMLElement;
      if (target.closest(`.${styles.modal}`)) {
        return; // 모달 내부에서 클릭된 경우
      }

      const selectedText = getWordAtCursor(e); // 클릭한 위치의 단어 가져오기
      if (!selectedSentenceId) {
        console.log('id없음');
        return;
      }

      const hasNumber = /\d/.test(selectedText);

      const cleanedWord = cleanWord(selectedText); // 양 끝에서 영어가 아닌 문자 제거

      if (hasNumber || cleanedWord) {
        if (hasNonEnglishCharacters(cleanedWord) || hasNumber) {
          mySwalWithTimer(
            '단어 선택 오류',
            '영어가 아닌 문자가 포함되어 있어요',
            'warning',
          );

          return;
        }
        openModal(cleanedWord); // 모달 열기
      }
      window.getSelection()?.removeAllRanges(); // 선택 영역 초기화
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
  }, [closeWordSelector, selectedSentenceId]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <>
      <div
        className={styles.overlay}
        onClick={handleClick} // 클릭 시 이벤트 발생
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
        }}
      />
    </>,
    document.body,
  );
};

export default WordSelector;
