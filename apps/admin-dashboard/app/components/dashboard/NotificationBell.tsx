"use client";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Inbox } from "lucide-react";
import { apiFetch } from "@/app/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Skeleton } from "@/app/components/ui/skeleton";

interface NotificationItem {
  id: string;
  message: string;
  isRead: boolean;
  apartmentId: string | null;
  createdAt: string;
  timeLabel: string;
}

// Tính "x phút trước" tại thời điểm fetch (không gọi Date.now() lúc render - vi phạm rule
// react-hooks/purity vì component có thể render lại nhiều lần với cùng 1 tập dữ liệu)
function formatTimeAgo(iso: string, now: number): string {
  const diffMs = now - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

async function fetchUnreadCount(): Promise<number> {
  const res = await apiFetch("/api/notifications/unread-count");
  if (!res.ok) throw new Error("unread-count failed");
  const result = await res.json();
  return result.data.count as number;
}

async function fetchNotifications(): Promise<NotificationItem[]> {
  const res = await apiFetch("/api/notifications?pageSize=20");
  if (!res.ok) throw new Error("notifications failed");
  const result = await res.json();
  const now = Date.now();
  const raw = result.data as Array<Omit<NotificationItem, "timeLabel">>;
  return raw.map((n) => ({ ...n, timeLabel: formatTimeAgo(n.createdAt, now) }));
}

export default function NotificationBell() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const unreadQuery = useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: fetchUnreadCount,
    refetchInterval: 60_000,
  });

  const listQuery = useQuery({
    queryKey: ["notifications", "list"],
    queryFn: fetchNotifications,
    enabled: false,
    staleTime: 15_000,
  });

  const unreadCount = unreadQuery.data ?? 0;

  function handleOpenChange(open: boolean) {
    if (open) listQuery.refetch();
  }

  function markRead(id: string) {
    queryClient.setQueryData<NotificationItem[]>(["notifications", "list"], (prev) =>
      prev?.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    queryClient.setQueryData<number>(["notifications", "unread-count"], (c) => Math.max(0, (c ?? 1) - 1));
    apiFetch(`/api/notifications/${id}/read`, { method: "PATCH" }).catch(() => {});
  }

  function handleItemClick(item: NotificationItem) {
    if (!item.isRead) markRead(item.id);
    if (item.apartmentId) router.push(`/dashboard/apartments/${item.apartmentId}`);
  }

  function handleMarkAllRead() {
    queryClient.setQueryData<NotificationItem[]>(["notifications", "list"], (prev) =>
      prev?.map((n) => ({ ...n, isRead: true }))
    );
    queryClient.setQueryData(["notifications", "unread-count"], 0);
    apiFetch("/api/notifications/read-all", { method: "PATCH" }).catch(() => {});
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-navy/60 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
          aria-label="Thông báo"
        >
          <Bell className="h-5 w-5" strokeWidth={1.8} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 py-2">
        <div className="flex items-center justify-between px-4 pb-2">
          <p className="text-xs font-medium tracking-wide text-navy/40 uppercase">Thông báo</p>
          {unreadCount > 0 && (
            <button type="button" onClick={handleMarkAllRead} className="text-xs text-gold-to hover:underline">
              Đánh dấu đã đọc tất cả
            </button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {listQuery.isFetching && (
            <div className="space-y-2 px-4 py-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="space-y-1.5 py-1.5">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>
          )}

          {!listQuery.isFetching && listQuery.isError && (
            <p className="px-4 py-6 text-center text-sm text-navy/50">Không tải được thông báo.</p>
          )}

          {!listQuery.isFetching && listQuery.data?.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <Inbox className="h-6 w-6 text-navy/20" />
              <p className="text-sm text-navy/50">Không có thông báo nào.</p>
            </div>
          )}

          {!listQuery.isFetching &&
            listQuery.data?.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item)}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 hover:bg-navy/5 ${
                  item.isRead ? "text-navy/60" : "font-medium text-navy"
                }`}
              >
                <p>{item.message}</p>
                <p className="mt-0.5 text-xs text-navy/40">{item.timeLabel}</p>
              </button>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
