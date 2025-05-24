import { DictionaryEntry } from "@/domain/dictionary";
import { apiClient } from "@/services/api/client";

export async function fetchDictionaryEntries(
  args: { query?: string; categoryId?: string | number },
  cache?: RequestCache,
): Promise<DictionaryEntry[]> {
  const params = new URLSearchParams();
  if (args.query) params.set("q", args.query);
  if (args.categoryId) params.set("category", args.categoryId.toString());

  const apiUrl = params.toString()
    ? `/api/dictionary?${params.toString()}`
    : "/api/dictionary";

  const res = await apiClient.get<DictionaryEntry[]>(apiUrl, cache);

  return res;
}
