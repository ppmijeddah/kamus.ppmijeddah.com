import { Scenario } from "@/domain/scenario";
import { apiClient } from "@/services/api/client";

export async function getAllScenarios(): Promise<Scenario[]> {
  return await apiClient.get<Scenario[]>("/api/scenarios", "force-cache");
}
