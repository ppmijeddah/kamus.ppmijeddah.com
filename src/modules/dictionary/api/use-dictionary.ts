"use client";

import { DictionaryEntry } from "@/domain/dictionary";
import { useQuery } from "@tanstack/react-query";

interface DictionaryResponse {
  entries: DictionaryEntry[];
  error?: string;
}

export function useDictionaryEntries(query?: string, categoryId?: number) {
  return useQuery({
    queryKey: ["dictionaryEntries", query, categoryId],
    queryFn: () => fetchDictionaryEntries(query, categoryId),
  });
}

async function fetchDictionaryEntries(
  query?: string,
  categoryId?: number,
): Promise<DictionaryEntry[]> {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (categoryId) params.set("category", categoryId.toString());

  const apiUrl = params.toString()
    ? `/api/dictionary?${params.toString()}`
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
