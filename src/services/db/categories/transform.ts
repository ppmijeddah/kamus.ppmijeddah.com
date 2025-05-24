import { Category } from "@/domain/dictionary";
import { DTO_Category } from "./dto";

/**
 * Transform a data transfer object dictionary entry to a domain dictionary entry
 */
export function transformToDomain(dto: DTO_Category): Category {
  return dto;
}
