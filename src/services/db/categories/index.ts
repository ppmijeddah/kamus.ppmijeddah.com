import { getDb } from "@/lib/sqlite";
import { DTO_Category } from "./dto";

export async function getAllCategories(): Promise<DTO_Category[]> {
  const db = await getDb();
  const categories = await db.all("SELECT id, name, rank FROM categories");
  return categories;
}
