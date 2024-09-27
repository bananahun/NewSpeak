import { create } from 'zustand';

interface ConversationData {
  convThreadId: string;
  convRunId: string;
  reportThreadId: string;
  reportRunId: string;
  currentAnswer: string;
  isAudioReceived: boolean;
  setConvThreadId: (id: string) => void;
  setConvRunId: (id: string) => void;
  setReportThreadId: (id: string) => void;
  setReportRunId: (id: string) => void;
  setCurrentAnswer: (answer: string) => void;
  setIsAudioReceived: (recieved: boolean) => void;
  clearConvData: () => void;
}

const useConversationStore = create<ConversationData>(set => ({
  convThreadId: '',
  convRunId: '',
  reportThreadId: '',
  reportRunId: '',
  currentAnswer: '',
  isAudioReceived: false,
  setConvThreadId: (id: string) => set({ convThreadId: id }),
  setConvRunId: (id: string) => set({ convRunId: id }),
  setReportThreadId: (id: string) => set({ reportThreadId: id }),
  setReportRunId: (id: string) => set({ reportRunId: id }),
  setCurrentAnswer: (answer: string) => set({ currentAnswer: answer }),
  setIsAudioReceived: (recieved: boolean) => set({ isAudioReceived: recieved }),
  clearConvData: () => {
    set({
      convThreadId: '',
      convRunId: '',
      reportThreadId: '',
      reportRunId: '',
      currentAnswer: '',
    });
  },
}));

export default useConversationStore;
