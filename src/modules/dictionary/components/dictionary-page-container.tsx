"use client";

import { Search } from "lucide-react";
import { useCallback } from "react";
import debounce from "lodash.debounce";
import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useRouter, useSearchParams } from "next/navigation";
import { useDictionaryEntries } from "@/modules/dictionary/api/use-dictionary";

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

        <div className="z-10 bg-white dark:bg-gray-800 md:rounded-lg shadow-lg p-4 mb-6 sticky top-0 md:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kata..."
              onChange={handleSearch}
              defaultValue={query}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg"
            />
          </div>
        </div>

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
