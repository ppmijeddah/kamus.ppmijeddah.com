/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs").promises;
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

async function main() {
  const input = path.join(__dirname, "./dictionary.csv");

  // Use the same database path as defined in services/db/lib.ts
  const dbPath = path.join(process.cwd(), "dictionary.db");

  console.log(`Parsing dictionary CSV in ${input}`);
  console.log(`Storing in SQLite database: ${dbPath}`);

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
    CREATE INDEX IF NOT EXISTS idx_contoh ON dictionary_entries(contoh COLLATE NOCASE);
  `);

  console.log("Clearing existing dictionary entries...");
  await db.run("DELETE FROM dictionary_entries");

  // Parse CSV
  const text = await fs.readFile(input, "utf8");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [header, ...lines] = text.split("\n");

  console.log(`Found ${lines.length} entries to import`);

  const insert = await db.prepare(`
    INSERT INTO dictionary_entries (word, amiyah_arab, indonesia, fushah, fushah_arab, contoh)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  await db.run("BEGIN TRANSACTION");

  let importedCount = 0;
  for (const line of lines) {
    if (!line.trim()) continue;

    const [word, amiyah_arab, indonesia, fushah, fushah_arab, contoh] =
      line.split(",");

    try {
      await insert.run(
        word.toLowerCase().trim(),
        amiyah_arab.trim(),
        indonesia.toLowerCase().trim(),
        fushah.toLowerCase().trim(),
        fushah_arab.trim(),
        contoh.toLowerCase().trim(),
      );
      importedCount++;
    } catch (error) {
      console.error(`Error importing entry "${word}":`, error);
    }
  }

  await db.run("COMMIT");
  await insert.finalize();

  console.log(
    `Successfully imported ${importedCount} dictionary entries into SQLite database`,
  );

  const count = await db.get(
    "SELECT COUNT(*) as count FROM dictionary_entries",
  );
  console.log(`Total entries in database: ${count.count}`);

  await db.close();
}

main().catch((err) => {
  console.error("Error in import process:", err);
  process.exit(1);
});
