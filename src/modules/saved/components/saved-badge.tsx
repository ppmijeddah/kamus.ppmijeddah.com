"use client";

import { useSavedStore } from "@/modules/saved/store/saved-store";
import { ClientOnly } from "@/services/window";

export function SavedBadge() {
  const savedCount = useSavedStore((state) => state.getSavedItemCount());

  if (savedCount === 0) return null;

  return (
    <ClientOnly fallback={null}>
      <span className="absolute -top-2 right-0 bg-pacamara-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {savedCount}
      </span>
    </ClientOnly>
  );
}
