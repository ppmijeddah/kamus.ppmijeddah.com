import { Scenario, Conversation, Sentence } from "@/domain/scenario";
import { apiClient } from "@/services/api/client";

export async function getAllScenarios(): Promise<Scenario[]> {
  return await apiClient.get<Scenario[]>("/api/scenarios", "force-cache", {
    // revalidate every one day
    revalidate: 86400,
  });
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
    {
      // revalidate every one day
      revalidate: 86400,
    },
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
    "force-cache",
    {
      // revalidate every one day
      revalidate: 86400,
    },
  );
}
