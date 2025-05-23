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
     WHERE word LIKE ? COLLATE NOCASE
     OR indonesia LIKE ? COLLATE NOCASE
     OR fushah LIKE ? COLLATE NOCASE
     OR amiyah_arab LIKE ? COLLATE NOCASE
     OR fushah_arab LIKE ? COLLATE NOCASE
     OR contoh LIKE ? COLLATE NOCASE
     ORDER BY
        CASE
            WHEN indonesia = ? COLLATE NOCASE THEN 1
            WHEN contoh = ? COLLATE NOCASE THEN 2
            WHEN word = ? COLLATE NOCASE THEN 3
            WHEN fushah = ? COLLATE NOCASE THEN 4
            ELSE 5
        END,
        word COLLATE NOCASE`,
    Array(6).fill(`%${query}%`).concat([query, query, query, query]),
  );
}
