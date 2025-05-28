import React from "react";
import Link from "next/link";
import { StoredConversation } from "@/modules/saved/store/saved-store";
import { MessageSquareText, ExternalLink } from "lucide-react";
import { HighlightText } from "@/modules/dictionary/components/highlight-text";
import { ConversationBookmarkButton } from "@/modules/saved/components/conversation-bookmark-button";

interface SavedConversationCardProps {
  storedConversation: StoredConversation;
  searchQuery?: string;
}

export function SavedConversationCard({
  storedConversation,
  searchQuery = "",
}: SavedConversationCardProps) {
  const {
    title,
    description,
    uuid: conversationUuid,
    scenarioUuid,
  } = storedConversation;

  const scenarioTitleDisplay = scenarioUuid;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-grow mr-2">
          <Link
            href={`/skenario/${scenarioUuid}/percakapan/${conversationUuid}`}
            className="no-underline group"
          >
            <div className="flex items-center mb-1">
              <MessageSquareText className="w-5 h-5 text-pacamara-primary dark:text-pacamara-accent mr-2 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-pacamara-primary dark:text-pacamara-accent group-hover:text-pacamara-secondary dark:group-hover:text-pacamara-accent-hover">
                <HighlightText text={title} query={searchQuery} />
              </h3>
            </div>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <HighlightText text={description} query={searchQuery} />
              </p>
            )}
          </Link>
        </div>
        <ConversationBookmarkButton
          conversation={storedConversation}
          scenarioUuid={scenarioUuid}
        />
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <span>Skenario: </span>
        <Link
          href={`/skenario/${scenarioUuid}`}
          className="hover:underline text-pacamara-secondary inline-flex items-center"
        >
          {scenarioTitleDisplay}
          <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
        </Link>
      </div>
    </div>
  );
}
