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
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      rank INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS dictionary_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      indonesia TEXT NOT NULL,
      amiyah TEXT NOT NULL,
      amiyah_arab TEXT NOT NULL,
      fushah TEXT NOT NULL,
      fushah_arab TEXT NOT NULL,
      category_id INTEGER NULL,
      example TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE INDEX IF NOT EXISTS idx_indonesia ON dictionary_entries(indonesia COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_amiyah ON dictionary_entries(amiyah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_fushah ON dictionary_entries(fushah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_category_id ON dictionary_entries(category_id);
  `);

  const categoryCount = await db.get(
    "SELECT COUNT(*) as count FROM categories",
  );

  if (categoryCount.count === 0) {
    console.log("Loading categories data...");
    await loadCategoriesData(db);
  } else {
    console.log(`Database already contains ${categoryCount.count} categories.`);
  }

  const entryCount = await db.get(
    "SELECT COUNT(*) as count FROM dictionary_entries",
  );

  if (entryCount.count === 0) {
    console.log(
      "No dictionary entries found in file database, loading data...",
    );
    await loadDictionaryData(db);
  } else {
    console.log(
      `Database already contains ${entryCount.count} dictionary entries.`,
    );
  }

  await printDatabase(db);
}

async function loadCategoriesData(db) {
  try {
    const csvPath = path.join(process.cwd(), "data", "category.csv");
    const csvData = await fs.readFile(csvPath, "utf8");

    const lines = csvData.split("\n");
    // Skip header
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0];

    await db.run("BEGIN TRANSACTION");

    const insert = await db.prepare(`
      INSERT INTO categories (name, rank)
      VALUES (?, ?)
    `);

    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [name, rank] = line.split(",");

      if (name && rank) {
        await insert.run(name.trim(), parseInt(rank.trim(), 10));
        importedCount++;
      }
    }

    await db.run("COMMIT");
    await insert.finalize();

    console.log(`Loaded ${importedCount} categories into database`);
  } catch (error) {
    console.error("Error loading categories data:", error);
    try {
      await db.run("ROLLBACK");
    } catch (e) {
      console.error("Error rolling back transaction:", e);
    }
    throw new Error(`Failed to load categories data: ${error}`);
  }
}

async function loadDictionaryData(db) {
  try {
    // Load all categories into memory for quick lookups
    const categories = await db.all("SELECT id, name FROM categories");
    const categoryMap = new Map();

    categories.forEach((category) => {
      categoryMap.set(category.name.toLowerCase().trim(), category.id);
    });

    const csvPath = path.join(process.cwd(), "data", "dictionary.csv");
    const csvData = await fs.readFile(csvPath, "utf8");

    const lines = csvData.split("\n");
    // Skip header
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0];

    await db.run("BEGIN TRANSACTION");

    const insert = await db.prepare(`
      INSERT INTO dictionary_entries (
        indonesia,
        amiyah,
        amiyah_arab,
        fushah,
        fushah_arab,
        category_id,
        example
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    let importedCount = 0;
    let entriesWithoutCategory = 0;
    let unknownCategories = new Set();

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [
        indonesia,
        amiyah,
        amiyah_arab,
        fushah,
        fushah_arab,
        categoryName,
        example,
      ] = line.split(",");

      if (indonesia) {
        let categoryId = null;

        if (categoryName && categoryName.trim()) {
          const categoryKey = categoryName.toLowerCase().trim();
          categoryId = categoryMap.get(categoryKey);

          if (!categoryId) {
            unknownCategories.add(categoryName.trim());
          }
        } else {
          entriesWithoutCategory++;
        }

        await insert.run(
          indonesia.toLowerCase().trim(),
          amiyah?.trim() || "",
          amiyah_arab?.trim() || "",
          fushah?.toLowerCase().trim() || "",
          fushah_arab?.trim() || "",
          categoryId, // Will be NULL if category not found
          example?.trim() || "",
        );
        importedCount++;
      }
    }

    await db.run("COMMIT");
    await insert.finalize();

    console.log(`Loaded ${importedCount} dictionary entries into database`);
    if (entriesWithoutCategory > 0) {
      console.log(
        `${entriesWithoutCategory} entries had empty category fields`,
      );
    }
    if (unknownCategories.size > 0) {
      console.warn(`${unknownCategories.size} unknown categories found:`);
      console.warn(Array.from(unknownCategories).join(", "));
    }
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

async function printDatabase(db) {
  const count = await db.get(
    "SELECT COUNT(*) as count FROM dictionary_entries",
  );
  console.log(`Total entries in database: ${count.count}`);

  console.log("\nTable schemas:");
  const categoriesSchema = await db.all("PRAGMA table_info(categories)");
  console.log("\nCategories table columns:");
  categoriesSchema.forEach((column) => {
    console.log(
      `- ${column.name} (${column.type}${column.notnull ? ", NOT NULL" : ""}${column.pk ? ", PRIMARY KEY" : ""})`,
    );
  });
  const entriesSchema = await db.all("PRAGMA table_info(dictionary_entries)");
  console.log("\nDictionary entries table columns:");
  entriesSchema.forEach((column) => {
    console.log(
      `- ${column.name} (${column.type}${column.notnull ? ", NOT NULL" : ""}${column.pk ? ", PRIMARY KEY" : ""})`,
    );
  });
}
