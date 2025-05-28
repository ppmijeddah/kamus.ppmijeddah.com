import ScenarioDetailPageContainer from "@/modules/scenario/components/scenario-detail-page-container";
import { getScenarioDetailsByUuid } from "@/modules/scenario/api/scenarios";
import { notFound } from "next/navigation";

interface ScenarioDetailPageProps {
  params: Promise<{
    scenarioId: string;
  }>;
}

export default async function ScenarioDetailPage({
  params,
}: ScenarioDetailPageProps) {
  const { scenarioId } = await params;

  try {
    const scenarioData = await getScenarioDetailsByUuid(scenarioId);

    return (
      <ScenarioDetailPageContainer
        scenario={scenarioData.scenario}
        conversations={scenarioData.conversations}
      />
    );
  } catch (error) {
    console.error(`Failed to load scenario details for ${scenarioId}:`, error);

    if (error instanceof Error) {
      if (error.message.includes("404")) {
        notFound();
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}
