import { Conversation } from "@/domain/scenario";
import { DTO_Conversation } from "./dto";

export function transformConversationToDomain(
  dto: DTO_Conversation,
): Conversation {
  return {
    uuid: dto.uuid,
    title: dto.title,
    description: dto.description,
  };
}

export function transformConversationsToDomain(
  dtos: DTO_Conversation[],
): Conversation[] {
  return dtos.map(transformConversationToDomain);
}
