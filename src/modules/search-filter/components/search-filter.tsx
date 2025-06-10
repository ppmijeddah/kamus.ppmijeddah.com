import { Search, ChevronDown, RotateCcw } from "lucide-react";
import React, { useRef } from "react";

interface CategoryOption {
  id: number;
  name: string;
}

interface SearchFilterProps {
  onReset?: () => void;

  // Props for the search input
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;

  // Props for the category filter
  categories?: CategoryOption[];
  selectedCategoryId?: number;
  onCategoryChange?: (categoryId: number) => void;
  hideCategoryFilter?: boolean;
}

export function SearchFilter({
  onChange,
  defaultValue,
  placeholder = "Cari kata...",
  value,
  categories,
  selectedCategoryId,
  onCategoryChange,
  hideCategoryFilter,
  onReset,
}: SearchFilterProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onReset?.();
  };

  return (
    <div className="z-10 bg-white dark:bg-gray-800 md:rounded-lg shadow-lg p-4 mb-6 sticky top-0 md:mx-4">
      <div
        className={`flex ${
          hideCategoryFilter
            ? "flex-row items-center space-x-4"
            : "flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0"
        }`}
      >
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg"
          />
        </div>

        <div className="flex items-center gap-4">
          {hideCategoryFilter ? null : (
            <>
              {/* Category Select */}
              <div className="relative grow">
                <select
                  value={selectedCategoryId ?? ""}
                  onChange={(e) =>
                    onCategoryChange?.(Number(e.target.value) || 0)
                  }
                  className="w-full md:w-auto pl-3 pr-10 py-3 rounded-lg border border-gray-400 bg-transparent dark:text-white focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors text-lg appearance-none"
                >
                  <option value="">Semua Kategori</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
              </div>
            </>
          )}

          {/* Reset button */}
          {onReset && (
            <button
              onClick={handleReset}
              className="w-[3.375rem] h-[3.375rem] p-3 rounded-lg border border-gray-400 bg-transparent dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:border-pacamara-primary focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-600 outline-none transition-colors flex items-center justify-center text-lg"
              aria-label="Reset filter"
            >
              <RotateCcw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
