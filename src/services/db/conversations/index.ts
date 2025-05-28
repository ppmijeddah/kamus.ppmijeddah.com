import { getDb } from "@/lib/sqlite";
import { DTO_Conversation } from "./dto";

export async function getConversationsByScenarioId(
  scenarioId: number,
): Promise<DTO_Conversation[]> {
  const db = await getDb();
  const conversations = await db.all<DTO_Conversation[]>(
    `
        SELECT
          id,
          uuid,
          title,
          description
        FROM conversations
        WHERE scenario_id = ?
      `,
    scenarioId,
  );
  return conversations;
}

export async function getConversationByUuid(
  uuid: string,
): Promise<DTO_Conversation | null> {
  const db = await getDb();
  const conversation = await db.get<DTO_Conversation>(
    `
    SELECT
      id,
      uuid,
      title,
      description
    FROM conversations
    WHERE uuid = ?
  `,
    uuid,
  );
  return conversation || null;
}
