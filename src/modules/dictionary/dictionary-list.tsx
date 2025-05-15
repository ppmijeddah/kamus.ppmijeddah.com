import { DictionaryEntry } from "@/types";
import { DictionaryCard } from "./dictionary-card";

interface DictionaryListProps {
  entries: DictionaryEntry[];
  emptyMessage?: string;
}

export function DictionaryList({
  entries,
  emptyMessage = "Tidak ada kata yang cocok dengan pencarian Anda.",
}: DictionaryListProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <DictionaryCard key={index} entry={entry} />
      ))}
    </div>
  );
}
