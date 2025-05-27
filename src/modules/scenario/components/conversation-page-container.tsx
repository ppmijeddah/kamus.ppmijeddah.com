"use client";

import React from "react";
import Link from "next/link";
import { FadeTransition } from "@/services/animation";
import { Conversation, Sentence } from "@/domain/scenario";

interface ConversationPageContainerProps {
  conversation: Conversation;
  sentences: Sentence[];
  scenarioUuid: string;
}

export default function ConversationPageContainer({
  conversation,
  sentences,
  scenarioUuid,
}: ConversationPageContainerProps) {
  return (
    <FadeTransition>
      <div className="p-4 md:px-8 md:py-6 space-y-10 not-prose">
        <div className="mb-6 space-y-3 md:mb-8">
          <Link
            href={`/skenario/${scenarioUuid}`}
            className="text-sm text-pacamara-secondary hover:underline mb-2 inline-block"
          >
            &larr; Kembali ke Daftar Percakapan
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-1">
              {conversation.title}
            </h1>
            {conversation.description && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {conversation.description}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {sentences.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Percakapan ini belum memiliki dialog.
              </p>
            </div>
          ) : (
            sentences
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
  sentence: Sentence;
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
