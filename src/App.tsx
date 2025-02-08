import { useState } from "react";
import { Search, Book } from "lucide-react";
import type { DictionaryEntry } from "./types";
import entriesJson from "./__generated__/dictionary.json";

function App() {
  const [entries] = useState<DictionaryEntry[]>(
    entriesJson as DictionaryEntry[]
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = entries.filter(
    (entry) =>
      entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.indonesia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.fushah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-svh bg-white p-4 font-pacamara-inter prose dark:prose-invert max-w-full prose-headings:p-0 prose-headings:m-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Book className="w-10 h-10 text-pacamara-secondary" />
          <h1 className="relative bottom-2">
            <span className="gradient-underline">
              <span>Kamus Amiyah Saudi {"<>"} Fushah</span>
            </span>
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari kata dalam bahasa Arab atau Indonesia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 outline-none transition-colors text-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-lg">
              <p className="text-gray-600 text-lg">
                Tidak ada kata yang cocok dengan pencarian Anda.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {entry.word}
                      </h2>
                      <p className="text-xl text-gray-600 font-arabic mt-1">
                        {entry.amiyah_arab}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-pacamara-secondary font-semibold">
                        {entry.indonesia}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      Fushah:
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-lg text-gray-800">{entry.fushah}</p>
                      <p className="text-lg text-gray-600 font-arabic">
                        {entry.fushah_arab}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      Contoh Penggunaan:
                    </h3>
                    <p className="text-gray-700">{entry.contoh}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
