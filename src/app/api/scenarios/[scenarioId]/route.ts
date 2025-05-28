import { NextResponse } from "next/server";
import { getScenarioByUuid } from "@/services/db/scenarios";
import { transformScenarioToDomain } from "@/services/db/scenarios/transform";
import { getConversationsByScenarioId } from "@/services/db/conversations";
import { transformConversationsToDomain } from "@/services/db/conversations/transform";
import {
  Scenario,
  Conversation as DomainConversation,
} from "@/domain/scenario";

interface ScenarioDetailResponse {
  scenario: Scenario;
  conversations: DomainConversation[];
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ scenarioId: string }> },
): Promise<NextResponse<ScenarioDetailResponse | { message: string }>> {
  const { scenarioId } = await params;

  if (!scenarioId) {
    return NextResponse.json(
      { message: "Scenario ID (UUID) is required" },
      { status: 400 },
    );
  }

  try {
    const dtoScenario = await getScenarioByUuid(scenarioId);
    if (!dtoScenario) {
      return NextResponse.json(
        { message: "Scenario not found" },
        { status: 404 },
      );
    }
    if (typeof dtoScenario.id !== "number") {
      console.error("Scenario DTO is missing a valid database ID.");
      return NextResponse.json(
        { message: "Internal server error processing scenario data" },
        { status: 500 },
      );
    }
    const domainScenario = transformScenarioToDomain(dtoScenario);

    const dtoConversations = await getConversationsByScenarioId(dtoScenario.id);
    const domainConversations =
      transformConversationsToDomain(dtoConversations);

    return NextResponse.json({
      scenario: domainScenario,
      conversations: domainConversations,
    });
  } catch (error) {
    console.error(
      `Failed to fetch scenario details for UUID ${scenarioId}:`,
      error,
    );
    return NextResponse.json(
      { message: "Error fetching scenario details" },
      { status: 500 },
    );
  }
}
