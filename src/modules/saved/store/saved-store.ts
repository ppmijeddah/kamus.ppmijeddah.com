import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DictionaryEntry } from "@/domain/dictionary";

interface SavedState {
  saved: DictionaryEntry[];
  isSaved: (entry: DictionaryEntry) => boolean;
  toggleSaved: (entry: DictionaryEntry) => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      saved: [],

      isSaved: (entry: DictionaryEntry) => {
        return get().saved.some((item) => item.id === entry.id);
      },

      toggleSaved: (entry: DictionaryEntry) => {
        const { saved, isSaved } = get();

        if (isSaved(entry)) {
          set({
            saved: saved.filter((item) => item.id !== entry.id),
          });
        } else {
          set({
            saved: [...saved, entry],
          });
        }
      },
    }),
    {
      name: "saved-entries-storage",
    },
  ),
);
