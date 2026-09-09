"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { cn } from "@/app/lib/utils";

interface Option {
  value: string;
  label: string;
}

export default function MultiSelectFilter({
  label,
  options,
  selected,
  onToggle,
  searchable,
}: {
  label: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const filteredOptions = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3 text-sm transition-colors duration-200",
            selected.length > 0 ? "border-gold bg-gold/5 text-navy" : "border-navy/15 text-navy/70 hover:border-navy/30"
          )}
        >
          <span className="truncate">
            {label}
            {selected.length > 0 && (
              <span className="ml-1.5 rounded-full bg-navy px-1.5 py-0.5 text-[11px] font-semibold text-white">
                {selected.length}
              </span>
            )}
          </span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        {searchable && (
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Tìm ${label.toLowerCase()}...`}
            className="mb-2 h-8 text-xs"
          />
        )}
        <div className="max-h-64 space-y-0.5 overflow-y-auto">
          {filteredOptions.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-navy/40">Không có kết quả</p>
          )}
          {filteredOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-navy transition-colors duration-150 hover:bg-navy/5"
            >
              <Checkbox checked={selected.includes(opt.value)} onCheckedChange={() => onToggle(opt.value)} />
              {opt.label}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
