import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DictionaryEntry } from "@/domain/dictionary";
import type { Conversation } from "@/domain/scenario";

export interface StoredConversation extends Conversation {
  scenarioUuid: string;
}

interface SavedState {
  savedDictionaryEntries: DictionaryEntry[];
  savedConversations: StoredConversation[];
  isDictionaryEntrySaved: (entry: DictionaryEntry) => boolean;
  toggleSavedDictionaryEntry: (entry: DictionaryEntry) => void;
  isConversationSaved: (conversation: Conversation) => boolean;
  toggleSavedConversation: (storedConversation: StoredConversation) => void;
  getSavedItemCount: () => number;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedDictionaryEntries: [],
      savedConversations: [],

      isDictionaryEntrySaved: (entry: DictionaryEntry) => {
        return get().savedDictionaryEntries.some(
          (item) => item.id === entry.id,
        );
      },

      toggleSavedDictionaryEntry: (entry: DictionaryEntry) => {
        const { savedDictionaryEntries, isDictionaryEntrySaved } = get();
        if (isDictionaryEntrySaved(entry)) {
          set({
            savedDictionaryEntries: savedDictionaryEntries.filter(
              (item) => item.id !== entry.id,
            ),
          });
        } else {
          set({
            savedDictionaryEntries: [...savedDictionaryEntries, entry],
          });
        }
      },

      isConversationSaved: (conversation: Conversation) => {
        return get().savedConversations.some(
          (item) => item.uuid === conversation.uuid,
        );
      },

      toggleSavedConversation: (storedConversation: StoredConversation) => {
        const { savedConversations, isConversationSaved } = get();
        const baseConversation: Conversation = {
          uuid: storedConversation.uuid,
          title: storedConversation.title,
          description: storedConversation.description,
        };
        if (isConversationSaved(baseConversation)) {
          set({
            savedConversations: savedConversations.filter(
              (item) => item.uuid !== storedConversation.uuid,
            ),
          });
        } else {
          set({
            savedConversations: [...savedConversations, storedConversation],
          });
        }
      },
      getSavedItemCount: () => {
        return (
          get().savedDictionaryEntries.length + get().savedConversations.length
        );
      },
    }),
    {
      name: "saved-items-storage",
    },
  ),
);
