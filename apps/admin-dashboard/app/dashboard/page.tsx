"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { apiFetch } from "@/app/lib/api";
import { getUser, type AuthUser } from "@/app/lib/auth";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

interface Stats {
  apartments: number;
  rooms: number;
  available: number;
  rented: number;
}

const STAT_CARDS: { key: keyof Stats; label: string }[] = [
  { key: "apartments", label: "Apartments" },
  { key: "rooms", label: "Tổng số phòng" },
  { key: "available", label: "Phòng còn trống" },
  { key: "rented", label: "Phòng đã thuê" },
];

export default function DashboardPage() {
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const [aptRes, roomRes] = await Promise.all([
          apiFetch("/api/apartments"),
          apiFetch("/api/rooms"),
        ]);
        const apartments = await aptRes.json();
        const rooms = await roomRes.json();
        if (ignore) return;

        if (!aptRes.ok || !roomRes.ok) {
          setError("Không tải được thống kê");
          return;
        }

        setStats({
          apartments: apartments.length,
          rooms: rooms.length,
          available: rooms.filter((r: { status: string }) => r.status === "AVAILABLE").length,
          rented: rooms.filter((r: { status: string }) => r.status === "RENTED").length,
        });
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold text-navy">Xin chào, {user?.name}</h1>
      <p className="mb-6 text-sm text-navy/60">Tổng quan hệ thống quản lý Kim Housing</p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STAT_CARDS.map((card) => (
            <div key={card.key} className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-medium tracking-wide text-navy/50 uppercase">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-navy">{stats[card.key]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
