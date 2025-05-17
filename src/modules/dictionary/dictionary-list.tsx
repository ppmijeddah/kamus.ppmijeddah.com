import { DictionaryEntry } from "@/domain/dictionary";
import { DictionaryCard } from "./dictionary-card";
import { FadeTransition } from "@/services/animation";

interface DictionaryListProps {
  entries: DictionaryEntry[];
  emptyMessage?: string;
  isLoading?: boolean;
}

export function DictionaryList({
  entries,
  emptyMessage = "Tidak ada kata yang cocok dengan pencarian Anda.",
  isLoading = false,
}: DictionaryListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <DictionaryCard isLoading />
        <DictionaryCard isLoading />
        <DictionaryCard isLoading />
        <DictionaryCard isLoading />
      </div>
    );
  }

  if (entries.length === 0) {
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
    <FadeTransition>
      <div className="space-y-4">
        {entries.map((entry) => (
          <DictionaryCard key={entry.id || Math.random()} entry={entry} />
        ))}
      </div>
    </FadeTransition>
  );
}
