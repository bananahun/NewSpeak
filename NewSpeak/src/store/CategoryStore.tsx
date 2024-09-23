import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { categories } from '../utils/Categories';

interface CategoryState {
  id: number;
  setCategory: (id: number, category: string) => void;
}

const useCategoryStore = create(
  persist<CategoryState>(
    set => ({
      id: 0,
      setCategory: (id: number) => set({ id }),
    }),
    {
      name: 'categoryStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCategoryStore;
