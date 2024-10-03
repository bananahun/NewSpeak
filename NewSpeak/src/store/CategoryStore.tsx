import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axiosInstance from '../apis/axiosConfig';
interface CategoryState {
  id: number;  // 카테고리 ID
  setCategory: (id: number, category: number) => void;
}

// 선호 카테고리 상태 정의
interface PreferredCategoryState {
  preferredCategories: number[]; // 선호 카테고리 배열
  getPreferredCategory: () => Promise<void>; // 선호 카테고리 추가 함수
  updatePreferredCategory: (categoris: number[]) => Promise<void>; // 선호 카테고리 제거 함수
}

const usePreferredCategoryStore = create(
  persist<PreferredCategoryState>(
    set => ({
      preferredCategories: [], // 초기값을 빈 배열로 설정
      getPreferredCategory: async () => {
        try {
          const response = await axiosInstance.get('/my/categories');
          const selectedCategories = response.data.categoryList.map((cat: { categoryId: number; categoryName: string }) => cat.categoryId);
          console.log(selectedCategories);
          set({ preferredCategories: selectedCategories });
        } catch (error) {
          console.error('[API] getPreferredCategory 에러:', error);
        }
      },
      updatePreferredCategory: async (categories: number[]) => {
        try {
          // 서버에 카테고리 제거 요청 보내기
          await axiosInstance.post('/my/categories',[]);
          // 요청이 성공하면 상태 업데이트
          set({
            preferredCategories: categories, // 카테고리 제거
          });
        } catch (error) {
          console.error('[API] removePreferredCategory 에러:', error);
        }
      },

    }),
    {
      name: 'preferredCategoryStorage', // 로컬 스토리지에 저장될 이름
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const useCategoryStore = create(
  persist<CategoryState>(
    set => ({
      id: 0, // 초기 ID 값
      setCategory: (id: number) => set({ id }), // 카테고리 ID 업데이트 함수
    }),
    {
      name: 'categoryStorage', // 로컬 스토리지에 저장될 이름
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// 두 스토어를 내보냅니다.
export { useCategoryStore, usePreferredCategoryStore };
