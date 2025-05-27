import { Scenario } from "@/domain/scenario";
import ScenariosPageContainer from "@/modules/scenario/components/scenarios-page-container";

export default function ScenariosPage() {
  const placeholderScenarios: Scenario[] = [
    {
      uuid: "memesan-taksi",
      title: "Memesan Taksi",
      description:
        "Pelajari cara memesan taksi, menyebutkan tujuan, dan berinteraksi dengan sopir.",
      importance_rank: 1,
    },
    {
      uuid: "memesan-makanan",
      title: "Memesan Makanan di Restoran",
      description:
        "Dari meminta meja hingga membayar tagihan, kuasai percakapan di restoran.",
      importance_rank: 2,
    },
    {
      uuid: "belanja-di-pasar",
      title: "Belanja di Pasar",
      description: "Pelajari tawar-menawar dan membeli barang di pasar.",
      importance_rank: 3,
    },
    {
      uuid: "menanyakan-arah",
      title: "Menanyakan Arah",
      description: "Cara bertanya dan memahami petunjuk arah.",
      importance_rank: 4,
    },
  ];

  return <ScenariosPageContainer scenarios={placeholderScenarios} />;
}
