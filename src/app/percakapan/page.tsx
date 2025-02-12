import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";

function App() {
  return (
    <div className="pt-16 pb-24">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-white mb-4">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Fitur ini sedang dalam pengembangan. Silakan kembali lagi nanti.
          </p>
        </div>
      </div>
      <footer className="fixed left-0 bottom-0 right-0">
        <Navigation active="conversation" />
      </footer>
    </div>
  );
}

export default App;
