import { getDb } from "@/lib/sqlite";
import { DTO_DictionaryEntry } from "./dto";

export async function getAllEntries(): Promise<DTO_DictionaryEntry[]> {
  const db = await getDb();
  return db.all("SELECT * FROM dictionary_entries ORDER BY indonesia");
}

export async function searchEntries(
  query: string,
): Promise<DTO_DictionaryEntry[]> {
  const db = await getDb();
  return db.all(
    `SELECT * FROM dictionary_entries
     WHERE indonesia LIKE ? COLLATE NOCASE
     OR amiyah LIKE ? COLLATE NOCASE
     OR fushah LIKE ? COLLATE NOCASE
     OR amiyah_arab LIKE ? COLLATE NOCASE
     OR fushah_arab LIKE ? COLLATE NOCASE
     OR example LIKE ? COLLATE NOCASE
     OR category LIKE ? COLLATE NOCASE
     ORDER BY
        CASE
            WHEN indonesia = ? COLLATE NOCASE THEN 1
            WHEN example = ? COLLATE NOCASE THEN 2
            WHEN amiyah = ? COLLATE NOCASE THEN 3
            WHEN fushah = ? COLLATE NOCASE THEN 4
            ELSE 5
        END,
        indonesia COLLATE NOCASE`,
    Array(7).fill(`%${query}%`).concat([query, query, query, query]),
  );
}
