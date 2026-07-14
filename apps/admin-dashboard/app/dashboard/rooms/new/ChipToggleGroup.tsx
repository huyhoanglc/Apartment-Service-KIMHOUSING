"use client";

export interface ChipOption {
  id: string;
  label: string;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-2.5 w-2.5">
      <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
    </svg>
  );
}

export default function ChipToggleGroup({
  options,
  selected,
  onToggle,
  onDelete,
}: {
  options: ChipOption[];
  selected: string[];
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <span key={option.id} className="group relative inline-flex">
            <button
              type="button"
              onClick={() => onToggle(option.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "border-transparent bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy shadow-sm"
                  : "border-navy/15 text-navy/60 hover:border-gold hover:text-gold-to"
              } ${onDelete ? "pr-6" : ""}`}
            >
              {option.label}
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(option.id);
                }}
                aria-label={`Xoá tiện ích ${option.label}`}
                className={`absolute top-1/2 right-2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-200 ${
                  active ? "text-navy/60 hover:text-navy" : "text-navy/40 hover:text-red-600"
                }`}
              >
                <CloseIcon />
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}
