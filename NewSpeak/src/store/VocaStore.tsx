import { create } from 'zustand';

// 단어장 id를 저장할 store
interface VocaStoreState {
  vocaId: number | null;  
  setVocaId: (id: number|null) => void;
  clearVocaId: () => void;  
}

export const useVocaStore = create<VocaStoreState>((set) => ({
  vocaId: null,  // 초기값 설정

  setVocaId: (id: number|null) => set({ vocaId: id }),

  clearVocaId: () => set({ vocaId: null }),
}));
