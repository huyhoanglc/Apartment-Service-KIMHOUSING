import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PhotoGalleryGrid from "@/app/components/PhotoGalleryGrid";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip";

export type RoomType = "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM" | "THREE_BEDROOM";
export type RoomStatus = "AVAILABLE" | "ABOUT_TO_VACATE" | "RENTED" | "HIDDEN";

export interface RoomListItem {
  id: string;
  code: string;
  roomType: RoomType;
  area: number;
  publicPrice: number;
  status: RoomStatus;
  updatedAt: string;
  media: { id: string; url: string; type: "IMAGE" | "VIDEO"; order: number }[];
  apartment: {
    id: string;
    houseNumber: string;
    street: string;
    district: string;
    buildingName: string | null;
    isNewProject?: boolean;
  };
}

export const ROOM_TYPE_LABEL: Record<RoomType, string> = {
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  ONE_BEDROOM: "1 phòng ngủ",
  TWO_BEDROOM: "2 phòng ngủ",
  THREE_BEDROOM: "3 phòng ngủ",
};

export const ROOM_STATUS_LABEL: Record<RoomStatus, string> = {
  AVAILABLE: "Còn trống",
  ABOUT_TO_VACATE: "Sắp trống",
  RENTED: "Đã lock",
  HIDDEN: "Ẩn",
};

export const ROOM_STATUS_BADGE: Record<RoomStatus, string> = {
  AVAILABLE: "bg-emerald-500 text-white",
  ABOUT_TO_VACATE: "bg-amber-500 text-white",
  RENTED: "bg-navy/70 text-white",
  HIDDEN: "bg-navy/30 text-white",
};

export default function RoomCard({
  room,
  selected,
  onToggleSelect,
  onQuickView,
  onDelete,
}: {
  room: RoomListItem;
  selected?: boolean;
  onToggleSelect?: (id: string) => void;
  onQuickView?: (room: RoomListItem) => void;
  onDelete?: (room: RoomListItem) => void;
}) {
  const imageUrls = room.media
    .filter((m) => m.type === "IMAGE")
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((m) => m.url);

  const roomHref = `/dashboard/apartments/${room.apartment.id}/rooms/${room.id}`;
  const apartmentHref = `/dashboard/apartments/${room.apartment.id}`;
  const editHref = `/dashboard/apartments/${room.apartment.id}/rooms/${room.id}/edit`;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      {onToggleSelect && (
        <label
          className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-md bg-white/90 shadow-sm backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox checked={!!selected} onCheckedChange={() => onToggleSelect(room.id)} aria-label="Chọn phòng" />
        </label>
      )}

      <Link href={roomHref} className="block">
        <div className="relative bg-navy/5">
          <PhotoGalleryGrid images={imageUrls} heightClass="h-48" />

          {room.apartment.isNewProject && (
            <span className="absolute top-2 left-9 rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-2 py-0.5 text-xs font-bold tracking-wide text-white shadow-sm">
              NEW
            </span>
          )}

          <span
            className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm ${ROOM_STATUS_BADGE[room.status]}`}
          >
            {ROOM_STATUS_LABEL[room.status]}
          </span>
        </div>
      </Link>

      <div className="p-3">
        <Link
          href={apartmentHref}
          className="block truncate text-sm font-medium text-navy transition-colors duration-200 hover:text-gold-to hover:underline"
        >
          {room.apartment.houseNumber} - {room.apartment.street} - {room.apartment.district}
        </Link>
        <div className="flex items-end justify-between gap-2">
          <Link href={roomHref} className="block min-w-0">
            <p className="mt-1 text-base font-semibold text-gold-to">
              {room.publicPrice.toLocaleString("vi-VN")}đ
              <span className="text-xs font-normal text-navy/40">/tháng</span>
            </p>
            <p className="mt-1 text-xs text-navy/50">
              {room.code} - {ROOM_TYPE_LABEL[room.roomType]} - {room.area}m²
            </p>
          </Link>

          {(onQuickView || onDelete) && (
            <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {onQuickView && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => onQuickView(room)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-navy/50 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
                      aria-label="Xem nhanh"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Xem nhanh</TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={editHref}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-navy/50 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
                    aria-label="Sửa"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Sửa</TooltipContent>
              </Tooltip>
              {onDelete && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => onDelete(room)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-red-500/70 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                      aria-label="Xoá"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Xoá</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
