"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/auth";

interface Room {
  id: string;
  code: string;
  roomType: "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM";
  area: number;
  basePrice?: number;
  publicPrice: number;
  status: "AVAILABLE" | "RENTED" | "HIDDEN";
  features: { feature: { id: string; name: string } }[];
}

interface ApartmentDetail {
  id: string;
  houseNumber: string;
  street: string;
  district: string;
  buildingName: string | null;
  managerName: string;
  managerPhone: string;
  accessType: "STAIRS" | "ELEVATOR" | "BOTH";
  totalRooms: number;
  rooms: Room[];
}

const ACCESS_TYPE_LABEL: Record<ApartmentDetail["accessType"], string> = {
  STAIRS: "Cầu thang bộ",
  ELEVATOR: "Thang máy",
  BOTH: "Cả hai",
};

const ROOM_TYPE_LABEL: Record<Room["roomType"], string> = {
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  ONE_BEDROOM: "1 phòng ngủ",
  TWO_BEDROOM: "2 phòng ngủ",
};

const ROOM_STATUS_LABEL: Record<Room["status"], string> = {
  AVAILABLE: "Còn trống",
  RENTED: "Đã thuê",
  HIDDEN: "Ẩn",
};

export default function ApartmentDetailPage() {
  const params = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<ApartmentDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = getUser()?.role === "ADMIN";

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch(`/api/apartments/${params.id}`);
        const data = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(data.message ?? "Không tải được apartment");
          return;
        }
        setApartment(data);
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, [params.id]);

  async function handleDeleteRoom(roomId: string) {
    if (!confirm("Xoá phòng này? Hành động không thể hoàn tác.")) return;

    const res = await apiFetch(`/api/rooms/${roomId}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message ?? "Xoá thất bại");
      return;
    }
    setApartment((prev) => (prev ? { ...prev, rooms: prev.rooms.filter((r) => r.id !== roomId) } : prev));
  }

  if (error) return <p className="text-sm text-red-600 dark:text-red-400">{error}</p>;
  if (!apartment) return <p className="text-sm text-zinc-600 dark:text-zinc-400">Đang tải...</p>;

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {apartment.houseNumber} {apartment.street}
            {apartment.buildingName ? ` (${apartment.buildingName})` : ""}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {apartment.district} · {ACCESS_TYPE_LABEL[apartment.accessType]} ·{" "}
            {apartment.managerName} - {apartment.managerPhone}
          </p>
        </div>
        <Link
          href={`/dashboard/apartments/${apartment.id}/edit`}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
        >
          Sửa Apartment
        </Link>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Phòng ({apartment.rooms.length}/{apartment.totalRooms})
        </h2>
        <Link
          href={`/dashboard/apartments/${apartment.id}/rooms/new`}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          + Thêm phòng
        </Link>
      </div>

      {apartment.rooms.length === 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Chưa có phòng nào.</p>
      )}

      {apartment.rooms.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                <th className="py-2 pr-4">Mã phòng</th>
                <th className="py-2 pr-4">Loại</th>
                <th className="py-2 pr-4">Diện tích</th>
                <th className="py-2 pr-4">Giá gốc</th>
                <th className="py-2 pr-4">Giá công khai</th>
                <th className="py-2 pr-4">Trạng thái</th>
                <th className="py-2 pr-4">Tiện ích</th>
                <th className="py-2 pr-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {apartment.rooms.map((room) => (
                <tr
                  key={room.id}
                  className="border-b border-zinc-100 text-zinc-900 dark:border-zinc-900 dark:text-zinc-50"
                >
                  <td className="py-2 pr-4">{room.code}</td>
                  <td className="py-2 pr-4">{ROOM_TYPE_LABEL[room.roomType]}</td>
                  <td className="py-2 pr-4">{room.area} m²</td>
                  <td className="py-2 pr-4">{room.basePrice?.toLocaleString("vi-VN") ?? "-"}</td>
                  <td className="py-2 pr-4">{room.publicPrice.toLocaleString("vi-VN")}</td>
                  <td className="py-2 pr-4">{ROOM_STATUS_LABEL[room.status]}</td>
                  <td className="py-2 pr-4">
                    {room.features.map((rf) => rf.feature.name).join(", ") || "-"}
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/dashboard/apartments/${apartment.id}/rooms/${room.id}`}
                        className="text-zinc-600 underline dark:text-zinc-400"
                      >
                        Ảnh/Video
                      </Link>
                      <Link
                        href={`/dashboard/apartments/${apartment.id}/rooms/${room.id}/edit`}
                        className="text-zinc-600 underline dark:text-zinc-400"
                      >
                        Sửa
                      </Link>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-red-600 underline dark:text-red-400"
                        >
                          Xoá
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
