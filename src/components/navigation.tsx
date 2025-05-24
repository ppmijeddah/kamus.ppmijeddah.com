"use client";
import Link from "next/link";
import { Book, MessageCircleMore, Bookmark } from "lucide-react";
import clsx from "clsx";
import { SavedBadge } from "../modules/saved/components/saved-badge";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-900 py-2 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-around items-center">
          <NavigationItem
            href="/"
            label="Kamus"
            icon={<Book className="w-6 h-6" />}
            isActive={pathname === "/"}
          />

          <NavigationItem
            href="/tersimpan"
            label="Tersimpan"
            icon={<Bookmark className="w-6 h-6" />}
            isActive={pathname === "/tersimpan"}
          >
            <SavedBadge />
          </NavigationItem>

          <NavigationItem
            href="/terjemah"
            label="Terjemah"
            icon={<MessageCircleMore className="w-6 h-6" />}
            isActive={pathname === "/terjemah"}
          />
        </div>
      </div>
    </nav>
  );
}

type NavigationItemProps = {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: boolean;
  className?: string;
  children?: ReactNode;
};

function NavigationItem({
  href,
  label,
  icon,
  isActive,
  className,
  children,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex flex-col items-center no-underline relative",
        {
          "text-pacamara-secondary": isActive,
          "text-gray-500": !isActive,
          "hover:text-pacamara-secondary": !isActive,
        },
        className,
      )}
    >
      {children}
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
}
