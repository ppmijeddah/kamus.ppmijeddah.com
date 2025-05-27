"use client";

import React from "react";
import Link from "next/link";
import { FadeTransition } from "@/services/animation";
import { ChevronRight } from "lucide-react";
import { Scenario, sortScenariosByImportance } from "@/domain/scenario";

interface ScenariosPageContainerProps {
  scenarios: Scenario[];
}

export default function ScenariosPageContainer({
  scenarios,
}: ScenariosPageContainerProps) {
  const sortedScenarios = sortScenariosByImportance(scenarios);

  return (
    <FadeTransition>
      <div className="p-4 md:px-8 space-y-2 md:py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 md:mb-8">
          Pilih Skenario Percakapan
        </h1>
        {sortedScenarios.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Belum ada skenario yang tersedia saat ini.
            </p>
          </div>
        ) : (
          <ul className="space-y-4 not-prose">
            {sortedScenarios.map((scenario) => (
              <li key={scenario.uuid}>
                <Link
                  href={`/skenario/${scenario.uuid}`}
                  className="block bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out no-underline group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold text-pacamara-primary dark:text-pacamara-accent group-hover:text-pacamara-secondary dark:group-hover:text-pacamara-accent-hover mb-1">
                        {scenario.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        {scenario.description}
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-pacamara-secondary dark:group-hover:text-pacamara-accent transition-colors" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {sortedScenarios.length > 0 && (
          <div className="mt-8 text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Lebih banyak skenario akan ditambahkan segera!</p>
          </div>
        )}
      </div>
    </FadeTransition>
  );
}
