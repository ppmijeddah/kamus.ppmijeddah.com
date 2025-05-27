"use client";

import React from "react";
import Link from "next/link";
import { FadeTransition } from "@/services/animation";
import { ChevronRight, MessageSquareText } from "lucide-react";
// import { Scenario, Conversation } from "@/modules/formula/domain";

// interface ScenarioDetailPageContainerProps {
//   scenario: Scenario; // Or scenarioId/uuid to fetch details
//   conversations: Conversation[];
// }

export default function ScenarioDetailPageContainer(
  {
    /* scenario, conversations */
  } /*: ScenarioDetailPageContainerProps*/,
) {
  const placeholderScenario = {
    uuid: "memesan-taksi",
    title: "Skenario: Memesan Taksi",
    description:
      "Pelajari cara memesan taksi, menyebutkan tujuan, dan berinteraksi dengan sopir.",
  };

  const placeholderConversations = [
    {
      uuid: "dialog-1-taksi-pemula",
      title: "Dialog 1: Pemesanan Dasar Taksi",
      description: "Percakapan singkat untuk memesan taksi ke tujuan umum.",
      // scenario_id: "memesan-taksi"
    },
    {
      uuid: "dialog-2-taksi-bandara",
      title: "Dialog 2: Taksi ke Bandara dengan Detail",
      description:
        "Percakapan lebih lanjut, termasuk menanyakan perkiraan biaya dan waktu.",
      // scenario_id: "memesan-taksi"
    },
  ];

  const currentScenarioUuid = placeholderScenario.uuid;

  return (
    <FadeTransition>
      <div className="p-4 md:px-8 md:py-6">
        {/* Scenario Header */}
        <div className="mb-6 space-y-3 not-prose md:mb-8">
          <Link
            href="/skenario"
            className="text-sm text-pacamara-secondary hover:underline mb-2 inline-block"
          >
            &larr; Kembali ke Daftar Skenario
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              {placeholderScenario.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {placeholderScenario.description}
            </p>
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-white mb-4 md:mb-6">
            Pilih Percakapan:
          </h2>
          {placeholderConversations.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Belum ada percakapan yang tersedia untuk skenario ini.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-4 not-prose">
                {placeholderConversations.map((conversation) => (
                  <li key={conversation.uuid}>
                    <Link
                      href={`/skenario/${currentScenarioUuid}/percakapan/${conversation.uuid}`}
                      className="block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out no-underline group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MessageSquareText className="w-6 h-6 text-pacamara-primary dark:text-pacamara-accent mr-4 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-semibold text-pacamara-primary dark:text-pacamara-accent group-hover:text-pacamara-secondary dark:group-hover:text-pacamara-accent-hover mb-1">
                              {conversation.title}
                            </h3>
                            {conversation.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {conversation.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-pacamara-secondary dark:group-hover:text-pacamara-accent transition-colors" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>
                  Lebih banyak percakapan akan ditambahkan segera untuk skenario
                  ini!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </FadeTransition>
  );
}
