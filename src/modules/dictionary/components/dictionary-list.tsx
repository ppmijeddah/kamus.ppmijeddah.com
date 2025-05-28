import { useState, useEffect, useRef } from "react";
import { DictionaryEntry } from "@/domain/dictionary";
import { DictionaryCard } from "./dictionary-card";
import { FadeTransition } from "@/services/animation";
import { AnimatePresence } from "framer-motion";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

interface DictionaryListProps {
  entries: DictionaryEntry[];
  emptyMessage?: string;
  isLoading?: boolean;
  searchQuery?: string;
  onOpenReportModal: (entry: DictionaryEntry) => void;
}

const ESTIMATED_ROW_HEIGHT = 396;

export function DictionaryList({
  entries,
  emptyMessage = "Tidak ada kata yang cocok dengan pencarian Anda.",
  isLoading = false,
  searchQuery = "",
  onOpenReportModal,
}: DictionaryListProps) {
  // Local state to delay the removal of loading skeletons
  const [showLoading, setShowLoading] = useState(() => isLoading);
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
    } else {
      const timer = setTimeout(() => setShowLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const windowVirtualizer = useWindowVirtualizer({
    count: entries.length,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 5,
    scrollMargin: listContainerRef.current?.offsetTop ?? 0,
  });

  const virtualItems = windowVirtualizer.getVirtualItems();

  if (!isLoading && entries.length === 0) {
    return (
      <FadeTransition>
        <div
          ref={listContainerRef}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
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
          <div ref={listContainerRef} className="space-y-4">
            <DictionaryCard isLoading />
            <DictionaryCard isLoading />
            <DictionaryCard isLoading />
            <DictionaryCard isLoading />
          </div>
        </FadeTransition>
      ) : (
        <FadeTransition key="content" duration={0.5}>
          <div ref={listContainerRef} style={{ width: "100%" }}>
            <div
              style={{
                height: `${windowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualItems.map((virtualRow) => {
                const entry = entries[virtualRow.index];
                return (
                  // This outer div is for positioning and applying the virtualizer's calculated size
                  <div
                    key={virtualRow.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start -
                        windowVirtualizer.options.scrollMargin
                      }px)`,
                    }}
                  >
                    {/* This inner div is what we measure. Its height is determined by its content. */}
                    <div
                      ref={windowVirtualizer.measureElement}
                      data-index={virtualRow.index}
                      style={{ paddingBottom: "1rem" }}
                    >
                      <DictionaryCard
                        entry={entry}
                        searchQuery={searchQuery}
                        onOpenReportModal={onOpenReportModal}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeTransition>
      )}
    </AnimatePresence>
  );
}
