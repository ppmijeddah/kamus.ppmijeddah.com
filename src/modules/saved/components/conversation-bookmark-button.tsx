"use client";

import { Conversation } from "@/domain/scenario";
import { Bookmark } from "lucide-react";
import {
  useSavedStore,
  StoredConversation,
} from "@/modules/saved/store/saved-store";
import { useState, useRef } from "react";
import { ClientOnly } from "@/services/window";

interface ConversationBookmarkButtonProps {
  conversation: Conversation;
  scenarioUuid: string;
  className?: string;
}

export function ConversationBookmarkButton({
  conversation,
  scenarioUuid,
  className,
}: ConversationBookmarkButtonProps) {
  const { isConversationSaved, toggleSavedConversation } = useSavedStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const storedConversationObject: StoredConversation = {
    ...conversation,
    scenarioUuid,
  };

  const handleToggleSaved = () => {
    toggleSavedConversation(storedConversationObject);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <ClientOnly fallback={null}>
      <button
        ref={buttonRef}
        onClick={handleToggleSaved}
        className={`focus:ring-2 focus:ring-pacamara-secondary focus:ring-offset-2 focus:outline-none rounded-full p-1.5 transition-all ${className || ""}`}
        aria-label={
          isConversationSaved(conversation)
            ? "Hapus dari tersimpan"
            : "Simpan percakapan ini"
        }
        title={
          isConversationSaved(conversation)
            ? "Hapus dari tersimpan"
            : "Simpan percakapan ini"
        }
      >
        <Bookmark
          className={`w-6 h-6 transform ${isAnimating ? "scale-125" : ""} transition-all duration-300 ${
            isConversationSaved(conversation)
              ? "fill-pacamara-secondary text-pacamara-secondary"
              : "text-gray-400 hover:text-pacamara-secondary"
          }`}
        />
      </button>
    </ClientOnly>
  );
}
