import { Scenario } from "@/domain/scenario";
import ScenariosPageContainer from "@/modules/scenario/components/scenarios-page-container";

export default function ScenariosPage() {
  const placeholderScenarios: Scenario[] = [
    {
      uuid: "memesan-taksi",
      title: "Skenario 1: Memesan Taksi",
      description:
        "Pelajari cara memesan taksi, menyebutkan tujuan, dan berinteraksi dengan sopir.",
    },
    {
      uuid: "memesan-makanan",
      title: "Skenario 2: Memesan Makanan di Restoran",
      description:
        "Dari meminta meja hingga membayar tagihan, kuasai percakapan di restoran.",
    },
  ];

  return <ScenariosPageContainer scenarios={placeholderScenarios} />;
}
