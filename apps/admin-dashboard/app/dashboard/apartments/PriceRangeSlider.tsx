"use client";

import { useState } from "react";
import { formatThousands, stripThousands } from "@/app/lib/formatNumber";

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
  // Ô nhập tay giữ giá trị dạng chuỗi có dấu chấm ngăn cách để gõ số dễ hơn, đồng bộ lại khi slider đổi từ bên ngoài.
  // Đồng bộ ngay trong lúc render (thay vì useEffect) theo pattern "adjust state while rendering" của React,
  // tránh 1 nhịp render thừa mỗi khi `value` đổi từ component cha.
  const [loText, setLoText] = useState(() => formatThousands(String(lo)));
  const [hiText, setHiText] = useState(() => formatThousands(String(hi)));
  const [prevLo, setPrevLo] = useState(lo);
  const [prevHi, setPrevHi] = useState(hi);

  if (lo !== prevLo) {
    setPrevLo(lo);
    setLoText(formatThousands(String(lo)));
  }
  if (hi !== prevHi) {
    setPrevHi(hi);
    setHiText(formatThousands(String(hi)));
  }

  function handleLoSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const next = Math.min(Number(e.target.value), hi - step);
    onChange([next, hi]);
  }

  function handleHiSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const next = Math.max(Number(e.target.value), lo + step);
    onChange([lo, next]);
  }

  function commitLoText(text: string) {
    const parsed = Math.min(Math.max(Number(stripThousands(text) || 0), min), hi - step);
    onChange([parsed, hi]);
  }

  function commitHiText(text: string) {
    const parsed = Math.max(Math.min(Number(stripThousands(text) || 0), max), lo + step);
    onChange([lo, parsed]);
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
          onChange={handleLoSlider}
          aria-label="Giá tối thiểu"
          className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 bg-transparent"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={handleHiSlider}
          aria-label="Giá tối đa"
          className="range-thumb pointer-events-none absolute top-1/2 h-1 w-full -translate-y-1/2 bg-transparent"
        />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            value={loText}
            onChange={(e) => setLoText(formatThousands(e.target.value))}
            onBlur={(e) => commitLoText(e.target.value)}
            inputMode="numeric"
            aria-label="Nhập giá tối thiểu"
            className="w-full rounded-md border border-navy/15 py-1.5 pr-6 pl-2 text-right text-xs text-navy outline-none focus:border-gold"
          />
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-navy/40">đ</span>
        </div>
        <span className="text-navy/30">—</span>
        <div className="relative flex-1">
          <input
            value={hiText}
            onChange={(e) => setHiText(formatThousands(e.target.value))}
            onBlur={(e) => commitHiText(e.target.value)}
            inputMode="numeric"
            aria-label="Nhập giá tối đa"
            className="w-full rounded-md border border-navy/15 py-1.5 pr-6 pl-2 text-right text-xs text-navy outline-none focus:border-gold"
          />
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-xs text-navy/40">đ</span>
        </div>
      </div>

      <div className="mt-1.5 flex justify-between text-xs text-navy/50">
        <span>{formatPrice(lo)}đ</span>
        <span>{formatPrice(hi)}đ</span>
      </div>
    </div>
  );
}
