"use client";

import { useSavedStore } from "@/modules/saved/store/saved-store";

export function SavedBadge() {
  const saved = useSavedStore((state) => state.saved);
  const savedCount = saved.length;

  if (savedCount === 0) return null;

  return (
    <span className="absolute -top-2 right-0 bg-pacamara-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {savedCount}
    </span>
  );
}
