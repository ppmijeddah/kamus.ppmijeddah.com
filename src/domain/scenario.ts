export interface Scenario {
  uuid: string;
  title: string;
  description: string;
  importance_rank?: number;
}

export interface Conversation {
  uuid: string;
  scenario_uuid?: string;
  title: string;
  description?: string;
}

export interface Sentence {
  uuid: string;
  speaker: string;
  amiyah_text_transliteration: string;
  amiyah_text_arab?: string;
  translation_bahasa: string;
  order_in_conversation: number;
}
