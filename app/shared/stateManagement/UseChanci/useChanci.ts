import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the type for your Chanci data

interface AnsweriItem {
  questionId: string;
  answerId: number;
  step: number;
  text?: string;
}

// Define the type for the store state
interface ChanciState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  fileName: string;
  answers: AnsweriItem[];
  multiAnswer: string[];
  sidebarPostion: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void;
  updateAnswers: (data: AnsweriItem[]) => void;
  updateMultiAnswers: (data: string[]) => void;
  updateQuestionIndex: (data: number) => void;
  UpdateSidebarPostion: (data: number) => void;
  updateFileName: (data: string) => void;
  questionIndex: number;
}

export const useChanci = create<ChanciState>()(
  persist(
    (set) => ({
      data: [],
      answers: [],
      multiAnswer: [],
      fileName: "",
      questionIndex: 0,
      sidebarPostion: 1,
      updateData: (data) => {
        set({ data });
      },
      updateAnswers: (data: AnsweriItem[]) => {
        set(() => ({ answers: data }));
      },
      updateMultiAnswers: (data: string[]) => {
        set(() => ({ multiAnswer: data }));
      },
      updateQuestionIndex: (questionIndex: number) => {
        set({ questionIndex });
      },
      UpdateSidebarPostion: (sidebarPostion: number) => {
        set({ sidebarPostion });
      },
      updateFileName: (fileName: string) => {
        set(() => ({ fileName }));
      },
    }),
    {
      name: "chanci-storage", // unique name for the storage
      // @ts-expect-error: Ignoring TypeScript error due to array spread
      getStorage: () => ({
        getItem: () => null, // Always return null to start fresh
        setItem: () => {}, // No-op for setting items
        removeItem: () => {}, // No-op for removing items
      }),
      partialize: (state) => ({ data: state.data }),
    }
  )
);
