import { Book } from "lucide-react";
import { ThemeToggler } from "./theme-toggler";

export function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex gap-3">
        <Book className="w-10 h-10 text-pacamara-secondary" />
        <h1 className="relative bottom-4 md:bottom-2">
          <span className="gradient-underline">
            <span className="text-base md:text-3xl">
              Kamus Amiyah Saudi {"<>"} Indo
            </span>
          </span>
        </h1>
      </div>

      <div className="relative right-3">
        <ThemeToggler />
      </div>
    </header>
  );
}
