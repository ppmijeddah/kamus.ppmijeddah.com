"use client";

import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useSavedStore } from "@/modules/saved/store/saved-store";
import debounce from "lodash.debounce";

function SavedPageContainer() {
  const saved = useSavedStore((state) => state.saved);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500),
    [],
  );

  const filteredSaved = saved
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
    .sort((a, b) => {
      return (a.indonesia || "")
        .toLowerCase()
        .localeCompare((b.indonesia || "").toLowerCase());
    });

  return (
    <div className="pt-16 pb-24">
      <div className="relative max-w-4xl mx-auto">
        <Header />

        <div className="z-10 bg-white dark:bg-gray-800 md:rounded-lg shadow-lg p-4 mb-6 sticky top-0 md:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari tersimpan..."
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg"
            />
          </div>
        </div>

        <div className="space-y-4 px-4">
          <DictionaryList
            searchQuery={searchTerm}
            entries={filteredSaved}
            emptyMessage={
              searchTerm
                ? "Tidak ada kata tersimpan yang cocok dengan pencarian Anda."
                : "Belum ada kata tersimpan. Tambahkan dengan menekan ikon bookmark pada entri kamus."
            }
          />
        </div>
      </div>

      <footer className="fixed left-0 bottom-0 right-0">
        <Navigation active="saved" />
      </footer>
    </div>
  );
}

export default SavedPageContainer;
