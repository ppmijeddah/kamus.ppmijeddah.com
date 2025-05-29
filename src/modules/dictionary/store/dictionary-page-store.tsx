import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DictionaryEntry } from "@/domain/dictionary";

interface DictionaryPageState {
  isReportModalOpen: boolean;
  selectedEntryForReport: DictionaryEntry | null;
  openReportModal: (entry: DictionaryEntry) => void;
  closeReportModal: () => void;
}

export const useDictionaryPageStore = create<DictionaryPageState>()(
  persist(
    (set) => ({
      isReportModalOpen: false,
      selectedEntryForReport: null,
      openReportModal: (entry) =>
        set({ isReportModalOpen: true, selectedEntryForReport: entry }),
      closeReportModal: () =>
        set({ isReportModalOpen: false, selectedEntryForReport: null }),
    }),
    {
      name: "dictionary-page-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
