/* eslint-disable @typescript-eslint/no-require-imports */
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const fs = require("fs/promises");

const DB_PATH = path.join(process.cwd(), "data", "dictionary.sqlite");

main();

async function main() {
  try {
    await initDb();
    console.log("Database initialized successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

async function initDb() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS dictionary_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      indonesia TEXT NOT NULL,
      amiyah TEXT NOT NULL,
      amiyah_arab TEXT NOT NULL,
      fushah TEXT NOT NULL,
      fushah_arab TEXT NOT NULL,
      category TEXT NOT NULL,
      example TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_indonesia ON dictionary_entries(indonesia COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_amiyah ON dictionary_entries(amiyah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_fushah ON dictionary_entries(fushah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_category ON dictionary_entries(category COLLATE NOCASE);
  `);

  const count = await db.get(
    "SELECT COUNT(*) as count FROM dictionary_entries",
  );
  if (count.count === 0) {
    console.log("Database is empty, loading initial dictionary data...");
    await loadDictionaryData(db);
  } else {
    console.log(`Database already contains ${count.count} entries.`);
  }
}

async function loadDictionaryData(db) {
  try {
    const csvPath = path.join(process.cwd(), "data", "dictionary.csv");
    const csvData = await fs.readFile(csvPath, "utf8");

    const lines = csvData.split("\n");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0]; // Skip header

    await db.run("BEGIN TRANSACTION");

    const insert = await db.prepare(`
      INSERT INTO dictionary_entries (indonesia, amiyah, amiyah_arab, fushah, fushah_arab, category, example)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [
        indonesia,
        amiyah,
        amiyah_arab,
        fushah,
        fushah_arab,
        category,
        example,
      ] = line.split(",");

      if (indonesia) {
        await insert.run(
          indonesia.toLowerCase().trim(),
          amiyah?.trim() || "",
          amiyah_arab?.trim() || "",
          fushah?.toLowerCase().trim() || "",
          fushah_arab?.trim() || "",
          category?.trim() || "",
          example?.trim() || "",
        );
        importedCount++;
      }
    }

    await db.run("COMMIT");
    await insert.finalize();

    console.log(`Loaded ${importedCount} dictionary entries into database`);

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
