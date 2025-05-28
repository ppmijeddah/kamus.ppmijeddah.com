interface SavedItemCountProps {
  count: number;
}

export function SavedItemCount({ count }: SavedItemCountProps) {
  return (
    <div className="px-4 mb-3 text-right">
      <span className="text-lg font-semibold text-pacamara-secondary dark:text-pacamara-accent">
        Total: {count} item
      </span>
    </div>
  );
}
