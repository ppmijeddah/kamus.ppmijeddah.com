"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { DictionaryEntry } from "@/types";
import entriesJson from "@/__generated__/dictionary.json";
import { useCallback } from "react";
import debounce from "lodash.debounce";
import { Navigation } from "@/components/navigation";
import { Header } from "@/components/header";

function App() {
  const [entries] = useState<DictionaryEntry[]>(
    entriesJson as DictionaryEntry[]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500),
    []
  );

  const filteredEntries = entries.filter(
    (entry) =>
      entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.indonesia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.fushah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-16 pb-24">
      <div className="relative max-w-4xl mx-auto">
        <Header />

        <div className="bg-white dark:bg-gray-800 md:rounded-lg shadow-lg p-4 mb-6 sticky top-0 md:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kata..."
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg"
            />
          </div>
        </div>

        <div className="space-y-4 px-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Tidak ada kata yang cocok dengan pencarian Anda.
              </p>
            </div>
          ) : (
            <DictionaryList entries={filteredEntries} />
          )}
        </div>
      </div>

      <footer className="fixed left-0 bottom-0 right-0">
        <Navigation active="dictionary" />
      </footer>
    </div>
  );
}

function DictionaryList({ entries }: { entries: DictionaryEntry[] }) {
  return entries.map((entry, index) => (
    <div
      key={index}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {entry.word}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-arabic mt-1">
              {entry.amiyah_arab}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg text-pacamara-secondary font-semibold">
              {entry.indonesia}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Fushah:
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-800 dark:text-white">
              {entry.fushah}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-arabic">
              {entry.fushah_arab}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Contoh Penggunaan:
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{entry.contoh}</p>
        </div>
      </div>
    </div>
  ));
}

export default App;
