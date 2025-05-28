import { Scenario, Conversation, Sentence } from "@/domain/scenario";
import { apiClient } from "@/services/api/client";

export async function getAllScenarios(): Promise<Scenario[]> {
  return await apiClient.get<Scenario[]>("/api/scenarios");
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
  );
}

export interface ConversationDetailData {
  conversation: Conversation;
  sentences: Sentence[];
}

export async function getConversationDetailsByUuid(
  conversationUuid: string,
): Promise<ConversationDetailData> {
  return await apiClient.get<ConversationDetailData>(
    `/api/conversations/${conversationUuid}`,
  );
}
