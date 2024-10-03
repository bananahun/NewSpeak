import create from 'zustand';

interface SelectedSentenceStore {
  selectedSentenceId: number | null;
  setSelectedSentenceId: (id: number | null) => void;
}

export const useSelectedSentenceStore = create<SelectedSentenceStore>(set => ({
  selectedSentenceId: null,
  setSelectedSentenceId: id => set({ selectedSentenceId: id }),
}));
