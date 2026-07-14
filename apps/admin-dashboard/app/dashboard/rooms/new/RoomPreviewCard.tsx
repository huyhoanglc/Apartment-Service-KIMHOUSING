"use client";

import { useState } from "react";
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

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-4 w-4"
    >
      <path
        d="M10 17s-6.5-4-6.5-9A3.8 3.8 0 0 1 10 5.5 3.8 3.8 0 0 1 16.5 8c0 5-6.5 9-6.5 9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <path d="M3 10a6.5 6.5 0 1 1 3.2 5.6L3 16.5l1-3.2A6.4 6.4 0 0 1 3 10Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <circle cx="15" cy="5" r="2" />
      <circle cx="5" cy="10" r="2" />
      <circle cx="15" cy="15" r="2" />
      <path d="m6.7 9 6.6-3.1M6.7 11l6.6 3.1" strokeLinecap="round" />
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
  onImageClick,
  isNewProject,
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
  onImageClick?: (index: number) => void;
  isNewProject?: boolean;
}) {
  const price = Number(publicPrice) || 0;
  const [liked, setLiked] = useState(false);

  return (
    <div className="sticky top-6 overflow-hidden rounded-[20px] border border-navy/10 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <div className="group relative w-full bg-navy/5">
        <PhotoGalleryGrid images={imageUrls} heightClass="h-80" onImageClick={onImageClick} />

        {isNewProject && (
          <span className="absolute top-3 left-3 rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-2.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
            NEW
          </span>
        )}

        <span
          className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${ROOM_STATUS_BADGE[status]}`}
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

        <div className="mt-4 flex items-center gap-4 border-t border-navy/10 pt-3">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
              liked ? "text-rose-600" : "text-navy/50 hover:text-rose-500"
            }`}
          >
            <HeartIcon filled={liked} />
            Thích
          </button>
          <span className="flex items-center gap-1.5 text-sm font-medium text-navy/50">
            <CommentIcon />0
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-navy/50">
            <ShareIcon />
            Chia sẻ
          </span>
        </div>
      </div>
    </div>
  );
}
