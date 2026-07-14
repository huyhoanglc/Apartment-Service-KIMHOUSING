import {
  ROOM_TYPE_LABEL,
  ROOM_STATUS_LABEL,
  ROOM_STATUS_BADGE,
  type RoomType,
  type RoomStatus,
} from "../../apartments/RoomCard";
import PhotoGalleryGrid from "@/app/components/PhotoGalleryGrid";

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5 shrink-0">
      <path d="M10 17.5s6-5.2 6-9.7a6 6 0 1 0-12 0c0 4.5 6 9.7 6 9.7Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="7.8" r="2" />
    </svg>
  );
}

export default function RoomPreviewCard({
  imageUrls,
  code,
  roomType,
  area,
  publicPrice,
  status,
  address,
  district,
  featureLabels,
}: {
  imageUrls: string[];
  code: string;
  roomType: RoomType | "";
  area: string;
  publicPrice: string;
  status: RoomStatus;
  address: string;
  district: string;
  featureLabels: string[];
}) {
  const price = Number(publicPrice) || 0;

  return (
    <div className="sticky top-6 overflow-hidden rounded-[20px] border border-navy/10 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="group relative w-full bg-navy/5">
        <PhotoGalleryGrid images={imageUrls} heightClass="h-80" />

        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${ROOM_STATUS_BADGE[status]}`}
        >
          {ROOM_STATUS_LABEL[status]}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-navy/60">{roomType ? ROOM_TYPE_LABEL[roomType] : "Loại phòng"}</p>
          <p className="text-sm font-medium text-navy/60">{code || "Mã phòng"}</p>
        </div>

        <div className="mt-1 flex items-baseline justify-between gap-2">
          <p className="text-lg font-semibold text-navy">
            {price > 0 ? `${price.toLocaleString("vi-VN")}đ` : "—"}
            <span className="text-xs font-normal text-navy/40">/tháng</span>
          </p>
          <p className="text-sm text-navy/50">{area ? `${area}m²` : "—"}</p>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-navy/60">
          <PinIcon />
          <span className="truncate">
            {address || "Địa chỉ"}
            {district ? `, ${district}` : ""}
          </span>
        </div>

        {featureLabels.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {featureLabels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-navy/5 px-2 py-0.5 text-xs font-medium text-navy/60"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
