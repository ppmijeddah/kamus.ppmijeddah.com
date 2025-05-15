import { DictionaryEntry } from "@/types";
import { DictionaryCardBookmark } from "../saved/components/dictionary-card-bookmark";

interface DictionaryCardProps {
  entry: DictionaryEntry;
}

export function DictionaryCard({ entry }: DictionaryCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              {entry.indonesia}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-arabic mt-1">
              {entry.amiyah_arab}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg text-pacamara-secondary font-semibold">
              {entry.word}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Fushah:
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-800 dark:text-white">
              {entry.fushah}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-arabic">
              {entry.fushah_arab}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Contoh Penggunaan:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{entry.contoh}</p>
          </div>

          <DictionaryCardBookmark entry={entry} />
        </div>
      </div>
    </div>
  );
}
