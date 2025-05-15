"use client";

import { ReactNode, useEffect, useState } from "react";

type ClientOnlyProps = {
  /** Component to show during server rendering and initial client hydration */
  fallback: ReactNode;
  /** Content to show after client-side hydration */
  children: ReactNode;
  /** Optional delay before showing content (helps with animation timing) */
  delayMs?: number;
};

/** ClientOnly component ensures content is only rendered on the client side.
 * Prevents hydration mismatches by showing a consistent fallback during SSR. */
export function ClientOnly({ fallback, children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return children;
}
