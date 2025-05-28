import ScenariosPageContainer from "@/modules/scenario/components/scenarios-page-container";
import { getAllScenarios } from "@/modules/scenario/api/scenarios";

export default async function ScenariosPage() {
  const scenarios = await getAllScenarios();

  return <ScenariosPageContainer scenarios={scenarios} />;
}
