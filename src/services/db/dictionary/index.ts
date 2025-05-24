import { getDb } from "@/lib/sqlite";
import { DTO_DictionaryEntry } from "./dto";

export async function getAllEntries(): Promise<DTO_DictionaryEntry[]> {
  const db = await getDb();
  return db.all(`
    SELECT d.*, c.name as category_name
    FROM dictionary_entries d
    LEFT JOIN categories c ON d.category_id = c.id
    ORDER BY d.indonesia
  `);
}

export async function getEntriesByCategory(
  categoryId: number,
): Promise<DTO_DictionaryEntry[]> {
  const db = await getDb();
  return db.all(
    `SELECT d.*, c.name as category_name
     FROM dictionary_entries d
     LEFT JOIN categories c ON d.category_id = c.id
     WHERE d.category_id = ?
     ORDER BY d.indonesia`,
    categoryId,
  );
}

export async function searchEntries(
  query: string,
  categoryId?: number,
): Promise<DTO_DictionaryEntry[]> {
  const db = await getDb();

  let sql = `
    SELECT d.*, c.name as category_name
    FROM dictionary_entries d
    LEFT JOIN categories c ON d.category_id = c.id
    WHERE (
      d.indonesia LIKE ? COLLATE NOCASE
      OR d.amiyah LIKE ? COLLATE NOCASE
      OR d.fushah LIKE ? COLLATE NOCASE
      OR d.amiyah_arab LIKE ? COLLATE NOCASE
      OR d.fushah_arab LIKE ? COLLATE NOCASE
      OR d.example LIKE ? COLLATE NOCASE
    )`;

  const params = Array(6).fill(`%${query}%`);

  if (categoryId) {
    sql += ` AND d.category_id = ?`;
    params.push(categoryId);
  }

  sql += `
    ORDER BY
      CASE
        WHEN d.indonesia = ? COLLATE NOCASE THEN 1
        WHEN d.example = ? COLLATE NOCASE THEN 2
        WHEN d.amiyah = ? COLLATE NOCASE THEN 3
        WHEN d.fushah = ? COLLATE NOCASE THEN 4
        ELSE 5
      END,
      d.indonesia COLLATE NOCASE`;

  params.push(query, query, query, query);

  return db.all(sql, params);
}
