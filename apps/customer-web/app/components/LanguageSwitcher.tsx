"use client";

import { useState } from "react";
import { cn } from "@/app/lib/cn";

const LANGUAGES = [
  { code: "en", label: "English", flagSrc: "/ENG_Flag.svg" },
  { code: "vi", label: "Tiếng Việt", flagSrc: "/VN_Flag.png" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

// Chỉ đổi trạng thái đang chọn, chưa dịch nội dung trang - site hiện chỉ có tiếng Việt.
// Dùng thẻ <img> thường thay vì next/image vì cờ EN là SVG (Next chặn tối ưu SVG mặc định).
export default function LanguageSwitcher() {
  const [active, setActive] = useState<LangCode>("vi");
  const [errored, setErrored] = useState<Partial<Record<LangCode, boolean>>>({});

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium" role="group" aria-label="Chọn ngôn ngữ">
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/25">|</span>}
          <button
            type="button"
            onClick={() => setActive(lang.code)}
            aria-pressed={active === lang.code}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-1.5 py-1 transition-colors duration-300",
              active === lang.code ? "text-gold-to" : "text-white/50 hover:text-white/80"
            )}
          >
            {!errored[lang.code] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lang.flagSrc}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 shrink-0 rounded-full object-cover"
                onError={() => setErrored((e) => ({ ...e, [lang.code]: true }))}
              />
            )}
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
}
