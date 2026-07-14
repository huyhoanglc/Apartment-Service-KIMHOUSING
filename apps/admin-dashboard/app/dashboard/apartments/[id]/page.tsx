"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { getUser } from "@/app/lib/auth";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { useConfirm } from "@/app/components/ConfirmProvider";
import { useToast } from "@/app/components/ToastProvider";
import { usePageTitle } from "@/app/components/PageTitleContext";

interface Room {
  id: string;
  code: string;
  roomType: "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM" | "THREE_BEDROOM";
  area: number;
  basePrice?: number;
  publicPrice: number;
  status: "AVAILABLE" | "ABOUT_TO_VACATE" | "RENTED" | "HIDDEN";
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
  THREE_BEDROOM: "3 phòng ngủ",
};

const ROOM_STATUS_LABEL: Record<Room["status"], string> = {
  AVAILABLE: "Còn trống",
  ABOUT_TO_VACATE: "Sắp trống",
  RENTED: "Đã thuê",
  HIDDEN: "Ẩn",
};

export default function ApartmentDetailPage() {
  const confirmDialog = useConfirm();
  const { showToast } = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<ApartmentDetail | null>(null);
  usePageTitle(apartment ? `${apartment.houseNumber} ${apartment.street}` : "Chi tiết Apartment");
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
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
    const ok = await confirmDialog({
      title: "Xoá phòng?",
      description: "Hành động này không thể hoàn tác.",
      confirmText: "Xoá",
      danger: true,
    });
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await apiFetch(`/api/rooms/${roomId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showToast(data.message ?? "Xoá thất bại", "error");
        return;
      }
      setApartment((prev) => (prev ? { ...prev, rooms: prev.rooms.filter((r) => r.id !== roomId) } : prev));
      showToast("Đã xoá phòng", "success");
    } finally {
      setDeleting(false);
    }
  }

  async function handleDeleteApartment() {
    if (!apartment) return;
    const ok = await confirmDialog({
      title: "Xoá apartment?",
      description: "Toàn bộ phòng và dữ liệu liên quan sẽ bị xoá. Hành động này không thể hoàn tác.",
      confirmText: "Xoá",
      danger: true,
    });
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await apiFetch(`/api/apartments/${apartment.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showToast(data.message ?? "Xoá thất bại", "error");
        return;
      }
      showToast("Đã xoá apartment", "success");
      router.push("/dashboard/apartments");
    } finally {
      setDeleting(false);
    }
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!apartment) return <p className="text-sm text-navy/60">Đang tải...</p>;

  return (
    <div>
      <LoadingOverlay show={deleting} label="Đang xoá..." />

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy">
            {apartment.houseNumber} {apartment.street}
            {apartment.buildingName ? ` (${apartment.buildingName})` : ""}
          </h1>
          <p className="text-sm text-navy/60">
            {apartment.district} · {ACCESS_TYPE_LABEL[apartment.accessType]} · {apartment.managerName} -{" "}
            {apartment.managerPhone}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href={`/dashboard/apartments/${apartment.id}/edit`}
            className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
          >
            Sửa Apartment
          </Link>
          {isAdmin && (
            <button
              onClick={handleDeleteApartment}
              className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-300 hover:border-red-400 hover:bg-red-50"
            >
              Xoá Apartment
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy">
            Phòng ({apartment.rooms.length}/{apartment.totalRooms})
          </h2>
          <Link
            href={`/dashboard/apartments/${apartment.id}/rooms/new`}
            className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            + Thêm phòng
          </Link>
        </div>

        {apartment.rooms.length === 0 && <p className="text-sm text-navy/60">Chưa có phòng nào.</p>}

        {apartment.rooms.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy/10 text-left text-navy/50">
                  <th className="py-2 pr-4 font-medium">Mã phòng</th>
                  <th className="py-2 pr-4 font-medium">Loại</th>
                  <th className="py-2 pr-4 font-medium">Diện tích</th>
                  <th className="py-2 pr-4 font-medium">Giá gốc</th>
                  <th className="py-2 pr-4 font-medium">Giá công khai</th>
                  <th className="py-2 pr-4 font-medium">Trạng thái</th>
                  <th className="py-2 pr-4 font-medium">Tiện ích</th>
                  <th className="py-2 pr-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {apartment.rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="border-b border-navy/5 text-navy transition-colors duration-200 hover:bg-navy/2"
                  >
                    <td className="py-3 pr-4">{room.code}</td>
                    <td className="py-3 pr-4">{ROOM_TYPE_LABEL[room.roomType]}</td>
                    <td className="py-3 pr-4">{room.area} m²</td>
                    <td className="py-3 pr-4">{room.basePrice?.toLocaleString("vi-VN") ?? "-"}</td>
                    <td className="py-3 pr-4">{room.publicPrice.toLocaleString("vi-VN")}</td>
                    <td className="py-3 pr-4">{ROOM_STATUS_LABEL[room.status]}</td>
                    <td className="py-3 pr-4">
                      {room.features.map((rf) => rf.feature.name).join(", ") || "-"}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/dashboard/apartments/${apartment.id}/rooms/${room.id}`}
                          className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
                        >
                          Ảnh/Video
                        </Link>
                        <Link
                          href={`/dashboard/apartments/${apartment.id}/rooms/${room.id}/edit`}
                          className="text-navy/60 underline transition-colors duration-300 hover:text-gold-to"
                        >
                          Sửa
                        </Link>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="text-red-600 underline transition-colors duration-300 hover:text-red-700"
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
    </div>
  );
}
