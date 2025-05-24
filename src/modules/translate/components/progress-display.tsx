"use client";

import React, { useState, useEffect } from "react";

export function ProgressDisplay() {
  const targetProgress = 5;
  const milestones = ["Riset", "Pengembangan", "Pengujian", "Peluncuran"]; // Defined internally
  const currentMilestoneIndex = 0;
  const estimatedCompletionDate = "Akhir Kuartal 4 2024"; // Defined internally

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentProgress(targetProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [targetProgress]);

  return (
    <div className="mb-8 px-4 md:px-0">
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Progres: {targetProgress}%
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Estimasi Selesai: {estimatedCompletionDate}
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
        <div
          className="bg-pacamara-secondary h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-1">
        {milestones.map((milestone, index) => (
          <span
            key={milestone}
            className={
              index <= currentMilestoneIndex
                ? "font-semibold text-pacamara-secondary dark:text-pacamara-accent"
                : ""
            }
          >
            {milestone}
          </span>
        ))}
      </div>
    </div>
  );
}
