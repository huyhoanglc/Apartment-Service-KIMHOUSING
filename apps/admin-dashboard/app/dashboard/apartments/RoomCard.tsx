import Link from "next/link";
import PhotoGalleryGrid from "@/app/components/PhotoGalleryGrid";

export type RoomType = "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM" | "THREE_BEDROOM";
export type RoomStatus = "AVAILABLE" | "ABOUT_TO_VACATE" | "RENTED" | "HIDDEN";

export interface RoomListItem {
  id: string;
  code: string;
  roomType: RoomType;
  area: number;
  publicPrice: number;
  status: RoomStatus;
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

export default function RoomCard({ room }: { room: RoomListItem }) {
  const imageUrls = room.media
    .filter((m) => m.type === "IMAGE")
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((m) => m.url);

  const roomHref = `/dashboard/apartments/${room.apartment.id}/rooms/${room.id}`;
  const apartmentHref = `/dashboard/apartments/${room.apartment.id}`;

  return (
    <div className="group overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link href={roomHref} className="block">
        <div className="relative bg-navy/5">
          <PhotoGalleryGrid images={imageUrls} heightClass="h-48" />

          {room.apartment.isNewProject && (
            <span className="absolute top-2 left-2 rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-2 py-0.5 text-xs font-bold tracking-wide text-white shadow-sm">
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
        <Link href={roomHref} className="block">
          <p className="mt-1 text-base font-semibold text-gold-to">
            {room.publicPrice.toLocaleString("vi-VN")}đ
            <span className="text-xs font-normal text-navy/40">/tháng</span>
          </p>
          <p className="mt-1 text-xs text-navy/50">
            {room.code} - {ROOM_TYPE_LABEL[room.roomType]} - {room.area}m²
          </p>
        </Link>
      </div>
    </div>
  );
}
