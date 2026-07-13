"use client";

import { useSyncExternalStore } from "react";
import { getUser, type AuthUser } from "@/app/lib/auth";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

export default function DashboardPage() {
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);

  return (
    <p className="text-zinc-900 dark:text-zinc-50">
      Xin chào, <strong>{user?.name}</strong>. Chọn mục quản lý ở thanh điều hướng phía trên.
    </p>
  );
}
