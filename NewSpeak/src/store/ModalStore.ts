import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  selectedWord: string;
  openModal: (word: string) => void;
  closeModal: () => void;
}

// Zustand store를 사용하여 모달 상태 관리
export const useModalStore = create<ModalState>(set => ({
  isOpen: false, // 모달은 기본적으로 닫힌 상태
  selectedWord: '', // 선택된 단어는 빈 문자열
  openModal: (word: string) => set({ isOpen: true, selectedWord: word }), // 모달을 열고 단어 설정
  closeModal: () => set({ isOpen: false, selectedWord: '' }), // 모달 닫기 및 선택된 단어 초기화
}));
