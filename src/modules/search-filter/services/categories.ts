import { Category } from "@/domain/dictionary";

export function orderCategoriesByRank(categories: Category[]): Category[] {
  return [...categories].sort((a, b) => a.rank - b.rank);
}
