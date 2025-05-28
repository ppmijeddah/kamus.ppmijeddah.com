import { Conversation, Scenario } from "@/domain/scenario";
import ScenarioDetailPageContainer from "@/modules/scenario/components/scenario-detail-page-container";

export default function ScenarioDetailPage() {
  const placeholderScenario: Scenario = {
    uuid: "memesan-taksi",
    title: "Skenario: Memesan Taksi",
    description:
      "Pelajari cara memesan taksi, menyebutkan tujuan, dan berinteraksi dengan sopir.",
    importanceRank: 1,
  };

  const placeholderConversations: Conversation[] = [
    {
      uuid: "dialog-1-taksi-pemula",
      title: "Dialog 1: Pemesanan Dasar Taksi",
      description: "Percakapan singkat untuk memesan taksi ke tujuan umum.",
      scenario_uuid: "memesan-taksi",
    },
    {
      uuid: "dialog-2-taksi-bandara",
      title: "Dialog 2: Taksi ke Bandara dengan Detail",
      description:
        "Percakapan lebih lanjut, termasuk menanyakan perkiraan biaya dan waktu.",
      scenario_uuid: "memesan-taksi",
    },
  ];

  return (
    <ScenarioDetailPageContainer
      scenario={placeholderScenario}
      conversations={placeholderConversations}
    />
  );
}
