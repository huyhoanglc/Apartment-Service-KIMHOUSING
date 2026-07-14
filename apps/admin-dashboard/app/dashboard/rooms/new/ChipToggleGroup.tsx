"use client";

export interface ChipOption {
  id: string;
  label: string;
}

export default function ChipToggleGroup({
  options,
  selected,
  onToggle,
}: {
  options: ChipOption[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onToggle(option.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
              active
                ? "border-transparent bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy shadow-sm"
                : "border-navy/15 text-navy/60 hover:border-gold hover:text-gold-to"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
