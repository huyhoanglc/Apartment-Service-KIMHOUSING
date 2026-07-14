"use client";

function formatPrice(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toLocaleString("vi-VN")} triệu`;
  return value.toLocaleString("vi-VN");
}

export default function PriceRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const [lo, hi] = value;

  function handleLo(e: React.ChangeEvent<HTMLInputElement>) {
    const next = Math.min(Number(e.target.value), hi - step);
    onChange([next, hi]);
  }

  function handleHi(e: React.ChangeEvent<HTMLInputElement>) {
    const next = Math.max(Number(e.target.value), lo + step);
    onChange([lo, next]);
  }

  const loPct = ((lo - min) / (max - min)) * 100;
  const hiPct = ((hi - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative h-5">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-navy/10" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to"
          style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={handleLo}
          className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 bg-transparent"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={handleHi}
          className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 bg-transparent"
        />
      </div>
      <div className="mt-1.5 flex justify-between text-xs text-navy/50">
        <span>{formatPrice(lo)}đ</span>
        <span>{formatPrice(hi)}đ</span>
      </div>
    </div>
  );
}
