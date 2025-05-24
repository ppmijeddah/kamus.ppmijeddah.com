import { DictionaryEntry } from "@/domain/dictionary";
import { DictionaryCardBookmark } from "../../saved/components/dictionary-card-bookmark";
import { HighlightText } from "./highlight-text";
import { toSentenceCase } from "@/services/text";
import { reportEntryViaWhatsapp } from "../services/report-entry-issue";
import { Flag } from "lucide-react";

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
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/4"></div>
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
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full ml-2 flex-shrink-0"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full ml-2 flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleReportIssue = () => {
    if (!entry) {
      return;
    }
    const { indonesia, amiyah_arab, uuid } = entry;
    if (indonesia && amiyah_arab && uuid) {
      reportEntryViaWhatsapp({ indonesia, amiyah_arab, uuid });
    } else {
      console.error("Missing data for reporting issue:", entry);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {entry && (
                <HighlightText
                  text={toSentenceCase(entry.indonesia)}
                  query={searchQuery}
                />
              )}
            </h2>
            {entry?.category_name && (
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full ml-3 whitespace-nowrap">
                {toSentenceCase(entry.category_name)}
              </span>
            )}
          </div>

          <div className="text-right flex items-center justify-between">
            <p className="text-lg text-gray-800 dark:text-white">
              {entry && (
                <HighlightText
                  text={toSentenceCase(entry.amiyah)}
                  query={searchQuery}
                />
              )}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-arabic mt-1">
              {entry && (
                <HighlightText
                  text={toSentenceCase(entry.amiyah_arab)}
                  query={searchQuery}
                />
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
                <HighlightText
                  text={toSentenceCase(entry.fushah)}
                  query={searchQuery}
                />
              )}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-arabic">
              {entry && (
                <HighlightText
                  text={toSentenceCase(entry.fushah_arab)}
                  query={searchQuery}
                />
              )}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-end">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Contoh Penggunaan:
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {entry && (
                <HighlightText
                  text={toSentenceCase(entry.example)}
                  query={searchQuery}
                />
              )}
            </p>
          </div>

          <div className="flex items-center">
            {entry && (
              <button
                onClick={handleReportIssue}
                className="h-fit ml-2 focus:ring-2 focus:ring-pacamara-secondary focus:ring-offset-2 focus:outline-none rounded-full p-1 transition-all"
                aria-label="Report issue with this entry"
                title="Laporkan Kesalahan"
              >
                <Flag
                  className={`w-6 h-6 text-gray-400 hover:text-pacamara-secondary transition-colors`}
                />
              </button>
            )}
            {entry && <DictionaryCardBookmark entry={entry} />}
          </div>
        </div>
      </div>
    </div>
  );
}
