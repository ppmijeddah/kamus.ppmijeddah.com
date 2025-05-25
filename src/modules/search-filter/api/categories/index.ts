import { Category } from "@/domain/dictionary";
import { apiClient } from "@/services/api/client";

export async function getAllCategories(): Promise<Category[]> {
  return await apiClient.get<Category[]>("/api/categories", "force-cache");
}
