import { getDb } from "@/lib/sqlite";
import { DTO_Conversation } from "./dto";

export async function getConversationsByScenarioId(
  scenarioId: number,
): Promise<DTO_Conversation[]> {
  const db = await getDb();
  const conversations = await db.all<DTO_Conversation[]>(
    `
        SELECT
          c.uuid,
          c.title,
          c.description,
          s.uuid as scenario_uuid
        FROM conversations c
        JOIN scenarios s ON c.scenario_id = s.id
        WHERE c.scenario_id = ?
        ORDER BY c.id ASC
      `,
    scenarioId,
  );
  return conversations;
}
