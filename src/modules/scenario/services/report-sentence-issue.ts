import { Sentence } from "@/domain/scenario";

export interface ReportableSentenceData {
  sentence: Sentence;
  problemDescription: string;
  suggestion?: string;
  scenarioUuid: string;
  conversationUuid: string;
}

function constructSentenceReportMessage(data: ReportableSentenceData): string {
  const {
    sentence,
    problemDescription,
    suggestion,
    scenarioUuid,
    conversationUuid,
  } = data;
  const messageParts = [
    "Halo, saya ingin melaporkan potensi kesalahan pada kalimat dalam percakapan:",
    "",
    `Skenario ID: ${scenarioUuid}`,
    `Percakapan ID: ${conversationUuid}`,
    `Kalimat ID: ${sentence.uuid}`,
    `Pembicara: ${sentence.speaker}`,
    `Teks Amiyah (Transliterasi): ${sentence.amiyahTextTransliteration}`,
    `Teks Amiyah (Arab): ${sentence.amiyahTextArab}`,
    `Terjemahan (Bahasa): ${sentence.translationBahasa}`,
    "",
    "Deskripsi Masalah:",
    problemDescription,
  ];

  if (suggestion) {
    messageParts.push("", "Saran Perbaikan (Opsional):", suggestion);
  }

  messageParts.push("", "--------------------", "Terima kasih!");
  return messageParts.join("\n");
}

export function reportSentenceIssueViaWhatsapp(
  data: ReportableSentenceData,
): void {
  const message = constructSentenceReportMessage(data);
  const whatsappNumber = "+6285156562419"; // Same number as dictionary reports
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank");
  }
}
