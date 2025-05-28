/* eslint-disable @typescript-eslint/no-require-imports */
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const DB_PATH = path.join(process.cwd(), "data", "dictionary.sqlite");
const CATEGORY_CSV_PATH = path.join(process.cwd(), "data", "category.csv");
const DICTIONARY_ENTRIES_CSV_PATH = path.join(
  process.cwd(),
  "data",
  "dictionary-with-uuid.csv",
);
const SCENARIO_TSV_PATH = path.join(process.cwd(), "data", "scenario.tsv");
const CONVERSATION_TSV_PATH = path.join(
  process.cwd(),
  "data",
  "conversation.tsv",
);

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
      uuid TEXT NOT NULL UNIQUE,
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

    CREATE TABLE IF NOT EXISTS scenarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      importance_rank INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      scenario_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (scenario_id) REFERENCES scenarios(id)
    );

    CREATE TABLE IF NOT EXISTS sentences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      conversation_id INTEGER NOT NULL,
      speaker TEXT,
      amiyah_text_arab TEXT,
      amiyah_text_transliteration TEXT,
      translation_bahasa TEXT,
      order_in_conversation INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id)
    );

    CREATE INDEX IF NOT EXISTS idx_uuid ON dictionary_entries(uuid);
    CREATE INDEX IF NOT EXISTS idx_indonesia ON dictionary_entries(indonesia COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_amiyah ON dictionary_entries(amiyah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_fushah ON dictionary_entries(fushah COLLATE NOCASE);
    CREATE INDEX IF NOT EXISTS idx_category_id ON dictionary_entries(category_id);

    CREATE INDEX IF NOT EXISTS idx_scenario_uuid ON scenarios(uuid);
    CREATE INDEX IF NOT EXISTS idx_conversation_uuid ON conversations(uuid);
    CREATE INDEX IF NOT EXISTS idx_sentence_uuid ON sentences(uuid);
    CREATE INDEX IF NOT EXISTS idx_conversation_scenario_id ON conversations(scenario_id);
    CREATE INDEX IF NOT EXISTS idx_sentence_conversation_id ON sentences(conversation_id);
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
    console.log("Loading dictionary entries data...");
    await loadDictionaryData(db);
  } else {
    console.log(
      `Database already contains ${entryCount.count} dictionary entries.`,
    );
  }

  const scenarioCount = await db.get("SELECT COUNT(*) as count FROM scenarios");
  if (scenarioCount.count === 0) {
    console.log("Loading scenarios data...");
    await loadScenariosData(db);
  } else {
    console.log(`Database already contains ${scenarioCount.count} scenarios.`);
  }

  const conversationCount = await db.get(
    "SELECT COUNT(*) as count FROM conversations",
  );
  const sentenceCount = await db.get("SELECT COUNT(*) as count FROM sentences");
  if (conversationCount.count === 0 && sentenceCount.count === 0) {
    console.log("Loading conversations and sentences data...");
    await loadConversationsAndSentencesData(db);
  } else {
    console.log(
      `Database already contains ${conversationCount.count} conversations and ${sentenceCount.count} sentences.`,
    );
  }

  await printDatabase(db);
}

async function loadCategoriesData(db) {
  try {
    const csvData = await fs.readFile(CATEGORY_CSV_PATH, "utf8");

    const lines = csvData.split(/\r?\n/);
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
    throw new Error(`Failed to load categories data: ${error.message}`);
  }
}

