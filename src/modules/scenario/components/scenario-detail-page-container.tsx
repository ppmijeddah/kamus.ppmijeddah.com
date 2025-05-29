import React from "react";
import Link from "next/link";
import { FadeTransition } from "@/services/animation";
import { ChevronRight, MessageSquareText } from "lucide-react";
import { Conversation, Scenario } from "@/domain/scenario";

interface ScenarioDetailPageContainerProps {
  scenario: Scenario;
  conversations: Conversation[];
}

export default function ScenarioDetailPageContainer({
  scenario,
  conversations,
}: ScenarioDetailPageContainerProps) {
  const currentScenarioUuid = scenario.uuid;

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
              {scenario.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {scenario.description}
            </p>
          </div>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-white mb-4 md:mb-6">
            Pilih Percakapan:
          </h2>
          {conversations.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Belum ada percakapan yang tersedia untuk skenario ini.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-4 not-prose">
                {conversations.map((conversation) => (
                  <li key={conversation.uuid}>
                    <Link
                      href={`/skenario/${currentScenarioUuid}/percakapan/${conversation.uuid}`}
                      className="block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out no-underline group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <MessageSquareText className="w-6 h-6 text-pacamara-primary dark:text-white mr-4 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-semibold text-pacamara-primary dark:text-white group-hover:text-pacamara-secondary dark:group-hover:text-white mb-1">
                              {conversation.title}
                            </h3>
                            {conversation.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {conversation.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-pacamara-secondary dark:group-hover:text-white transition-colors" />
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
