"use client";

import React from "react";
import Link from "next/link";
import { FadeTransition } from "@/services/animation";

interface SentenceData {
  uuid: string;
  speaker: string;
  amiyah_text_transliteration: string;
  amiyah_text_arab?: string;
  translation_bahasa: string;
  order_in_conversation: number;
}

export default function ConversationPageContainer(
  {
    /* conversation, sentences, scenarioUuid */
  } /*: ConversationPageContainerProps*/,
) {
  const placeholderScenarioUuid = "memesan-dan-mengarahkan-taksi";
  const placeholderConversationUuid = "dialog-taksi-hotel-alhamra-negosiasi";

  const placeholderConversation = {
    uuid: placeholderConversationUuid,
    title: "Dialog Taksi ke Hotel Al-Hamra (dengan negosiasi)",
    description:
      "Contoh percakapan memesan taksi dengan proses negosiasi harga dan memberikan arahan.",
  };

  const placeholderSentences: SentenceData[] = [
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
    <FadeTransition>
      <div className="p-4 md:px-8 md:py-6 space-y-10 not-prose">
        <div className="mb-6 space-y-3 md:mb-8">
          <Link
            href={`/skenario/${placeholderScenarioUuid}`}
            className="text-sm text-pacamara-secondary hover:underline mb-2 inline-block"
          >
            &larr; Kembali ke Daftar Percakapan
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {placeholderConversation.title}
            </h1>
            {placeholderConversation.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {placeholderConversation.description}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {placeholderSentences.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Percakapan ini belum memiliki dialog.
              </p>
            </div>
          ) : (
            placeholderSentences
              .sort((a, b) => a.order_in_conversation - b.order_in_conversation)
              .map((sentence) => (
                <div
                  key={sentence.uuid}
                  className={`flex ${
                    sentence.speaker === "Anda"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {sentence.speaker === "Anda" ? (
                    <UserBubble sentence={sentence} />
                  ) : (
                    <OtherSpeakerBubble sentence={sentence} />
                  )}
                </div>
              ))
          )}
        </div>
      </div>
    </FadeTransition>
  );
}

interface BubbleProps {
  sentence: SentenceData;
}

function UserBubble({ sentence }: BubbleProps): React.ReactElement {
  return (
    <div className="max-w-lg p-2.5 rounded-lg shadow-md bg-pacamara-primary text-white rounded-br-none">
      <p className="text-xs font-semibold mb-0.5 text-right text-pacamara-accent-light opacity-90">
        {sentence.speaker}
      </p>
      <p className="text-base mb-0.5">{sentence.amiyah_text_transliteration}</p>
      <p className="text-base font-arabic text-right">
        {sentence.amiyah_text_arab}
      </p>
      <div className="my-3 h-px bg-white/30"></div>
      <p className="text-xs text-gray-200 opacity-90">
        {sentence.translation_bahasa}
      </p>
    </div>
  );
}

function OtherSpeakerBubble({ sentence }: BubbleProps): React.ReactElement {
  return (
    <div className="max-w-lg p-2.5 rounded-lg shadow-md bg-[#8F961A] dark:bg-[#4A4E0D] text-white rounded-bl-none">
      <p className="text-xs font-semibold mb-0.5 text-left text-white opacity-75">
        {sentence.speaker}
      </p>
      <p className="text-base mb-0.5">{sentence.amiyah_text_transliteration}</p>
      <p className="text-base font-arabic text-right">
        {sentence.amiyah_text_arab}
      </p>
      <div className="my-3 h-px bg-white/40 dark:bg-white/30"></div>
      <p className="text-xs text-white opacity-90">
        {sentence.translation_bahasa}
      </p>
    </div>
  );
}
