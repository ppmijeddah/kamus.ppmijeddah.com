import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import React from "react";
import { ProgressDisplay } from "./progress-display";
import { InterestForm } from "./intereset-form"; // Assuming the typo 'intereset-form' is intentional as per context

function TranslatePageContainer() {
  return (
    <>
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">
          Penerjemah AI Indo ⇔ Arab Saudi Amiyah - Segera Hadir!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Fitur enerjemah AI kami sedang dalam tahap pengembangan. Kami
          bersemangat untuk segera menghadirkannya untuk Anda!
        </p>
        <ProgressDisplay />
        <InterestForm />
      </div>
      <footer className="fixed left-0 bottom-0 right-0">
        <Navigation active="translate" />
      </footer>
    </>
  );
}

export default TranslatePageContainer;
