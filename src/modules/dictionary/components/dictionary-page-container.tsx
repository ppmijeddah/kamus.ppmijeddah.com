"use client";

import { useCallback } from "react";
import debounce from "lodash.debounce";
import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useRouter, useSearchParams } from "next/navigation";
import { useDictionaryEntries } from "@/modules/dictionary/api/use-dictionary";
import { SearchFilter } from "@/modules/search-filter/components/search-filter";

function DictionaryPageContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: entries = [],
    isLoading,
    isError,
    error,
  } = useDictionaryEntries(query);

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

  return (
    <div className="pt-16 pb-24">
      <div className="relative max-w-4xl mx-auto">
        <Header />

        <SearchFilter
          onChange={handleSearch}
          defaultValue={query}
          categories={[
            { id: 1, name: "Wajib tahu" },
            { id: 2, name: "Arah dan jalan" },
            { id: 3, name: "Belanja dan harga" },
          ]}
        />

        <div className="space-y-4 px-4">
          {isError ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-red-600 dark:text-red-400 text-lg">
                Error:{" "}
                {error instanceof Error
                  ? error.message
                  : "Failed to load dictionary entries"}
              </p>
            </div>
          ) : (
            <DictionaryList
              entries={entries}
              isLoading={isLoading}
              searchQuery={query}
            />
          )}
        </div>
      </div>

      <footer className="fixed left-0 bottom-0 right-0">
        <Navigation active="dictionary" />
      </footer>
    </div>
  );
}

export default DictionaryPageContainer;
