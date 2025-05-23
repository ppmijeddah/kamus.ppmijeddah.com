import { Search } from "lucide-react";
import React from "react";

interface SearchFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}

export function SearchFilter({ onChange, defaultValue }: SearchFilterProps) {
  return (
    <div className="z-10 bg-white dark:bg-gray-800 md:rounded-lg shadow-lg p-4 mb-6 sticky top-0 md:mx-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Cari kata..."
          onChange={onChange}
          defaultValue={defaultValue}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg"
        />
      </div>
    </div>
  );
}
