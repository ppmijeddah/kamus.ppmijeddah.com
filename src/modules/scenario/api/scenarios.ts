import { Scenario, Conversation } from "@/domain/scenario";
import { apiClient } from "@/services/api/client";

export async function getAllScenarios(): Promise<Scenario[]> {
  return await apiClient.get<Scenario[]>("/api/scenarios", "force-cache");
}

export interface ScenarioDetailData {
  scenario: Scenario;
  conversations: Conversation[];
}

export async function getScenarioDetailsByUuid(
  scenarioUuid: string,
): Promise<ScenarioDetailData> {
  return await apiClient.get<ScenarioDetailData>(
    `/api/scenarios/${scenarioUuid}`,
    "force-cache",
  );
}
