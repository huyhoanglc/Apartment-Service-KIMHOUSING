import Link from "next/link";

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

const ROOM_STATUS_BADGE: Record<RoomStatus, string> = {
  AVAILABLE: "bg-emerald-500 text-white",
  ABOUT_TO_VACATE: "bg-amber-500 text-white",
  RENTED: "bg-navy/70 text-white",
  HIDDEN: "bg-navy/30 text-white",
};

function ImagePlaceholderIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-6 w-6">
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <circle cx="7" cy="9" r="1.5" />
      <path d="m4 14 4-3.5 3 2.5 3.5-3.5 3.5 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RoomCard({ room }: { room: RoomListItem }) {
  const images = room.media
    .filter((m) => m.type === "IMAGE")
    .slice()
    .sort((a, b) => a.order - b.order);
  const [main, ...rest] = images;
  const thumbs = rest.slice(0, 4);
  const extraCount = Math.max(0, rest.length - thumbs.length);

  const roomHref = `/dashboard/apartments/${room.apartment.id}/rooms/${room.id}`;
  const apartmentHref = `/dashboard/apartments/${room.apartment.id}`;

  return (
    <div className="group overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link href={roomHref} className="block">
        <div className="relative flex h-48 gap-0.5 bg-navy/5">
          {main ? (
            <div className={`relative h-full overflow-hidden ${thumbs.length > 0 ? "w-3/5" : "w-full"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary do người dùng upload, không nằm trong danh sách domain tối ưu hoá tĩnh */}
              <img
                src={main.url}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-navy/30">
              <ImagePlaceholderIcon />
              <span className="text-xs">Chưa có ảnh</span>
            </div>
          )}

          {thumbs.length > 0 && (
            <div className="grid w-2/5 grid-cols-2 gap-0.5">
              {thumbs.map((m, i) => (
                <div key={m.id} className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary do người dùng upload, không nằm trong danh sách domain tối ưu hoá tĩnh */}
                  <img src={m.url} alt="" className="h-full w-full object-cover" />
                  {i === thumbs.length - 1 && extraCount > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-navy/60 text-sm font-semibold text-white">
                      +{extraCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <span
            className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm ${ROOM_STATUS_BADGE[room.status]}`}
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
