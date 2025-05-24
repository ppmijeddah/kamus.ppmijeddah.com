"use client";

import { useCallback } from "react";
import debounce from "lodash.debounce";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useRouter, useSearchParams } from "next/navigation";
import { useDictionaryEntries } from "@/modules/dictionary/api-adapter/use-dictionary";
import { SearchFilter } from "@/modules/search-filter/components/search-filter";
import { getEmptyMessage } from "@/modules/search-filter/services/empty";

interface DictionaryPageContainerProps {
  categories: Array<{ id: number; name: string }>;
}

function DictionaryPageContainer({ categories }: DictionaryPageContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryId = searchParams.get("category")
    ? parseInt(searchParams.get("category") || "0", 10)
    : undefined;

  const {
    data: entries = [],
    isLoading,
    isError,
    error,
  } = useDictionaryEntries(query, categoryId);

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

  return (
    <>
      <SearchFilter
        onChange={handleSearch}
        defaultValue={query}
        categories={categories}
        selectedCategoryId={categoryId}
        onCategoryChange={handleCategoryChange}
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
          />
        )}
      </div>
    </>
  );
}

export default DictionaryPageContainer;
