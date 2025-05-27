import { ThemeToggler } from "@/services/theme";
import { Book, MessageCircleMore } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between mb-8 px-4">
      <div className="flex gap-3 relative">
        <Book className="w-10 h-10 text-pacamara-secondary" />
        <div>
          <h1 className="relative bottom-4">
            <span className="gradient-underline">
              <span className="text-base md:text-3xl">Kamus Amiyah Saudi</span>
            </span>
          </h1>
          <span className="absolute right-0 top-[-1rem] text-xs text-pacamara-secondary">
            by{" "}
            <Link
              href="https://ppmijeddah.com"
              className="cursor-pointer text-pacamara-secondary no-underline"
            >
              ppmijeddah.com
            </Link>
          </span>
        </div>
      </div>

      <div className="relative md:right-3 flex items-center space-x-2 md:space-x-3">
        <Link
          href="/terjemah"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Buka fitur terjemah"
          title="Terjemah"
        >
          <MessageCircleMore className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </Link>
        <ThemeToggler />
      </div>
    </header>
  );
}
