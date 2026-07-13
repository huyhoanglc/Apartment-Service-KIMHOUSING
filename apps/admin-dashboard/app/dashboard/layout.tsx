"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="font-semibold text-zinc-900 dark:text-zinc-50">
            KIMHOUSING
          </Link>
          <Link
            href="/dashboard/apartments"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Apartments
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-zinc-600 dark:text-zinc-400">
            {user.name} ({user.role})
          </span>
          <button
            onClick={handleLogout}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
          >
            Đăng xuất
          </button>
        </div>
      </header>
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  );
}
