"use client";

import { useEffect } from "react";

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path
        d={direction === "left" ? "M12.5 4.5 6 10l6.5 5.5" : "M7.5 4.5 14 10l-6.5 5.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const open = index !== null && index >= 0 && index < images.length;

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(((index as number) - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % images.length);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, index, images.length, onClose, onNavigate]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-500 flex items-center justify-center bg-black/85 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
      >
        <CloseIcon />
      </button>

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(((index as number) - 1 + images.length) % images.length);
          }}
          aria-label="Ảnh trước"
          className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <ChevronIcon direction="left" />
        </button>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary/blob URL, không nằm trong danh sách domain tối ưu hoá tĩnh */}
      <img
        src={images[index as number]}
        alt=""
        className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(((index as number) + 1) % images.length);
          }}
          aria-label="Ảnh tiếp theo"
          className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
        >
          <ChevronIcon direction="right" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
          {(index as number) + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
