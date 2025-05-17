import { DTO_DictionaryEntry } from "./dto";
import { DictionaryEntry } from "../../../domain/dictionary";

/**
 * Transform a data transfer object dictionary entry to a domain dictionary entry
 */
export function transformToDomain(dto: DTO_DictionaryEntry): DictionaryEntry {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, ...domainEntry } = dto;
  return domainEntry;
}
