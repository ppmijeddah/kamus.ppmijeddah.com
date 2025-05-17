import { useState, useEffect } from "react";
import { DictionaryEntry } from "@/domain/dictionary";
import { DictionaryCard } from "./dictionary-card";
import { FadeTransition } from "@/services/animation";
import { AnimatePresence } from "framer-motion";

interface DictionaryListProps {
  entries: DictionaryEntry[];
  emptyMessage?: string;
  isLoading?: boolean;
  searchQuery?: string;
}

export function DictionaryList({
  entries,
  emptyMessage = "Tidak ada kata yang cocok dengan pencarian Anda.",
  isLoading = false,
  searchQuery = "",
}: DictionaryListProps) {
  // Local state to delay the removal of loading skeletons
  const [showLoading, setShowLoading] = useState(() => isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      // Delay hiding the loading state by 800ms after data arrives
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isLoading && entries.length == 0) {
    return (
      <FadeTransition>
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {emptyMessage}
          </p>
        </div>
      </FadeTransition>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showLoading ? (
        <FadeTransition key="loading" duration={0.5}>
          <div className="space-y-4">
            <DictionaryCard isLoading />
            <DictionaryCard isLoading />
            <DictionaryCard isLoading />
            <DictionaryCard isLoading />
          </div>
        </FadeTransition>
      ) : (
        <FadeTransition key="content" duration={0.5}>
          <div className="space-y-4">
            {entries.map((entry) => (
              <DictionaryCard
                key={entry.id || Math.random()}
                entry={entry}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </FadeTransition>
      )}
    </AnimatePresence>
  );
}
