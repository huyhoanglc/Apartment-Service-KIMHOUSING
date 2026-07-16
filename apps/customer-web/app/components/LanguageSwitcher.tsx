"use client";

import { useState } from "react";
import Image from "next/image";

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt", src: "/VN_Flag.png", fallback: "VN" },
  { code: "en", label: "English", src: "/ENG_Flag.png", fallback: "EN" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

// Chỉ đổi icon đang chọn, chưa dịch nội dung trang - site hiện chỉ có tiếng Việt.
export default function LanguageSwitcher() {
  const [active, setActive] = useState<LangCode>("vi");
  const [errored, setErrored] = useState<Partial<Record<LangCode, boolean>>>({});

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Chọn ngôn ngữ">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setActive(lang.code)}
          title={lang.label}
          aria-pressed={active === lang.code}
          className={`flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 transition-all duration-300 ${
            active === lang.code ? "ring-gold" : "opacity-50 ring-transparent hover:opacity-80"
          }`}
        >
          {errored[lang.code] ? (
            <span className="text-[9px] font-bold text-white">{lang.fallback}</span>
          ) : (
            <Image
              src={lang.src}
              alt={lang.label}
              width={24}
              height={24}
              className="h-full w-full object-cover"
              onError={() => setErrored((e) => ({ ...e, [lang.code]: true }))}
            />
          )}
        </button>
      ))}
    </div>
  );
}
