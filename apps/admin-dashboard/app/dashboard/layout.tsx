"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { getToken, getUser, clearSession, type AuthUser } from "@/app/lib/auth";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path d="M5 8a5 5 0 0 1 10 0c0 3.2 1 4.5 1.5 5.2a.6.6 0 0 1-.5 1H4a.6.6 0 0 1-.5-1C4 12.5 5 11.2 5 8Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.2 16.5a1.8 1.8 0 0 0 3.6 0" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
      <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <circle cx="10" cy="6.5" r="3" />
      <path d="M3.5 17c1.2-3.2 3.8-5 6.5-5s5.3 1.8 6.5 5" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.3 5.3l1.4 1.4M13.3 13.3l1.4 1.4M5.3 14.7l1.4-1.4M13.3 6.7l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <path d="M3 10h3l2 5 4-10 2 5h3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SupportIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="2.5" />
      <path d="m5 5 2.6 2.6M15 5l-2.6 2.6M5 15l2.6-2.6M15 15l-2.6-2.6" strokeLinecap="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <path d="M8 3H4.5A1.5 1.5 0 0 0 3 4.5v11A1.5 1.5 0 0 0 4.5 17H8" strokeLinecap="round" />
      <path d="M13 6.5 17 10l-4 3.5M17 10H8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      onClick={() => alert("Tính năng đang được phát triển")}
      className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-navy/70 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
    >
      {icon}
      {label}
    </button>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-navy/10 bg-white px-6">
          <div className="relative w-full max-w-xs">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-navy/40">
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="w-full rounded-md border border-navy/15 bg-background py-2 pl-9 pr-3 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Tính năng đang được phát triển")}
              className="flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
              aria-label="Thông báo"
            >
              <BellIcon />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-navy/5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-gold-from via-gold-via to-gold-to text-xs font-semibold text-navy">
                  {initials}
                </span>
                <span className="hidden text-sm text-navy/70 sm:inline">
                  {user.name} <span className="text-navy/40">({user.role})</span>
                </span>
                <ChevronIcon />
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-56 rounded-md border border-navy/10 bg-white py-2 shadow-lg">
                  <p className="px-4 pb-2 text-xs font-medium tracking-wide text-navy/40 uppercase">
                    Xin chào, {user.name}
                  </p>
                  <MenuItem icon={<ProfileIcon />} label="Hồ sơ của tôi" />
                  <MenuItem icon={<SettingsIcon />} label="Cài đặt" />
                  <MenuItem icon={<ActivityIcon />} label="Hoạt động" />
                  <MenuItem icon={<SupportIcon />} label="Hỗ trợ" />
                  <div className="my-1 border-t border-navy/10" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-red-600 transition-colors duration-200 hover:bg-red-50"
                  >
                    <LogoutIcon />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-background p-6">{children}</main>
      </div>
    </div>
  );
}
