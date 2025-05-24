"use client";

import { motion } from "framer-motion";
import React from "react";

export function FadeTransition({
  children,
  className,
  duration = 1.5,
  ease = "easeOut",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  ease?: string | number[];
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration,
          ease,
          delay,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0,
          delay: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
