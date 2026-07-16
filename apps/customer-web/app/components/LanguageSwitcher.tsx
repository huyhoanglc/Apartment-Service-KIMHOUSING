"use client";

import { useState } from "react";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", text: "VN", src: "/VN_Flag.png" },
  { code: "en", label: "English", text: "ENG", src: "/ENG_Flag.svg" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

// Chỉ đổi trạng thái đang chọn, chưa dịch nội dung trang - site hiện chỉ có tiếng Việt.
// Dùng thẻ <img> thường thay vì next/image vì cờ EN là SVG (Next chặn tối ưu SVG mặc định).
export default function LanguageSwitcher() {
  const [active, setActive] = useState<LangCode>("vi");
  const [errored, setErrored] = useState<Partial<Record<LangCode, boolean>>>({});

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Chọn ngôn ngữ">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setActive(lang.code)}
          title={lang.label}
          aria-pressed={active === lang.code}
          className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold transition-all duration-300 ${
            active === lang.code ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          {errored[lang.code] ? (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10 text-[8px]">
              {lang.text}
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lang.src}
              alt={lang.label}
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 rounded-full object-cover"
              onError={() => setErrored((e) => ({ ...e, [lang.code]: true }))}
            />
          )}
          {lang.text}
        </button>
      ))}
    </div>
  );
}
