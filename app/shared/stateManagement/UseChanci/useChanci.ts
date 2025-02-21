import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the type for your Chanci data

interface AnsweriItem {
  questionId: string;
  answerId: string;
}

// Define the type for the store state
interface ChanciState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  answers: AnsweriItem[];
  sidebarPostion: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateData: (data: any) => void;
  updateAnswers: (data: AnsweriItem[]) => void;
  updateQuestionIndex: (data: number) => void;
  UpdateSidebarPostion: (data: number) => void;
  questionIndex: number;
}

export const useChanci = create<ChanciState>()(
  persist(
    (set) => ({
      data: [],
      answers: [],
      questionIndex: 1,
      sidebarPostion: 1,
      updateData: (data) => {
        set({ data });
      },
      updateAnswers: (data: AnsweriItem[]) => {
        // @ts-expect-error: Ignoring TypeScript error due to array spread
        set((state) => ({ answers: [...state.answers, data] }));
      },
      updateQuestionIndex: (questionIndex: number) => {
        set({ questionIndex });
      },
      UpdateSidebarPostion: (sidebarPostion: number) => {
        set({ sidebarPostion });
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
