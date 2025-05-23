"use client";

import { useState, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";
import { DictionaryList } from "@/modules/dictionary/components/dictionary-list";
import { useSavedStore } from "@/modules/saved/store/saved-store";
import debounce from "lodash.debounce";
import { SearchFilter } from "@/modules/search-filter/components/search-filter";

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

        <SearchFilter
          onChange={handleSearch}
          defaultValue={searchTerm}
          categories={[
            { id: 1, name: "Wajib tahu" },
            { id: 2, name: "Arah dan jalan" },
            { id: 3, name: "Belanja dan harga" },
          ]}
        />

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
