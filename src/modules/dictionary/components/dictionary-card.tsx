import { DictionaryEntry } from "@/domain/dictionary";
import { DictionaryCardBookmark } from "../../saved/components/dictionary-card-bookmark";
import { HighlightText } from "./highlight-text";

interface DictionaryCardProps {
  entry?: DictionaryEntry;
  isLoading?: boolean;
  searchQuery?: string;
}

export function DictionaryCard({
  entry,
  isLoading = false,
  searchQuery = "",
}: DictionaryCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-h-[24.75rem] hover:shadow-xl transition-shadow">
        <div className="animate-pulse space-y-16">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
            <div className="text-right flex items-center justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 font-arabic mt-1"></div>
            </div>
          </div>

          {/* Fushah */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between">
            <div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md mb-2"></div>
            </div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full ml-4 flex-shrink-0"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              {entry && (
                <HighlightText text={entry.indonesia} query={searchQuery} />
              )}
            </h2>
          </div>
          <div className="text-right flex items-center justify-between">
            <p className="text-lg text-gray-800 dark:text-white">
              {entry && (
                <HighlightText text={entry.amiyah} query={searchQuery} />
              )}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-arabic mt-1">
              {entry && (
                <HighlightText text={entry.amiyah_arab} query={searchQuery} />
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Fushah:
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-800 dark:text-white">
              {entry && (
                <HighlightText text={entry.fushah} query={searchQuery} />
              )}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-arabic">
              {entry && (
                <HighlightText text={entry.fushah_arab} query={searchQuery} />
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Contoh Penggunaan:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {entry && (
                <HighlightText text={entry.example} query={searchQuery} />
              )}
            </p>
          </div>

          {entry && <DictionaryCardBookmark entry={entry} />}
        </div>
      </div>
    </div>
  );
}
