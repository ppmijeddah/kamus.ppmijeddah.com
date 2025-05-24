"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDictionaryEntries } from "../api/dictionary";

export function useDictionaryEntries(query?: string, categoryId?: number) {
  return useQuery({
    queryKey: ["dictionaryEntries", query, categoryId],
    queryFn: () => fetchDictionaryEntries(query, categoryId),
  });
}
