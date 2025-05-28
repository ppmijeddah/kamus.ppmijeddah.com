import React, { useState, useEffect } from "react";
import { Sentence } from "@/domain/scenario";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ReportSentenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problemDescription: string, suggestion?: string) => void;
  sentence: Sentence | null;
  triggerButton?: React.ReactNode;
}

export function ReportSentenceModal({
  isOpen,
  onClose,
  onSubmit,
  sentence,
}: ReportSentenceModalProps) {
  const [problemDescription, setProblemDescription] = useState("");
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    if (isOpen) {
      setProblemDescription("");
      setSuggestion("");
    }
  }, [isOpen, sentence]);

  if (!sentence) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problemDescription.trim()) {
      onSubmit(problemDescription, suggestion);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 data-[state=open]:animate-overlayShow z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl focus:outline-none data-[state=open]:animate-contentShow z-50 overflow-y-auto">
          <Dialog.Title className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
            Laporkan Kesalahan Kalimat
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Bantu kami meningkatkan kualitas konten dengan melaporkan kesalahan.
          </Dialog.Description>

          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-sm">
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Anda melaporkan:
            </p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              <span className="font-semibold">{sentence.speaker}:</span>{" "}
              {sentence.amiyahTextTransliteration}
            </p>
            <p className="font-arabic text-gray-600 dark:text-gray-300 text-right">
              {sentence.amiyahTextArab}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              ({sentence.translationBahasa})
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="problemDescription"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Apa yang salah dengan kalimat ini? (Wajib)
              </label>
              <textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-pacamara-primary focus:border-pacamara-primary dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="suggestion"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Saran perbaikan (Opsional)
              </label>
              <textarea
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-pacamara-primary focus:border-pacamara-primary dark:bg-gray-700 dark:text-white"
                placeholder="Contoh: Seharusnya transliterasinya 'Kaif halak?'"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md"
                >
                  Batal
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-pacamara-secondary hover:bg-pacamara-accent rounded-md"
              >
                Kirim Laporan via WhatsApp
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute right-3 top-3 inline-flex size-6 appearance-none items-center justify-center rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pacamara-primary"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
