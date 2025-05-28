import ConversationPageContainer from "@/modules/scenario/components/conversation-page-container";
import { getConversationDetailsByUuid } from "@/modules/scenario/api/scenarios";
import { notFound } from "next/navigation";

interface ConversationPageProps {
  params: Promise<{
    scenarioId: string;
    conversationId: string;
  }>;
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
