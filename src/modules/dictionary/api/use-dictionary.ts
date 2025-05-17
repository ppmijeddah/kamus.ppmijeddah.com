"use client";

import { DictionaryEntry } from "@/domain/dictionary";
import { useQuery } from "@tanstack/react-query";

interface DictionaryResponse {
  entries: DictionaryEntry[];
  error?: string;
}

export function useDictionaryEntries(query?: string) {
  return useQuery({
    queryKey: ["dictionaryEntries", query],
    queryFn: () => fetchDictionaryEntries(query),
  });
}

async function fetchDictionaryEntries(
  query?: string,
): Promise<DictionaryEntry[]> {
  const apiUrl = query
    ? `/api/dictionary?q=${encodeURIComponent(query)}`
    : "/api/dictionary";

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch dictionary entries");
  }

  const data: DictionaryResponse = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data.entries || [];
}
