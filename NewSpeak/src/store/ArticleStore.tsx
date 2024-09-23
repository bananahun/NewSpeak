import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ArticleMeta {
  id: number;
  title: string;
  imageUrl: string;
}

interface ArticleState {
  articleMeta: ArticleMeta | null;
  setArticleMeta: (articleMeta: ArticleMeta) => void;
  clearArticleMeta: () => void;
}

const getStoredArticleMeta = (): ArticleMeta | null => {
  const storedArticle = localStorage.getItem('articleStorage');
  if (storedArticle) {
    try {
      const parsedArticle = JSON.parse(storedArticle);
      return parsedArticle.state ? parsedArticle.state.articleMeta : null;
    } catch (error) {
      console.error('Error parsing stored article meta:', error);
      return null;
    }
  }
  return null;
};

const useArticleStore = create(
  persist<ArticleState>(
    set => ({
      articleMeta: getStoredArticleMeta(),
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
