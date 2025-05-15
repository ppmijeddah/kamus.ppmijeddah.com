import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DictionaryEntry } from "@/types";

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
        return get().saved.some((item) => item.word === entry.word);
      },

      toggleSaved: (entry: DictionaryEntry) => {
        const { saved, isSaved } = get();

        if (isSaved(entry)) {
          set({
            saved: saved.filter((item) => item.word !== entry.word),
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
