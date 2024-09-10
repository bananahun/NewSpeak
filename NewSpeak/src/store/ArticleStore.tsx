import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ArticleMeta {
  id: number;
  title: string;
}

interface ArticleState {
  articleMeta: ArticleMeta | null;
  setArticleMeta: (articleMeta: ArticleMeta) => void;
  clearArticleMeta: () => void;
}

const useArticleStore = create(
  persist<ArticleState>(
    set => ({
      articleMeta: null,
      setArticleMeta: articleMeta => set({ articleMeta }),
      clearArticleMeta: () => set({ articleMeta: null }),
    }),
    {
      name: 'articleStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useArticleStore;
