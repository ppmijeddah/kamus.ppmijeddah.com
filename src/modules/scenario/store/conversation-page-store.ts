import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Sentence } from "@/domain/scenario";

interface ConversationPageState {
  isReportModalOpen: boolean;
  selectedSentenceForReport: Sentence | null;
  openReportModal: (sentence: Sentence) => void;
  closeReportModal: () => void;
}

export const useConversationPageStore = create<ConversationPageState>()(
  persist(
    (set) => ({
      isReportModalOpen: false,
      selectedSentenceForReport: null,
      openReportModal: (sentence) =>
        set({ isReportModalOpen: true, selectedSentenceForReport: sentence }),
      closeReportModal: () =>
        set({ isReportModalOpen: false, selectedSentenceForReport: null }),
    }),
    {
      name: "conversation-page-report-modal-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
