"use client";

import { DictionaryEntry } from "@/domain/dictionary";
import { Bookmark } from "lucide-react";
import { useSavedStore } from "@/modules/saved/store/saved-store";
import { useState, useRef } from "react";
import { ClientOnly } from "@/services/window";

interface DictionaryCardBookmarkProps {
  entry: DictionaryEntry;
}

export function DictionaryCardBookmark({ entry }: DictionaryCardBookmarkProps) {
  const { isDictionaryEntrySaved, toggleSavedDictionaryEntry } =
    useSavedStore();
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleSaved = () => {
    toggleSavedDictionaryEntry(entry);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleFocus = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      const bottomNavbarHeight = 61;
      const offsetToScroll = bottomNavbarHeight + 28;

      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const isCoveredByNav = rect.bottom > viewportHeight - bottomNavbarHeight;

      if (isCoveredByNav) {
        const scrollOffset =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollPosition =
          scrollOffset +
          rect.top -
          viewportHeight +
          rect.height +
          offsetToScroll;

        window.scrollTo({
          top: targetScrollPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <ClientOnly fallback={null}>
      <button
        ref={buttonRef}
        onClick={handleToggleSaved}
        onFocus={handleFocus}
        className="h-fit ml-2 focus:ring-2 focus:ring-pacamara-secondary focus:ring-offset-2 focus:outline-none rounded-full p-1 transition-all mt-auto"
        aria-label={
          isDictionaryEntrySaved(entry)
            ? "Hapus dari entri tersimpan"
            : "Simpan entri ini"
        }
      >
        <Bookmark
          className={`w-6 h-6 transform ${isAnimating ? "scale-125" : ""} transition-all duration-300 ${
            isDictionaryEntrySaved(entry)
              ? "fill-pacamara-secondary text-pacamara-secondary"
              : "text-gray-400 hover:text-pacamara-secondary"
          }`}
        />
      </button>
    </ClientOnly>
  );
}
