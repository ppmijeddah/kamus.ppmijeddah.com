export interface Scenario {
  uuid: string;
  title: string;
  description: string;
  importanceRank: number;
}

export interface Conversation {
  uuid: string;
  title: string;
  description?: string;
}

export interface Sentence {
  uuid: string;
  speaker: string;
  amiyahTextTransliteration: string;
  amiyahTextArab: string;
  translationBahasa: string;
  orderInConversation: number;
}

export function sortScenariosByImportance(scenarios: Scenario[]): Scenario[] {
  return [...scenarios].sort((a, b) => a.importanceRank - b.importanceRank);
}
