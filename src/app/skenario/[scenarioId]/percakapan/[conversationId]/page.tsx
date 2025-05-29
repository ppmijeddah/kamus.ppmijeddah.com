import ConversationPageContainer from "@/modules/scenario/components/conversation-page-container";
import {
  getAllScenarios,
  getConversationDetailsByUuid,
  getScenarioDetailsByUuid,
} from "@/modules/scenario/api/scenarios";
import { notFound } from "next/navigation";
import { Scenario } from "@/domain/scenario";

interface ConversationPageProps {
  params: Promise<{
    scenarioId: string;
    conversationId: string;
  }>;
}

export const dynamic = "error";

type ParamsList = Array<{ scenarioId: string; conversationId: string }>;
export async function generateStaticParams(): Promise<ParamsList> {
  const allScenarios: Scenario[] = await getAllScenarios();

  const scenarioDetailsPromises = allScenarios.map(async (scenario) => {
    try {
      const scenarioData = await getScenarioDetailsByUuid(scenario.uuid);
      return scenarioData.conversations.map((conversation) => ({
        scenarioId: scenario.uuid,
        conversationId: conversation.uuid,
      }));
    } catch (error) {
      console.error(
        `Failed to generate static params for scenario ${scenario.uuid}:`,
        error,
      );
      return []; // Return an empty array if fetching conversations for a scenario fails
    }
  });

  const nestedParamsArrays = await Promise.all(scenarioDetailsPromises);
  return nestedParamsArrays.flat();
}

export default async function ConversationPage({
  params,
}: ConversationPageProps) {
  const { scenarioId, conversationId } = await params;

  try {
    const conversationData = await getConversationDetailsByUuid(conversationId);

    if (!conversationData || !conversationData.conversation) {
      notFound();
    }

    return (
      <ConversationPageContainer
        conversation={conversationData.conversation}
        scenarioUuid={scenarioId}
        sentences={conversationData.sentences}
      />
    );
  } catch (error) {
    console.error(
      `Failed to load conversation details for ${conversationId}:`,
      error,
    );

    if (error instanceof Error && error.message.includes("404")) {
      notFound();
    }
    throw error;
  }
}
