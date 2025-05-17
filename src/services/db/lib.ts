import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

export async function getDb() {
  const dbPath = path.join(process.cwd(), "dictionary.db");

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS dictionary_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      amiyah_arab TEXT NOT NULL,
      indonesia TEXT NOT NULL,
      fushah TEXT NOT NULL,
      fushah_arab TEXT NOT NULL,
      contoh TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_word ON dictionary_entries(word COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_indonesia ON dictionary_entries(indonesia COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_fushah ON dictionary_entries(fushah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_amiyah_arab ON dictionary_entries(amiyah_arab);
  `);

  return db;
}
