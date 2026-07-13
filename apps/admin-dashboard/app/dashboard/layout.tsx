"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import { getToken, getUser, clearSession, type AuthUser } from "@/app/lib/auth";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);

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
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-end gap-4 border-b border-navy/10 bg-white px-6">
          <span className="text-sm text-navy/70">
            {user.name} <span className="text-navy/40">({user.role})</span>
          </span>
          <button
            onClick={handleLogout}
            className="rounded-md border border-navy/15 px-3 py-1.5 text-sm font-medium text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to"
          >
            Đăng xuất
          </button>
        </header>
        <main className="flex flex-1 flex-col bg-background p-6">{children}</main>
      </div>
    </div>
  );
}
