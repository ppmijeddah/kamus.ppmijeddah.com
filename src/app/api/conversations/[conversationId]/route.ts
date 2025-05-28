import { NextResponse } from "next/server";
import { getConversationByUuid } from "@/services/db/conversations";
import { transformConversationToDomain } from "@/services/db/conversations/transform";
import { getSentencesByConversationId } from "@/services/db/sentences";
import { transformSentencesToDomain } from "@/services/db/sentences/transform";
import {
  Conversation as DomainConversation,
  Sentence as DomainSentence,
} from "@/domain/scenario";

interface ConversationDetailResponse {
  conversation: DomainConversation;
  sentences: DomainSentence[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ conversationId: string }> },
): Promise<NextResponse<ConversationDetailResponse | { message: string }>> {
  const { conversationId } = await params;

  if (!conversationId) {
    return NextResponse.json(
      { message: "Conversation ID (UUID) is required" },
      { status: 400 },
    );
  }

  try {
    const dtoConversation = await getConversationByUuid(conversationId);

    if (!dtoConversation) {
      return NextResponse.json(
        { message: "Conversation not found" },
        { status: 404 },
      );
    }

    if (typeof dtoConversation.id !== "number") {
      console.error("Conversation DTO is missing a valid database ID.");
      return NextResponse.json(
        { message: "Internal server error processing conversation data" },
        { status: 500 },
      );
    }

    const domainConversation = transformConversationToDomain(dtoConversation);

    const dtoSentences = await getSentencesByConversationId(dtoConversation.id);
    const domainSentences = transformSentencesToDomain(dtoSentences);

    return NextResponse.json({
      conversation: domainConversation,
      sentences: domainSentences,
    });
  } catch (error) {
    console.error(
      `Failed to fetch conversation details for UUID ${conversationId}:`,
      error,
    );
    return NextResponse.json(
      { message: "Error fetching conversation details" },
      { status: 500 },
    );
  }
}
