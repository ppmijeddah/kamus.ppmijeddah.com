import { Sentence } from "@/domain/scenario";
import { DTO_Sentence } from "./dto";

export function transformSentenceToDomain(dto: DTO_Sentence): Sentence {
  return {
    uuid: dto.uuid,
    speaker: dto.speaker,
    amiyahTextTransliteration: dto.amiyah_text_transliteration,
    amiyahTextArab: dto.amiyah_text_arab,
    translationBahasa: dto.translation_bahasa,
    orderInConversation: dto.order_in_conversation,
  };
}

export function transformSentencesToDomain(dtos: DTO_Sentence[]): Sentence[] {
  return dtos.map(transformSentenceToDomain);
}