async function loadDictionaryData(db) {
  try {
    const categories = await db.all("SELECT id, name FROM categories");
    const categoryMap = new Map();
    categories.forEach((category) => {
      categoryMap.set(category.name.toLowerCase().trim(), category.id);
    });

    const csvData = await fs.readFile(DICTIONARY_ENTRIES_CSV_PATH, "utf8");

    const lines = csvData.split(/\r?\n/);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0];

    await db.run("BEGIN TRANSACTION");
    const insert = await db.prepare(`
      INSERT INTO dictionary_entries (
        uuid, indonesia, amiyah, amiyah_arab, fushah, fushah_arab, category_id, example
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let importedCount = 0;
    let entriesWithoutCategory = 0;
    let unknownCategories = new Set();
    let invalidUuidCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const [
        uuid,
        indonesia,
        amiyah,
        amiyah_arab,
        fushah,
        fushah_arab,
        categoryName,
        example,
      ] = line.split(",");

      if (!uuid || !uuid.trim()) {
        console.warn(`Skipping line due to missing UUID: ${line}`);
        invalidUuidCount++;
        continue;
      }
      if (uuid.trim().length !== 36) {
        console.warn(
          `Skipping line due to potentially invalid UUID format: ${uuid.trim()} in line: ${line}`,
        );
        invalidUuidCount++;
        continue;
      }

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
          uuid.trim(),
          indonesia.toLowerCase().trim(),
          amiyah?.trim() || "",
          amiyah_arab?.trim() || "",
          fushah?.toLowerCase().trim() || "",
          fushah_arab?.trim() || "",
          categoryId,
          example?.trim() || "",
        );
        importedCount++;
      }
    }
    await db.run("COMMIT");
    await insert.finalize();
    console.log(`Loaded ${importedCount} dictionary entries into database`);
    if (invalidUuidCount > 0) {
      console.warn(
        `${invalidUuidCount} lines were skipped due to missing or invalid UUIDs.`,
      );
    }
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
    throw new Error(`Failed to load dictionary data: ${error.message}`);
  }
}

async function loadScenariosData(db) {
  try {
    const tsvData = await fs.readFile(SCENARIO_TSV_PATH, "utf8");
    const lines = tsvData.split(/\r?\n/);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0]; // "Nama\tDeskripsi\tRank"

    await db.run("BEGIN TRANSACTION");
    const insert = await db.prepare(`
      INSERT INTO scenarios (uuid, title, description, importance_rank)
      VALUES (?, ?, ?, ?)
    `);

    let importedCount = 0;
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const [name, description, rank] = line.split("\t"); // Updated delimiter
      if (name && description && rank) {
        await insert.run(
          uuidv4(),
          name.trim(),
          description.trim(),
          parseInt(rank.trim(), 10),
        );
        importedCount++;
      }
    }
    await db.run("COMMIT");
    await insert.finalize();
    console.log(`Loaded ${importedCount} scenarios into database`);
  } catch (error) {
    console.error("Error loading scenarios data:", error);
    try {
      await db.run("ROLLBACK");
    } catch (e) {
      console.error("Error rolling back transaction:", e);
    }
    throw new Error(`Failed to load scenarios data: ${error.message}`);
  }
}

async function loadConversationsAndSentencesData(db) {
  try {
    // Load scenarios into a map for quick lookup
    const scenarios = await db.all("SELECT id, title FROM scenarios");
    const scenarioMap = new Map();
    scenarios.forEach((scenario) => {
      scenarioMap.set(scenario.title.trim(), scenario.id);
    });

    if (scenarioMap.size === 0) {
      console.warn(
        "No scenarios found in the database. Cannot link conversations. Please load scenarios first.",
      );
      return;
    }

    const tsvData = await fs.readFile(CONVERSATION_TSV_PATH, "utf8");
    const lines = tsvData.split(/\r?\n/);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const header = lines[0];

    // Group sentences by conversation title
    const conversationsData = new Map();
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const [
        convoTitle,
        scenarioName,
        order,
        speaker,
        indonesia,
        amiyah,
        amiyahArab,
      ] = line.split("\t");

      if (!convoTitle || !scenarioName) {
        console.warn(
          `Skipping line due to missing conversation title or scenario name: ${line}`,
        );
        continue;
      }

      const sentence = {
        order: parseInt(order.trim(), 10),
        speaker: speaker.trim(),
        indonesia: indonesia.trim(),
        amiyah: amiyah.trim(),
        amiyahArab: amiyahArab.trim(),
      };

      if (!conversationsData.has(convoTitle.trim())) {
        conversationsData.set(convoTitle.trim(), {
          scenarioName: scenarioName.trim(),
          sentences: [],
        });
      }
      conversationsData.get(convoTitle.trim()).sentences.push(sentence);
    }

    await db.run("BEGIN TRANSACTION");
    const insertConversation = await db.prepare(`
      INSERT INTO conversations (uuid, scenario_id, title, description)
      VALUES (?, ?, ?, ?)
    `);
    const insertSentence = await db.prepare(`
      INSERT INTO sentences (uuid, conversation_id, speaker, amiyah_text_transliteration, amiyah_text_arab, translation_bahasa, order_in_conversation)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    let importedConversations = 0;
    let importedSentences = 0;
    let unknownScenarios = new Set();

    for (const [convoTitle, data] of conversationsData) {
      const scenarioId = scenarioMap.get(data.scenarioName);
      if (!scenarioId) {
        unknownScenarios.add(data.scenarioName);
        console.warn(
          `Unknown scenario "${data.scenarioName}" for conversation "${convoTitle}". Skipping this conversation.`,
        );
        continue;
      }

      const conversationUuid = uuidv4();
      const result = await insertConversation.run(
        conversationUuid,
        scenarioId,
        convoTitle,
        "", // TODO: maybe add description to conversation
      );
      const conversationDbId = result.lastID;
      importedConversations++;

      data.sentences.sort((a, b) => a.order - b.order); // Ensure sentences are ordered correctly

      for (const sentence of data.sentences) {
        await insertSentence.run(
          uuidv4(),
          conversationDbId,
          sentence.speaker,
          sentence.amiyah,
          sentence.amiyahArab,
          sentence.indonesia,
          sentence.order,
        );
        importedSentences++;
      }
    }

    await db.run("COMMIT");
    await insertConversation.finalize();
    await insertSentence.finalize();

    console.log(`Loaded ${importedConversations} conversations into database`);
    console.log(`Loaded ${importedSentences} sentences into database`);
    if (unknownScenarios.size > 0) {
      console.warn(
        `Could not find the following scenarios in the database: ${Array.from(unknownScenarios).join(", ")}`,
      );
    }
  } catch (error) {
    console.error("Error loading conversations and sentences data:", error);
    try {
      await db.run("ROLLBACK");
    } catch (e) {
      console.error("Error rolling back transaction:", e);
    }
    throw new Error(
      `Failed to load conversations and sentences data: ${error.message}`,
    );
  }
}

async function printDatabase(db) {
  const tables = [
    "categories",
    "dictionary_entries",
    "scenarios",
    "conversations",
    "sentences",
  ];

  for (const table of tables) {
    try {
      const count = await db.get(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`\nTotal entries in ${table}: ${count.count}`);

      const schema = await db.all(`PRAGMA table_info(${table})`);
      console.log(`\n${table} table columns:`);
      schema.forEach((column) => {
        console.log(
          `- ${column.name} (${column.type}${column.notnull ? ", NOT NULL" : ""}${column.pk ? ", PRIMARY KEY" : ""})`,
        );
      });
    } catch (err) {
      // If a table doesn't exist yet (e.g. during initial setup before all tables are created),
      // PRAGMA table_info might fail. This is okay for this informational function.
      if (err.message.includes("no such table")) {
        console.log(`\nTable ${table} does not exist yet.`);
      } else {
        console.error(`Error printing info for table ${table}:`, err);
      }
    }
  }
}
