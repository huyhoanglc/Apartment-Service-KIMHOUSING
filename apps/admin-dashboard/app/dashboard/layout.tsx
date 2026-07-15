"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "@/app/components/Sidebar";
import { getToken, getUser, clearSession, type AuthUser } from "@/app/lib/auth";
import { useToast } from "@/app/components/ToastProvider";
import { PageTitleProvider, useHeaderTitle } from "@/app/components/PageTitleContext";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
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

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
    </svg>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-navy/70 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
    >
      {icon}
      {label}
    </button>
  );
}

function Avatar({ user, className }: { user: AuthUser; className?: string }) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={32}
        height={32}
        className={`rounded-full object-cover ${className ?? ""}`}
        unoptimized
      />
    );
  }

  return (
    <span
      className={`flex items-center justify-center rounded-full bg-linear-to-br from-gold-from via-gold-via to-gold-to text-xs font-semibold text-navy ${className ?? ""}`}
    >
      {initials}
    </span>
  );
}

function Header({
  user,
  onLogout,
  onComingSoon,
  onMenuClick,
}: {
  user: AuthUser;
  onLogout: () => void;
  onComingSoon: () => void;
  onMenuClick: () => void;
}) {
  const router = useRouter();
  const title = useHeaderTitle();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-navy/10 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Mở menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-navy/70 transition-colors duration-200 hover:bg-navy/5 hover:text-navy md:hidden"
        >
          <MenuIcon />
        </button>
        <h1 className="truncate text-lg font-semibold text-navy">{title}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onComingSoon}
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
            <Avatar user={user} className="h-8 w-8" />
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
              <MenuItem
                icon={<ProfileIcon />}
                label="Hồ sơ của tôi"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/dashboard/profile");
                }}
              />
              <MenuItem icon={<SettingsIcon />} label="Cài đặt" onClick={onComingSoon} />
              <MenuItem icon={<ActivityIcon />} label="Hoạt động" onClick={onComingSoon} />
              <MenuItem icon={<SupportIcon />} label="Hỗ trợ" onClick={onComingSoon} />
              <div className="my-1 border-t border-navy/10" />
              <button
                onClick={onLogout}
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
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { showToast } = useToast();
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);
  // Sidebar tự đóng khi bấm vào 1 mục điều hướng (xem onClick trong Sidebar), effect theo
  // pathname là dư thừa và bị lint chặn (set-state-in-effect) nên không cần thêm ở đây.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function notifyComingSoon() {
    showToast("Tính năng đang được phát triển", "info");
  }

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    clearSession();
    router.replace("/login");
  }

  if (!user) return null;

  return (
    <PageTitleProvider>
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-1 flex-col">
          <Header
            user={user}
            onLogout={handleLogout}
            onComingSoon={notifyComingSoon}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <main className="flex flex-1 flex-col bg-background p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </PageTitleProvider>
  );
}
