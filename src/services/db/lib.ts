import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs/promises";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let inMemoryDb: any = null;

export async function getDb() {
  if (inMemoryDb) {
    return inMemoryDb;
  }

  const db = await open({
    filename: ":memory:",
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

  await loadDictionaryData(db);

  inMemoryDb = db;
  return db;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadDictionaryData(db: any) {
  try {
    const csvPath = path.join(
      process.cwd(),
      "src",
      "scripts",
      "dictionary.csv",
    );
    const csvData = await fs.readFile(csvPath, "utf8");

    const lines = csvData.split("\n");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0]; // Skip header

    await db.run("BEGIN TRANSACTION");

    const insert = await db.prepare(`
      INSERT INTO dictionary_entries (word, amiyah_arab, indonesia, fushah, fushah_arab, contoh)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [word, amiyah_arab, indonesia, fushah, fushah_arab, contoh] =
        line.split(",");

      if (word) {
        await insert.run(
          word.toLowerCase().trim(),
          amiyah_arab?.trim() || "",
          indonesia?.toLowerCase().trim() || "",
          fushah?.toLowerCase().trim() || "",
          fushah_arab?.trim() || "",
          contoh?.toLowerCase().trim() || "",
        );
        importedCount++;
      }
    }

    await db.run("COMMIT");
    await insert.finalize();

    console.log(
      `Loaded ${importedCount} dictionary entries into in-memory database`,
    );

    // Verify data loaded correctly
    const count = await db.get(
      "SELECT COUNT(*) as count FROM dictionary_entries",
    );
    console.log(`Total entries in database: ${count.count}`);
  } catch (error) {
    console.error("Error loading dictionary data:", error);
    try {
      await db.run("ROLLBACK");
    } catch (e) {
      console.error("Error rolling back transaction:", e);
    }

    throw new Error(`Failed to load dictionary data: ${error}`);
  }
}
