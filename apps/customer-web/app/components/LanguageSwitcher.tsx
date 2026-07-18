"use client";

import { useState } from "react";
import { cn } from "@/app/lib/cn";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "vi", label: "Tiếng Việt" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

// Chỉ đổi trạng thái đang chọn, chưa dịch nội dung trang - site hiện chỉ có tiếng Việt.
export default function LanguageSwitcher() {
  const [active, setActive] = useState<LangCode>("vi");

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
              "rounded-full px-1.5 py-1 transition-colors duration-300",
              active === lang.code ? "text-gold-to" : "text-white/50 hover:text-white/80"
            )}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
}
