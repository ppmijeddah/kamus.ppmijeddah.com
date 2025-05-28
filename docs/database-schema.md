CREATE TABLE categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      rank INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE dictionary_entries (
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
CREATE TABLE scenarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      importance_rank INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
CREATE TABLE conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      scenario_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (scenario_id) REFERENCES scenarios(id)
    );
CREATE TABLE sentences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL UNIQUE,
      conversation_id INTEGER NOT NULL,
      speaker TEXT NOT NULL,
      amiyah_text_arab TEXT NOT NULL,
      amiyah_text_transliteration TEXT NOT NULL,
      translation_bahasa TEXT NOT NULL,
      order_in_conversation INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id)
    );
CREATE INDEX idx_uuid ON dictionary_entries(uuid);
CREATE INDEX idx_indonesia ON dictionary_entries(indonesia COLLATE NOCASE);
CREATE INDEX idx_amiyah ON dictionary_entries(amiyah COLLATE NOCASE);
CREATE INDEX idx_fushah ON dictionary_entries(fushah COLLATE NOCASE);
CREATE INDEX idx_category_id ON dictionary_entries(category_id);
CREATE INDEX idx_scenario_uuid ON scenarios(uuid);
CREATE INDEX idx_conversation_uuid ON conversations(uuid);
CREATE INDEX idx_sentence_uuid ON sentences(uuid);
CREATE INDEX idx_conversation_scenario_id ON conversations(scenario_id);
CREATE INDEX idx_sentence_conversation_id ON sentences(conversation_id);
