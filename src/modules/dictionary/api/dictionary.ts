import { DictionaryEntry } from "@/domain/dictionary";
import { apiClient } from "@/services/api/client";

export async function fetchDictionaryEntries(
  query?: string,
  categoryId?: number,
): Promise<DictionaryEntry[]> {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (categoryId) params.set("category", categoryId.toString());

  const apiUrl = params.toString()
    ? `/api/dictionary?${params.toString()}`
    : "/api/dictionary";

  const res = await apiClient.get<DictionaryEntry[]>(apiUrl);

  return res;
}
