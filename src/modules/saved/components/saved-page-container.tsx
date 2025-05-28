"use client";

import { useState, useCallback, useMemo, lazy, Suspense } from "react";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useSavedStore } from "@/modules/saved/store/saved-store";
import { SearchFilter } from "@/modules/search-filter/components/search-filter";
import { getEmptyMessageForSavedPage } from "@/modules/search-filter/services/empty";
import { FadeTransition } from "@/services/animation";
import { SavedConversationCard } from "../../scenario/components/saved-conversation-card";
import { SavedItemCount } from "./saved-item-count";
import { DictionaryEntry } from "@/domain/dictionary";
import { reportEntryViaWhatsapp } from "@/modules/dictionary/services/report-entry-issue";
import { Loader2 } from "lucide-react";

const ReportEntryModal = lazy(() =>
  import("@/modules/dictionary/components/report-entry-modal").then(
    (module) => ({
      default: module.ReportEntryModal,
    }),
  ),
);

function SavedPageContainer() {
  const savedDictionaryEntries = useSavedStore(
    (state) => state.savedDictionaryEntries,
  );
  const savedConversations = useSavedStore((state) => state.savedConversations);

  const [searchTerm, setSearchTerm] = useState("");

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedEntryForReport, setSelectedEntryForReport] =
    useState<DictionaryEntry | null>(null);

  const handleOpenReportModal = useCallback((entry: DictionaryEntry) => {
    setSelectedEntryForReport(entry);
    setIsReportModalOpen(true);
  }, []);

  const handleCloseReportModal = useCallback(() => {
    setIsReportModalOpen(false);
    setSelectedEntryForReport(null);
  }, []);

  const handleSubmitEntryReport = useCallback(
    (problemDescription: string, suggestion?: string) => {
      if (selectedEntryForReport) {
        reportEntryViaWhatsapp(
          {
            indonesia: selectedEntryForReport.indonesia,
            amiyah_arab: selectedEntryForReport.amiyah_arab,
            uuid: selectedEntryForReport.uuid,
          },
          problemDescription,
          suggestion,
        );
        handleCloseReportModal();
      }
    },
    [selectedEntryForReport, handleCloseReportModal],
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleReset = useCallback(() => {
    setSearchTerm("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredDictionaryEntries = useMemo(
    () =>
      savedDictionaryEntries
        .filter((entry) => {
          if (!searchTerm) return true;
          const term = searchTerm.toLowerCase();
          return (
            entry.amiyah?.toLowerCase().includes(term) ||
            entry.indonesia?.toLowerCase().includes(term) ||
            entry.fushah?.toLowerCase().includes(term) ||
            entry.amiyah_arab?.toLowerCase().includes(term) ||
            entry.fushah_arab?.toLowerCase().includes(term) ||
            entry.example?.toLowerCase().includes(term) ||
            entry.category_name?.toLowerCase().includes(term)
          );
        })
        .sort((a, b) =>
          (a.indonesia || "")
            .toLowerCase()
            .localeCompare((b.indonesia || "").toLowerCase()),
        ),
    [savedDictionaryEntries, searchTerm],
  );

  const filteredConversations = useMemo(
    () =>
      savedConversations
        .filter((sConversation) => {
          if (!searchTerm) return true;
          const term = searchTerm.toLowerCase();
          return (
            sConversation.title?.toLowerCase().includes(term) ||
            sConversation.description?.toLowerCase().includes(term)
          );
        })
        .sort((a, b) =>
          (a.title || "")
            .toLowerCase()
            .localeCompare((b.title || "").toLowerCase()),
        ),
    [savedConversations, searchTerm],
  );

  const totalFilteredItems =
    filteredDictionaryEntries.length + filteredConversations.length;
  const totalSavedItemsOverall =
    savedDictionaryEntries.length + savedConversations.length;

  return (
    <FadeTransition>
      <SearchFilter
        placeholder="Cari kata atau percakapan..."
        onChange={handleSearch}
        value={searchTerm}
        onReset={handleReset}
        hideCategoryFilter
      />

      {totalSavedItemsOverall > 0 && (
        <SavedItemCount count={totalFilteredItems} />
      )}

      <div className="space-y-8 px-4 pb-8">
        {filteredDictionaryEntries.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
              Kata Tersimpan ({filteredDictionaryEntries.length})
            </h2>
            <DictionaryList
              searchQuery={searchTerm}
              entries={filteredDictionaryEntries}
              emptyMessage=""
              onOpenReportModal={handleOpenReportModal}
            />
          </section>
        )}
        {filteredConversations.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">
              Percakapan Tersimpan ({filteredConversations.length})
            </h2>
            <div className="space-y-4">
              {filteredConversations.map((sConv) => (
                <SavedConversationCard
                  key={sConv.uuid}
                  storedConversation={sConv}
                  searchQuery={searchTerm}
                />
              ))}
            </div>
          </section>
        )}
        {totalFilteredItems === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg p-4">
              {getEmptyMessageForSavedPage(
                searchTerm,
                totalSavedItemsOverall > 0,
              )}
            </p>
          </div>
        )}
      </div>
      {isReportModalOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          }
        >
          <ReportEntryModal
            isOpen={isReportModalOpen}
            onClose={handleCloseReportModal}
            onSubmit={handleSubmitEntryReport}
            entry={selectedEntryForReport}
          />
        </Suspense>
      )}
    </FadeTransition>
  );
}

export default SavedPageContainer;
