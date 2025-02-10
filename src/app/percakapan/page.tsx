import { Book, MessageCircleMore } from "lucide-react";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-svh bg-white pt-4 pb-24 font-pacamara-inter prose dark:prose-invert max-w-full prose-headings:p-0 prose-headings:m-0">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Book className="w-10 h-10 text-pacamara-secondary" />
          <h1 className="relative bottom-4 md:bottom-2">
            <span className="gradient-underline">
              <span className="text-base md:text-3xl">
                Kamus Amiyah Saudi {"<>"} Indo
              </span>
            </span>
          </h1>
        </div>

        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Coming Soon!
          </h2>
          <p className="text-gray-600">
            Fitur ini sedang dalam pengembangan. Silakan kembali lagi nanti.
          </p>
        </div>
      </div>

      <footer className="fixed left-0 bottom-0 right-0">
        <Navigation />
      </footer>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="bg-white border-t border-gray-200 py-2 px-4 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-around items-center">
          <Link
            href="/"
            className="flex flex-col items-center hover:text-pacamara-secondary no-underline"
          >
            <Book className="w-6 h-6" />
            <span className="text-xs mt-1">Kamus</span>
          </Link>

          <Link
            href="/percakapan"
            className="flex flex-col items-center text-gray-500 text-pacamara-secondary no-underline"
          >
            <MessageCircleMore className="w-6 h-6" />
            <span className="text-xs mt-1">Percakapan</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default App;
