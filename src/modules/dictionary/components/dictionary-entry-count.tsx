interface DictionaryEntryCountProps {
  count: number;
  isVisible: boolean;
}

export function DictionaryEntryCount({
  count,
  isVisible,
}: DictionaryEntryCountProps) {
  return (
    <div
      className={`px-4 mb-3 text-right ${!isVisible ? "opacity-0" : "opacity-100"}`}
    >
      <span className="text-lg font-semibold text-pacamara-secondary dark:text-pacamara-accent">
        Total: {count} kata
      </span>
    </div>
  );
}
