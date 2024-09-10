import { create } from 'zustand';

interface RegisterState {
  formData: {
    email: string;
    nickname: string;
    password: string;
    passwordConfirm: string;
    category: string[];
  };
  setFormData: (
    key: keyof RegisterState['formData'],
    value: string | string[],
  ) => void;
  resetFormData: () => void;
}

const initialFormData = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  category: [],
};

const useRegisterStore = create<RegisterState>(set => ({
  formData: { ...initialFormData },

  setFormData: (key, value) =>
    set(state => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),

  resetFormData: () => set({ formData: { ...initialFormData } }),
}));

export default useRegisterStore;
