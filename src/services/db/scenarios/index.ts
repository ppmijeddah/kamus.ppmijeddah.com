import { getDb } from "@/lib/sqlite";
import { DTO_Scenario } from "./dto";

export async function getAllScenarios(): Promise<DTO_Scenario[]> {
  const db = await getDb();
  const scenarios = await db.all<DTO_Scenario[]>(
    "SELECT uuid, title, description, importance_rank FROM scenarios",
  );
  return scenarios;
}

export async function getScenarioByUuid(
  uuid: string,
): Promise<DTO_Scenario | null> {
  const db = await getDb();
  const scenario = await db.get<DTO_Scenario>(
    "SELECT id, uuid, title, description, importance_rank FROM scenarios WHERE uuid = ?",
    uuid,
  );
  return scenario || null;
}
