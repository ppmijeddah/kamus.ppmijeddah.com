"use client";

import React, { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { FadeTransition } from "@/services/animation";
import { Conversation, Sentence } from "@/domain/scenario";
import { ConversationBookmarkButton } from "@/modules/saved/components/conversation-bookmark-button";
import { Flag, Loader2 } from "lucide-react";
import { reportSentenceIssueViaWhatsapp } from "../services/report-sentence-issue";

const ReportSentenceModal = lazy(() =>
  import("./report-sentence-modal").then((module) => ({
    default: module.ReportSentenceModal,
  })),
);

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
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedSentenceForReport, setSelectedSentenceForReport] =
    useState<Sentence | null>(null);

  const handleOpenReportModal = (sentence: Sentence) => {
    setSelectedSentenceForReport(sentence);
    setIsReportModalOpen(true);
  };

  const handleCloseReportModal = () => {
    setIsReportModalOpen(false);
    setSelectedSentenceForReport(null);
  };

  const handleSubmitReport = (
    problemDescription: string,
    suggestion?: string,
  ) => {
    if (selectedSentenceForReport) {
      reportSentenceIssueViaWhatsapp({
        sentence: selectedSentenceForReport,
        problemDescription,
        suggestion,
        scenarioUuid: scenarioUuid,
        conversationUuid: conversation.uuid,
      });
      handleCloseReportModal();
    }
  };

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
          <div className="flex items-center justify-between">
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
            <ConversationBookmarkButton
              conversation={conversation}
              scenarioUuid={scenarioUuid}
              className="ml-4 flex-shrink-0"
            />
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
              .sort((a, b) => a.orderInConversation - b.orderInConversation)
              .map((sentence) => (
                <div
                  key={sentence.uuid}
                  className={`flex relative ${
                    sentence.speaker === "Anda"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {sentence.speaker === "Anda" ? (
                    <UserBubble
                      sentence={sentence}
                      onReport={() => handleOpenReportModal(sentence)}
                    />
                  ) : (
                    <OtherSpeakerBubble
                      sentence={sentence}
                      onReport={() => handleOpenReportModal(sentence)}
                    />
                  )}
                </div>
              ))
          )}
        </div>
      </div>
      {isReportModalOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
          }
        >
          <ReportSentenceModal
            isOpen={isReportModalOpen}
            onClose={handleCloseReportModal}
            onSubmit={handleSubmitReport}
            sentence={selectedSentenceForReport}
          />
        </Suspense>
      )}
    </FadeTransition>
  );
}

interface BubbleProps {
  sentence: Sentence;
  onReport: () => void;
}

function UserBubble({ sentence, onReport }: BubbleProps): React.ReactElement {
  return (
    <div className="max-w-lg p-2.5 pt-10 rounded-lg shadow-md bg-pacamara-primary text-white rounded-br-none relative">
      <button
        onClick={onReport}
        className="absolute top-1 left-1 p-1 bg-black/20 hover:bg-black/40 rounded-full"
        aria-label="Laporkan kalimat ini"
        title="Laporkan kesalahan"
      >
        <Flag size={16} className="text-white" />
      </button>
      <p className="text-xs font-semibold mb-0.5 text-right text-pacamara-accent-light opacity-90">
        {sentence.speaker}
      </p>
      <p className="text-base mb-0.5">{sentence.amiyahTextTransliteration}</p>
      <p className="text-base font-arabic text-right">
        {sentence.amiyahTextArab}
      </p>
      <div className="my-3 h-px bg-white/30"></div>
      <p className="text-xs text-gray-200 opacity-90">
        {sentence.translationBahasa}
      </p>
    </div>
  );
}

function OtherSpeakerBubble({
  sentence,
  onReport,
}: BubbleProps): React.ReactElement {
  return (
    <div className="max-w-lg p-2.5 pt-10 rounded-lg shadow-md bg-[#8F961A] dark:bg-[#4A4E0D] text-white rounded-bl-none relative">
      <button
        onClick={onReport}
        className="absolute top-1 right-1 p-1 bg-black/20 hover:bg-black/40 rounded-full"
        aria-label="Laporkan kalimat ini"
        title="Laporkan kesalahan"
      >
        <Flag size={16} className="text-white" />
      </button>
      <p className="text-xs font-semibold mb-0.5 text-left text-white opacity-75">
        {sentence.speaker}
      </p>
      <p className="text-base mb-0.5">{sentence.amiyahTextTransliteration}</p>
      <p className="text-base font-arabic text-right">
        {sentence.amiyahTextArab}
      </p>
      <div className="my-3 h-px bg-white/40 dark:bg-white/30"></div>
      <p className="text-xs text-white opacity-90">
        {sentence.translationBahasa}
      </p>
    </div>
  );
}
