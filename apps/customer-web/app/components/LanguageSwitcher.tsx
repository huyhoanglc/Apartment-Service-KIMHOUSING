"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/app/lib/cn";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

const LANGUAGES = [
  { code: "en", label: "English", flagSrc: "/ENG_Flag.svg" },
  { code: "vi", label: "Tiếng Việt", flagSrc: "/VN_Flag.png" },
] as const satisfies ReadonlyArray<{ code: AppLocale; label: string; flagSrc: string }>;

// Dùng thẻ <img> thường thay vì next/image vì cờ EN là SVG (Next chặn tối ưu SVG mặc định).
export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [errored, setErrored] = useState<Partial<Record<AppLocale, boolean>>>({});

  function switchTo(locale: AppLocale) {
    if (locale === activeLocale) return;
    router.replace(pathname, { locale });
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium" role="group" aria-label={t("groupLabel")}>
      {LANGUAGES.map((lang, i) => (
        <span key={lang.code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/25">|</span>}
          <button
            type="button"
            onClick={() => switchTo(lang.code)}
            aria-pressed={activeLocale === lang.code}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-1.5 py-1 transition-colors duration-300",
              activeLocale === lang.code ? "text-gold-to" : "text-white/50 hover:text-white/80"
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
