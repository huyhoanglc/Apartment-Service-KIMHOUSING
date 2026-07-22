"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const t = useTranslations("themeToggle");
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("kimhousing_theme", next ? "dark" : "light");
    } catch {
      // trình duyệt chặn localStorage (chế độ ẩn danh nghiêm ngặt) - bỏ qua, chỉ mất khả năng ghi nhớ lựa chọn
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("toLight") : t("toDark")}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-to"
    >
      {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
    </button>
  );
}
