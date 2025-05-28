import { Scenario } from "@/domain/scenario";
import { DTO_Scenario } from "./dto";

export function transformScenarioToDomain(dto: DTO_Scenario): Scenario {
  return {
    uuid: dto.uuid,
    title: dto.title,
    description: dto.description || "",
    importanceRank: dto.importance_rank,
  };
}

export function transformScenariosToDomain(dtos: DTO_Scenario[]): Scenario[] {
  return dtos.map(transformScenarioToDomain);
}
