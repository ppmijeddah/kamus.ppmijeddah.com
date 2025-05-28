export interface Scenario {
  uuid: string;
  title: string;
  description: string;
  importanceRank: number;
}

export interface Conversation {
  uuid: string;
  scenarioUuid: string;
  title: string;
  description?: string;
}

export interface Sentence {
  uuid: string;
  speaker: string;
  amiyah_text_transliteration: string;
  amiyah_text_arab: string;
  translation_bahasa: string;
  order_in_conversation: number;
}

export function sortScenariosByImportance(scenarios: Scenario[]): Scenario[] {
  return [...scenarios].sort((a, b) => a.importanceRank - b.importanceRank);
}
