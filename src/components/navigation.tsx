import Link from "next/link";
import { Book, MessageCircleMore } from "lucide-react";
import clsx from "clsx";

type NavigationProps = {
  active: "dictionary" | "conversation";
};

export function Navigation(props: NavigationProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-900 py-2 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className={clsx("flex flex-col items-center no-underline", {
              "text-pacamara-secondary": props.active === "dictionary",
              "text-gray-500": props.active !== "dictionary",
              "hover:text-pacamara-secondary": props.active !== "dictionary",
            })}
          >
            <Book className="w-6 h-6" />
            <span className="text-xs mt-1">Kamus</span>
          </Link>

          <Link
            href="/percakapan"
            className={clsx("flex flex-col items-center no-underline", {
              "text-pacamara-secondary": props.active === "conversation",
              "text-gray-500": props.active !== "conversation",
              "hover:text-pacamara-secondary": props.active !== "conversation",
            })}
          >
            <MessageCircleMore className="w-6 h-6" />
            <span className="text-xs mt-1">Percakapan</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
