import { Search, ChevronDown } from "lucide-react";
import React from "react";

interface CategoryOption {
  id: number;
  name: string;
}

interface SearchFilterProps {
  // Props for the search input
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;

  // Props for the category filter
  categories: CategoryOption[];
  selectedCategoryId?: number;
  onCategoryChange?: (categoryId: number) => void;
}

export function SearchFilter({
  onChange,
  defaultValue,
  categories,
  selectedCategoryId,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="z-10 bg-white dark:bg-gray-800 md:rounded-lg shadow-lg p-4 mb-6 sticky top-0 md:mx-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari kata..."
            onChange={onChange}
            defaultValue={defaultValue}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg"
          />
        </div>

        <div className="relative">
          <select
            value={selectedCategoryId ?? ""}
            onChange={(e) => onCategoryChange?.(Number(e.target.value) || 0)}
            className="w-full md:w-auto pl-3 pr-10 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg appearance-none"
          >
            <option value="">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
