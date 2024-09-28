import { create } from 'zustand';

interface Conversation {
  sender: 'user' | 'assistant';
  content: string;
}

interface ConversationData {
  convThreadId: string;
  convRunId: string;
  reportThreadId: string;
  reportRunId: string;
  currentAnswer: string;
  recommendedAnswers: string[];
  conversation: Conversation[];
  reportCreated: boolean;
  isGeneratingReport: boolean;
  setConvThreadId: (id: string) => void;
  setConvRunId: (id: string) => void;
  setReportThreadId: (id: string) => void;
  setReportRunId: (id: string) => void;
  setCurrentAnswer: (answer: string) => void;
  setRecommendedAnswers: (answers: string[]) => void;
  setReportCreated: (bool: boolean) => void;
  setIsGeneratingReport: (bool: boolean) => void;
  addConversation: (sender: 'user' | 'assistant', content: string) => void;
  clearConvData: () => void;
  clearConversation: () => void;
}

const useConversationStore = create<ConversationData>(set => ({
  convThreadId: '',
  convRunId: '',
  reportThreadId: '',
  reportRunId: '',
  currentAnswer: '',
  recommendedAnswers: [],
  conversation: [],
  reportCreated: false,
  isGeneratingReport: false,
  setConvThreadId: (id: string) => set({ convThreadId: id }),
  setConvRunId: (id: string) => set({ convRunId: id }),
  setReportThreadId: (id: string) => set({ reportThreadId: id }),
  setReportRunId: (id: string) => set({ reportRunId: id }),
  setCurrentAnswer: (answer: string) => set({ currentAnswer: answer }),
  setRecommendedAnswers: (answers: string[]) =>
    set({ recommendedAnswers: answers }),
  setReportCreated: (bool: boolean) => set({ reportCreated: bool }),
  setIsGeneratingReport: (bool: boolean) => set({ isGeneratingReport: bool }),
  addConversation: (sender: 'user' | 'assistant', content: string) =>
    set(state => ({
      conversation: [...state.conversation, { sender, content }],
    })),
  clearConvData: () => {
    set({
      convThreadId: '',
      convRunId: '',
      reportThreadId: '',
      reportRunId: '',
      currentAnswer: '',
      recommendedAnswers: [],
    });
  },
  clearConversation: () => {
    set({
      conversation: [],
    });
  },
}));

export default useConversationStore;
