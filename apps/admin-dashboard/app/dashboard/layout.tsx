"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/dashboard/Header";
import { getToken, getUser, clearSession, type AuthUser } from "@/app/lib/auth";
import { useToast } from "@/app/components/ToastProvider";
import { PageTitleProvider } from "@/app/components/PageTitleContext";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
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
        <div className="flex flex-1 flex-col overflow-x-hidden">
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
