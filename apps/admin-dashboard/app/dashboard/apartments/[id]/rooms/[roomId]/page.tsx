"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import { useConfirm } from "@/app/components/ConfirmProvider";
import { useToast } from "@/app/components/ToastProvider";
import { usePageTitle } from "@/app/components/PageTitleContext";

interface Media {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  order: number;
}

interface RoomDetail {
  id: string;
  code: string;
  roomType: "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM" | "THREE_BEDROOM";
  area: number;
  basePrice?: number;
  publicPrice: number;
  status: "AVAILABLE" | "ABOUT_TO_VACATE" | "RENTED" | "HIDDEN";
  features: { feature: { id: string; name: string } }[];
  media: Media[];
  apartment: {
    houseNumber: string;
    street: string;
    district: string;
    buildingName: string | null;
  };
}

const ROOM_TYPE_LABEL: Record<RoomDetail["roomType"], string> = {
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  ONE_BEDROOM: "1 phòng ngủ",
  TWO_BEDROOM: "2 phòng ngủ",
  THREE_BEDROOM: "3 phòng ngủ",
};

const ROOM_STATUS_LABEL: Record<RoomDetail["status"], string> = {
  AVAILABLE: "Còn trống",
  ABOUT_TO_VACATE: "Sắp trống",
  RENTED: "Đã thuê",
  HIDDEN: "Ẩn",
};

export default function RoomDetailPage() {
  const confirmDialog = useConfirm();
  const { showToast } = useToast();
  const params = useParams<{ id: string; roomId: string }>();
  const [room, setRoom] = useState<RoomDetail | null>(null);
  usePageTitle(room ? `Phòng ${room.code}` : "Chi tiết phòng");
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch(`/api/rooms/${params.roomId}`);
        const result = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(result.message ?? "Không tải được phòng");
          return;
        }
        setRoom(result.data);
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, [params.roomId]);

  async function handleUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const files = fileInputRef.current?.files;
    if (!files || files.length === 0) return;

    setUploadError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("roomId", params.roomId);
      Array.from(files).forEach((file) => formData.append("files", file));

      const res = await apiFetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!res.ok) {
        setUploadError(result.message ?? "Tải lên thất bại");
        return;
      }

      setRoom((prev) => (prev ? { ...prev, media: [...prev.media, ...result.data] } : prev));
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setUploadError("Không thể kết nối đến máy chủ");
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteMedia(id: string) {
    const ok = await confirmDialog({
      title: "Xoá ảnh/video?",
      description: "Hành động này không thể hoàn tác.",
      confirmText: "Xoá",
      danger: true,
    });
    if (!ok) return;

    const res = await apiFetch(`/api/media/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      showToast(data.message ?? "Xoá thất bại", "error");
      return;
    }
    setRoom((prev) => (prev ? { ...prev, media: prev.media.filter((m) => m.id !== id) } : prev));
    showToast("Đã xoá ảnh/video", "success");
  }

  function buildRoomText(r: RoomDetail): string {
    const address = `${r.apartment.houseNumber} ${r.apartment.street}${
      r.apartment.buildingName ? ` (${r.apartment.buildingName})` : ""
    }, ${r.apartment.district}`;
    const featureLine = r.features.map((rf) => rf.feature.name).join(", ") || "Đang cập nhật";

    // Chỉ dùng publicPrice - đây là text gửi cho khách, KHÔNG được lộ basePrice nội bộ
    return [
      `🏠 Phòng ${r.code} - ${address}`,
      `Loại phòng: ${ROOM_TYPE_LABEL[r.roomType]}`,
      `Diện tích: ${r.area} m²`,
      `Giá thuê: ${r.publicPrice.toLocaleString("vi-VN")} đ/tháng`,
      `Tiện ích: ${featureLine}`,
    ].join("\n");
  }

  async function handleCopyText() {
    if (!room) return;
    try {
      await navigator.clipboard.writeText(buildRoomText(room));
      setCopyFeedback("Đã copy thông tin phòng!");
    } catch {
      setCopyFeedback("Trình duyệt không hỗ trợ copy, vui lòng thử lại");
    } finally {
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  }

  async function handleCopyImage(url: string) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      setCopyFeedback("Đã copy ảnh!");
    } catch {
      setCopyFeedback("Copy ảnh thất bại, trình duyệt có thể chưa hỗ trợ");
    } finally {
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!room) return <p className="text-sm text-navy/60">Đang tải...</p>;

  return (
    <div>
      <LoadingOverlay show={uploading} label="Đang tải ảnh/video lên..." />

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy">Phòng {room.code}</h1>
          <p className="text-sm text-navy/60">
            {ROOM_TYPE_LABEL[room.roomType]} · {room.area} m² · {ROOM_STATUS_LABEL[room.status]}
          </p>
          <p className="text-sm text-navy/60">
            Giá gốc: {room.basePrice?.toLocaleString("vi-VN") ?? "-"} · Giá công khai:{" "}
            {room.publicPrice.toLocaleString("vi-VN")}
          </p>
          <p className="text-sm text-navy/60">
            Tiện ích: {room.features.map((rf) => rf.feature.name).join(", ") || "-"}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={handleCopyText}
            className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
          >
            Copy text thông tin phòng
          </button>
          <Link
            href={`/dashboard/apartments/${params.id}/rooms/${room.id}/edit`}
            className="rounded-md border border-navy/15 px-4 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
          >
            Sửa thông tin phòng
          </Link>
        </div>
      </div>

      {copyFeedback && <p className="mb-4 text-sm text-green-600">{copyFeedback}</p>}

      <div className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-navy">Ảnh / Video</h2>

        <form onSubmit={handleUpload} className="mb-6 flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/x-msvideo"
            className="text-sm text-navy"
          />
          <button
            type="submit"
            disabled={uploading}
            className="whitespace-nowrap rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-50"
          >
            {uploading ? "Đang tải lên..." : "Tải lên"}
          </button>
        </form>

        {uploadError && <p className="mb-4 text-sm text-red-600">{uploadError}</p>}

        {room.media.length === 0 && <p className="text-sm text-navy/60">Chưa có ảnh/video nào.</p>}

        {room.media.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {room.media.map((m) => (
              <div key={m.id} className="overflow-hidden rounded-md border border-navy/10">
                {m.type === "IMAGE" ? (
                  // eslint-disable-next-line @next/next/no-img-element -- ảnh do người dùng upload lên Cloudinary, không nằm trong danh sách domain tối ưu hoá tĩnh
                  <img src={m.url} alt="" className="aspect-square w-full object-cover" />
                ) : (
                  <video src={m.url} controls className="aspect-square w-full object-cover" />
                )}
                <div className="flex">
                  {m.type === "IMAGE" && (
                    <button
                      onClick={() => handleCopyImage(m.url)}
                      className="flex-1 bg-navy/3 py-1.5 text-xs font-medium text-navy transition-colors duration-300 hover:bg-navy/5 hover:text-gold-to"
                    >
                      Copy ảnh
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMedia(m.id)}
                    className="flex-1 bg-navy/3 py-1.5 text-xs font-medium text-red-600 transition-colors duration-300 hover:bg-navy/5 hover:text-red-700"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
