import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

type DB = Awaited<ReturnType<typeof open>>;
let dbConnection: DB | null = null;

const DB_PATH = path.join(process.cwd(), "data", "dictionary.sqlite");

export async function getDb() {
  if (dbConnection) {
    return dbConnection;
  }

  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  dbConnection = db;
  return db;
}
