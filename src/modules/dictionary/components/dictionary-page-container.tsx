"use client";

import { useCallback, lazy, Suspense } from "react"; // Removed useState
import debounce from "lodash.debounce";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useRouter, useSearchParams } from "next/navigation";
import { useDictionaryEntries } from "@/modules/dictionary/api-adapter/use-dictionary";
import { SearchFilter } from "@/modules/search-filter/components/search-filter";
import { getEmptyMessage } from "@/modules/search-filter/services/empty";
import { FadeTransition } from "@/services/animation";
import { DictionaryEntry } from "@/domain/dictionary";
import { DictionaryEntryCount } from "./dictionary-entry-count";
import { reportEntryViaWhatsapp } from "../services/report-entry-issue";
import { Loader2 } from "lucide-react";
import { useDictionaryPageStore } from "../store/dictionary-page-store";

const ReportEntryModal = lazy(() =>
  import("./report-entry-modal").then((module) => ({
    default: module.ReportEntryModal,
  })),
);

interface DictionaryPageContainerProps {
  categories: Array<{ id: number; name: string }>;
  initialEntries: DictionaryEntry[];
}

function DictionaryPageContainer({
  categories,
  initialEntries,
}: DictionaryPageContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryId = searchParams.get("category")
    ? parseInt(searchParams.get("category") || "0", 10)
    : undefined;

  const {
    isReportModalOpen,
    selectedEntryForReport,
    openReportModal,
    closeReportModal,
  } = useDictionaryPageStore();

  const shouldUseInitialData = !query && categoryId === undefined;

  const {
    data: entries = [],
    isLoading,
    isError,
    error,
  } = useDictionaryEntries(
    { query, categoryId },
    {
      initialData: shouldUseInitialData ? initialEntries : undefined,
      enabled: !shouldUseInitialData,
    },
  );

  const handleOpenReportModal = useCallback(
    (entry: DictionaryEntry) => {
      openReportModal(entry);
    },
    [openReportModal],
  );

  const handleCloseReportModal = useCallback(() => {
    closeReportModal();
  }, [closeReportModal]);

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

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      const params = new URLSearchParams(searchParams.toString());

      if (newQuery) {
        params.set("q", newQuery);
      } else {
        params.delete("q");
      }

      router.replace(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500),
    [router, searchParams],
  );

  const handleCategoryChange = useCallback(
    (newCategoryId: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newCategoryId) {
        params.set("category", newCategoryId.toString());
      } else {
        params.delete("category");
      }
      router.replace(`?${params.toString()}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router, searchParams],
  );

  const handleReset = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("category");
    router.replace(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router, searchParams]);

  return (
    <FadeTransition>
      <SearchFilter
        onChange={handleSearch}
        defaultValue={query}
        categories={categories}
        selectedCategoryId={categoryId}
        onCategoryChange={handleCategoryChange}
        onReset={handleReset}
      />

      <DictionaryEntryCount
        count={entries.length}
        isVisible={entries.length > 0}
      />

      <div className="space-y-4 px-4">
        {isError ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-red-600 dark:text-red-400 text-lg">
              Error:{" "}
              {error instanceof Error
                ? error.message
                : "Gagal mendapatkan data kamus"}
            </p>
          </div>
        ) : (
          <DictionaryList
            entries={entries}
            isLoading={isLoading}
            searchQuery={query}
            emptyMessage={getEmptyMessage(query, categoryId)}
            onOpenReportModal={handleOpenReportModal}
          />
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

export default DictionaryPageContainer;
