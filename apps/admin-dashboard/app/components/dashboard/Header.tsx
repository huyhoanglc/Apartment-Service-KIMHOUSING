"use client";

import { Menu } from "lucide-react";
import type { AuthUser } from "@/app/lib/auth";
import { useHeaderTitle } from "@/app/components/PageTitleContext";
import NotificationBell from "@/app/components/dashboard/NotificationBell";
import UserMenu from "@/app/components/dashboard/UserMenu";
import Breadcrumb from "@/app/components/dashboard/Breadcrumb";

export default function Header({
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
  const title = useHeaderTitle();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-navy/10 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Mở menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-navy/70 transition-colors duration-200 hover:bg-navy/5 hover:text-navy md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-navy">{title}</h1>
          <div className="hidden sm:block">
            <Breadcrumb />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <NotificationBell />
        <UserMenu user={user} onLogout={onLogout} onComingSoon={onComingSoon} />
      </div>
    </header>
  );
}
