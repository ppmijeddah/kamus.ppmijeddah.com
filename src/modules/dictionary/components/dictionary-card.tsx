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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-h-[22.75rem]">
        <div className="animate-pulse space-y-6 h-full flex flex-col justify-between">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="grow">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
            </div>
            <div className="text-right">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24 sm:ml-auto"></div>
            </div>
          </div>

          {/* Fushah section */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-3"></div>
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>

          {/* Example usage section */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-5 flex justify-between">
            <div className="w-full">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              {entry && (
                <HighlightText text={entry.indonesia} query={searchQuery} />
              )}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-arabic mt-1">
              {entry && (
                <HighlightText text={entry.amiyah_arab} query={searchQuery} />
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg text-pacamara-secondary font-semibold">
              {entry && (
                <HighlightText text={entry.amiyah} query={searchQuery} />
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
