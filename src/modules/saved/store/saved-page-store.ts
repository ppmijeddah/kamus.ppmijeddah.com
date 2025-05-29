import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DictionaryEntry } from "@/domain/dictionary";

interface SavedPageState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isReportModalOpen: boolean;
  selectedEntryForReport: DictionaryEntry | null;
  openReportModal: (entry: DictionaryEntry) => void;
  closeReportModal: () => void;
}

export const useSavedPageStore = create<SavedPageState>()(
  persist(
    (set) => ({
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      isReportModalOpen: false,
      selectedEntryForReport: null,
      openReportModal: (entry) =>
        set({ isReportModalOpen: true, selectedEntryForReport: entry }),
      closeReportModal: () =>
        set({ isReportModalOpen: false, selectedEntryForReport: null }),
    }),
    {
      name: "saved-page-ui-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
