interface DictionaryEntryCountProps {
  count: number;
}

export function DictionaryEntryCount({ count }: DictionaryEntryCountProps) {
  return (
    <div className="px-4 mb-3 text-right">
      <span className="text-lg font-semibold text-pacamara-secondary dark:text-pacamara-accent">
        Total: {count} kata
      </span>
    </div>
  );
}
