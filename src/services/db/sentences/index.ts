import { getDb } from "@/lib/sqlite";
import { DTO_Sentence } from "./dto";

export async function getSentencesByConversationId(
  conversationId: number,
): Promise<DTO_Sentence[]> {
  const db = await getDb();
  const sentences = await db.all<DTO_Sentence[]>(
    `
    SELECT
      id,
      uuid,
      conversation_id,
      speaker,
      amiyah_text_arab,
      amiyah_text_transliteration,
      translation_bahasa,
      order_in_conversation,
      created_at
    FROM sentences
    WHERE conversation_id = ?
    ORDER BY order_in_conversation ASC
  `,
    conversationId,
  );
  return sentences;
}
