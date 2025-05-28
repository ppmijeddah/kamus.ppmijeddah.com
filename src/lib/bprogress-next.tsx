"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { ReactNode } from "react";

const progressBarColor = "#b1b720";

const ServerProgressProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      color={progressBarColor}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default ServerProgressProvider;
