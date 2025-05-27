import { Conversation, Sentence } from "@/domain/scenario";
import ConversationPageContainer from "@/modules/scenario/components/conversation-page-container";

export default function ConversationPage() {
  const placeholderScenarioUuid = "memesan-dan-mengarahkan-taksi";
  const placeholderConversationUuid = "dialog-taksi-hotel-alhamra-negosiasi";

  const placeholderConversation: Conversation = {
    uuid: placeholderConversationUuid,
    title: "Dialog Taksi ke Hotel Al-Hamra (dengan negosiasi)",
    description:
      "Contoh percakapan memesan taksi dengan proses negosiasi harga dan memberikan arahan.",
  };

  const placeholderSentences: Sentence[] = [
    {
      uuid: "s1",
      speaker: "Anda",
      amiyah_text_transliteration: "Marhaba",
      amiyah_text_arab: "مرحبا",
      translation_bahasa: "Halo",
      order_in_conversation: 1,
    },
    {
      uuid: "s2",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Marhaba",
      amiyah_text_arab: "مرحبا",
      translation_bahasa: "Halo",
      order_in_conversation: 2,
    },
    {
      uuid: "s3",
      speaker: "Anda",
      amiyah_text_transliteration:
        "Abghaa aruuH Funduq Al-Hamra. Bikam ujratuh?",
      amiyah_text_arab: "أَبْغَى أَرُوح فُنْدُق الحمرا. بِكَمْ أُجْرَتُهُ؟",
      translation_bahasa: "Saya mau ke Hotel Al-Hamra. Berapa ongkosnya?",
      order_in_conversation: 3,
    },
    {
      uuid: "s4",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Ila Funduq Al-Hamra, tsalaatsiin riyaal",
      amiyah_text_arab: "إِلَى فُنْدُق الحمرا، ثَلَاثِين رِيَال",
      translation_bahasa: "Ke Hotel Al-Hamra, tiga puluh riyal",
      order_in_conversation: 4,
    },
    {
      uuid: "s5",
      speaker: "Anda",
      amiyah_text_transliteration: "Waah, ghaali. ‘Isyriin riyaal mumkin?",
      amiyah_text_arab: "وَااه، غَالِي. عِشْرِين رِيَال مُمْكِن؟",
      translation_bahasa: "Wah, mahal. Dua puluh riyal bisa?",
      order_in_conversation: 5,
    },
    {
      uuid: "s6",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Aywah, ‘isyriin riyaal. Yalla ruuh!",
      amiyah_text_arab: "أَيُّوَه، عِشْرِين رِيَال. يالله روح!",
      translation_bahasa: "Oke, dua puluh riyal. Ayo berangkat!",
      order_in_conversation: 6,
    },
    {
      uuid: "s7",
      speaker: "Anda",
      amiyah_text_transliteration: "Ba'diin fii al-maydaan, luff yasaar ya",
      amiyah_text_arab: "بَعْدِين فِي الْمَيْدَان، لُفّ يَسَار يَا",
      translation_bahasa: "Nanti di bundaran, belok kiri ya",
      order_in_conversation: 7,
    },
    {
      uuid: "s8",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Aywah, luff yasaar",
      amiyah_text_arab: "أَيُّوَه، لُفّ يَسَار",
      translation_bahasa: "Oke, belok kiri",
      order_in_conversation: 8,
    },
    {
      uuid: "s9",
      speaker: "Anda",
      amiyah_text_transliteration: "Imsyi thawali ila talāqi masjid kabiir",
      amiyah_text_arab: "اِمْشِي طَوَالِي إِلَى تِلَاقِي مَسْجِد كَبِير",
      translation_bahasa: "Terus saja sampai ketemu masjid besar",
      order_in_conversation: 9,
    },
    {
      uuid: "s10",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Masjid kabiir, ya?",
      amiyah_text_arab: "مَسْجِد كَبِير، يَا؟",
      translation_bahasa: "Masjid besar, ya?",
      order_in_conversation: 10,
    },
    {
      uuid: "s11",
      speaker: "Anda",
      amiyah_text_transliteration:
        "Aywah, ba'da kadha al-funduq 'ala al-yamiin",
      amiyah_text_arab: "أَيُّوَه، بَعْد كَدَا الْفُنْدُق عَلَى الْيَمِين",
      translation_bahasa: "Ya, setelah itu hotelnya di sebelah kanan",
      order_in_conversation: 11,
    },
    {
      uuid: "s12",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Aywah, shūf al-funduq. Qif hinaa?",
      amiyah_text_arab: "أَيُّوَه، شُوفْ الْفُنْدُق. قِفْ هِنَا؟",
      translation_bahasa: "Oke, saya lihat hotelnya. Berhenti di sini?",
      order_in_conversation: 12,
    },
    {
      uuid: "s13",
      speaker: "Anda",
      amiyah_text_transliteration:
        "Aywah, qif hinaa. Haadza al-fuluus, ‘isyriin riyaal.",
      amiyah_text_arab:
        "أَيُّوَه، قِفْ هِنَا. هَذَا الْفُلُوس، عِشْرِين رِيَال.",
      translation_bahasa: "Ya, berhenti di sini. Ini uangnya, dua puluh riyal.",
      order_in_conversation: 13,
    },
    {
      uuid: "s14",
      speaker: "Sopir Taksi",
      amiyah_text_transliteration: "Syukron",
      amiyah_text_arab: "شُكْرًا",
      translation_bahasa: "Terima kasih",
      order_in_conversation: 14,
    },
    {
      uuid: "s15",
      speaker: "Anda",
      amiyah_text_transliteration: "Afwan",
      amiyah_text_arab: "عَفْوًا",
      translation_bahasa: "Sama-sama",
      order_in_conversation: 15,
    },
  ];

  return (
    <ConversationPageContainer
      conversation={placeholderConversation}
      scenarioUuid={placeholderScenarioUuid}
      sentences={placeholderSentences}
    />
  );
}
