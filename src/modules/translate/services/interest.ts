export interface SendWhatsappMessage {
  email: string;
  useCase?: string;
}

export function sendWhatsappMessage(args: SendWhatsappMessage) {
  const whatsappNumber = "+6285156562419";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${constructWhatsappMessage(args)}`;
  window.open(whatsappUrl, "_blank");
}

interface ConstructWhatsappMessage {
  email: string;
  useCase?: string;
}

function constructWhatsappMessage(args: ConstructWhatsappMessage) {
  const { email, useCase } = args;

  let message = `Halo, saya tertarik dengan penerjemah AI Indo <> Arab Saudi Amiyah.\n\n`;
  message += `Email: ${email}\n`;
  if (useCase) {
    message += `Kebutuhan Terjemahan: ${useCase}\n`;
  }
  message += `\nTolong beri saya notifikasi saat fitur ini diluncurkan. Terima kasih!`;

  return encodeURIComponent(message);
}
