"use client";

import { useSyncExternalStore } from "react";

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

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <circle cx="10" cy="10" r="3.5" />
      <path
        d="M10 2v1.5M10 16.5V18M18 10h-1.5M3.5 10H2M15.5 4.5l-1 1M5.5 14.5l-1 1M15.5 15.5l-1-1M5.5 5.5l-1-1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M17 12.5A7 7 0 1 1 7.5 3a5.5 5.5 0 0 0 9.5 9.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export default function ThemeToggle() {
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
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-300 hover:bg-white/10"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
