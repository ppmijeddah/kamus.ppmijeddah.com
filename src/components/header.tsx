import { Book } from "lucide-react";
import { ThemeToggler } from "./theme-toggler";
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

      <div className="relative md:right-3">
        <ThemeToggler />
      </div>
    </header>
  );
}
