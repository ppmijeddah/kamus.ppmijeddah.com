import { DictionaryEntry } from "@/domain/dictionary";

type ReportableEntryData = Pick<
  DictionaryEntry,
  "indonesia" | "amiyah_arab" | "uuid"
>;

export function reportEntryViaWhatsapp(
  entryData: ReportableEntryData,
  problemDescription: string,
  suggestion?: string,
): void {
  const message = constructReportMessage(
    entryData,
    problemDescription,
    suggestion,
  );
  const whatsappNumber = "+6285156562419";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank");
  }
}

function constructReportMessage(
  entryData: ReportableEntryData,
  problemDescription: string,
  suggestion?: string,
): string {
  const messageParts = [
    "Halo, saya ingin melaporkan potensi kesalahan pada entri kamus berikut:",
    "",
    `Kata Indonesia: ${entryData.indonesia}`,
    `Kata Amiyah (Arab): ${entryData.amiyah_arab}`,
    `ID Entri: ${entryData.uuid}`,
    "",
    "Mohon jelaskan kesalahannya di sini:",
    problemDescription,
  ];

  if (suggestion && suggestion.trim() !== "") {
    messageParts.push("", "Jika ada, saran perbaikan (opsional):", suggestion);
  }

  messageParts.push("", "Terima kasih!");
  return messageParts.join("\n");
}
