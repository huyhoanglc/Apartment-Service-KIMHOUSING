"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import { getUser, type AuthUser } from "@/app/lib/auth";
import { usePageTitle } from "@/app/components/PageTitleContext";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

interface Apartment {
  id: string;
  houseNumber: string;
  street: string;
  district: string;
  buildingName: string | null;
  managerName: string;
  managerPhone: string;
  totalRooms: number;
  rooms: { id: string }[];
}

interface Stats {
  apartments: number;
  rooms: number;
  available: number;
  rented: number;
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <rect x="4" y="2" width="12" height="16" rx="1" />
      <path d="M7 6h1M12 6h1M7 9.5h1M12 9.5h1M7 13h1M12 13h1" strokeLinecap="round" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <rect x="5" y="2.5" width="10" height="15" rx="1" />
      <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <circle cx="10" cy="10" r="7.5" />
      <path d="m6.8 10 2.2 2.2 4.2-4.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <circle cx="7" cy="13" r="3" />
      <path d="M9.2 10.8 15.5 4.5M13 7l1.8 1.8M15 5l1.8 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STAT_CARDS: {
  key: keyof Stats;
  label: string;
  icon: () => React.ReactElement;
  badge: string;
}[] = [
  { key: "apartments", label: "Apartments", icon: BuildingIcon, badge: "bg-navy text-white" },
  { key: "rooms", label: "Tổng số phòng", icon: DoorIcon, badge: "bg-indigo-500 text-white" },
  { key: "available", label: "Phòng còn trống", icon: CheckIcon, badge: "bg-emerald-500 text-white" },
  { key: "rented", label: "Phòng đã thuê", icon: KeyIcon, badge: "bg-linear-to-br from-gold-from via-gold-via to-gold-to text-navy" },
];

export default function DashboardPage() {
  usePageTitle("Tổng quan");
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      try {
        // Chỉ cần .total nên gọi pageSize=1 cho các số liệu thống kê để tránh tải dư dữ liệu;
        // riêng danh sách apartment lấy pageSize=5 để hiển thị bảng xem nhanh ở dưới.
        const [aptListRes, aptCountRes, roomCountRes, availableRes, rentedRes] = await Promise.all([
          apiFetch("/api/apartments?pageSize=5"),
          apiFetch("/api/apartments?pageSize=1"),
          apiFetch("/api/rooms?pageSize=1"),
          apiFetch("/api/rooms?status=AVAILABLE&pageSize=1"),
          apiFetch("/api/rooms?status=RENTED&pageSize=1"),
        ]);
        const aptList = await aptListRes.json();
        const aptCount = await aptCountRes.json();
        const roomCount = await roomCountRes.json();
        const available = await availableRes.json();
        const rented = await rentedRes.json();
        if (ignore) return;

        if (!aptListRes.ok || !aptCountRes.ok || !roomCountRes.ok || !availableRes.ok || !rentedRes.ok) {
          setError("Không tải được thống kê");
          return;
        }

        setApartments(aptList.data ?? []);
        setStats({
          apartments: aptCount.total ?? 0,
          rooms: roomCount.total ?? 0,
          available: available.total ?? 0,
          rented: rented.total ?? 0,
        });
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      } finally {
        if (!ignore) setLoading(false);
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

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {stats && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.key} className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium tracking-wide text-navy/50 uppercase">{card.label}</p>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.badge}`}>
                    <Icon />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold text-navy">{stats[card.key]}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-navy">Danh sách Apartments</h2>
          <Link
            href="/dashboard/apartments"
            className="text-sm text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
          >
            Xem tất cả
          </Link>
        </div>

        {loading && <p className="text-sm text-navy/60">Đang tải...</p>}

        {!loading && apartments.length === 0 && (
          <p className="text-sm text-navy/60">Chưa có apartment nào.</p>
        )}

        {!loading && apartments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy/10 text-left text-navy/50">
                  <th className="py-2 pr-4 font-medium">Địa chỉ</th>
                  <th className="py-2 pr-4 font-medium">Quận</th>
                  <th className="py-2 pr-4 font-medium">Quản lý</th>
                  <th className="py-2 pr-4 font-medium">Lấp đầy</th>
                  <th className="py-2 pr-4 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {apartments.map((apt) => {
                  const filled = apt.totalRooms > 0 ? (apt.rooms.length / apt.totalRooms) * 100 : 0;
                  return (
                    <tr key={apt.id} className="border-b border-navy/5 text-navy transition-colors duration-200 hover:bg-navy/2">
                      <td className="py-3 pr-4">
                        {apt.houseNumber} {apt.street}
                        {apt.buildingName ? ` (${apt.buildingName})` : ""}
                      </td>
                      <td className="py-3 pr-4">{apt.district}</td>
                      <td className="py-3 pr-4">
                        {apt.managerName} - {apt.managerPhone}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-navy/10">
                            <div
                              className="h-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to"
                              style={{ width: `${filled}%` }}
                            />
                          </div>
                          <span className="text-xs text-navy/50">
                            {apt.rooms.length}/{apt.totalRooms}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-right">
                        <Link
                          href={`/dashboard/apartments/${apt.id}`}
                          className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
                        >
                          Xem
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
