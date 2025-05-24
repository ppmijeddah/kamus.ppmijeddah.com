import { DictionaryEntry } from "@/domain/dictionary";

type ReportableEntryData = Pick<
  DictionaryEntry,
  "indonesia" | "amiyah_arab" | "uuid"
>;

function constructReportMessage(entryData: ReportableEntryData): string {
  const messageParts = [
    "Halo, saya ingin melaporkan potensi kesalahan pada entri kamus berikut:",
    "",
    `Kata Indonesia: ${entryData.indonesia}`,
    `Kata Amiyah (Arab): ${entryData.amiyah_arab}`,
    `ID Entri: ${entryData.uuid}`,
    "",
    "Mohon jelaskan kesalahannya di sini:",
    "[Silakan ketik di sini]",
    "",
    "Jika ada, saran perbaikan (opsional):",
    "[Silakan ketik di sini]",
    "",
    "Terima kasih!",
  ];
  return messageParts.join("\n");
}

export function reportEntryViaWhatsapp(entryData: ReportableEntryData): void {
  const message = constructReportMessage(entryData);
  const whatsappNumber = "+6285156562419";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank");
  }
}
