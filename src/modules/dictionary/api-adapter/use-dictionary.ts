"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchDictionaryEntries } from "../api/dictionary";
import { DictionaryEntry } from "@/domain/dictionary";

export function useDictionaryEntries(
  args: {
    query?: string;
    categoryId?: number;
  },
  options?: Omit<UseQueryOptions<DictionaryEntry[]>, "queryKey">,
) {
  const { query, categoryId } = args;
  return useQuery<DictionaryEntry[]>({
    ...options,
    queryKey: ["dictionaryEntries", query, categoryId],
    queryFn: () => fetchDictionaryEntries({ query, categoryId }),
  });
}
