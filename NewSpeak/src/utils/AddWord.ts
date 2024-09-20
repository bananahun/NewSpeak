// 영어 단어인지 확인하는 함수
export const isEnglishWord = (word: string) => {
  const englishWordPattern = /^[a-zA-Z]+$/;
  return englishWordPattern.test(word);
};

// 드래그로 선택된 텍스트를 가져오는 함수
export const getSelectedText = (): string => {
  return window.getSelection()?.toString().trim() || '';
};

// 우클릭 이벤트 핸들러
export const handleContextMenu = (
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
