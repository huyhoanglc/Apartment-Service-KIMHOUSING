"use client";

import { useRef, useState } from "react";

export interface StagedImage {
  id: string;
  file: File;
  previewUrl: string;
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7">
      <path d="M10 13V4M10 4 6.5 7.5M10 4l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 13v2a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3 w-3">
      <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
    </svg>
  );
}

function makeStagedImage(file: File): StagedImage {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    previewUrl: URL.createObjectURL(file),
  };
}

export default function ImageDropzone({
  images,
  onChange,
  error,
  onImageClick,
}: {
  images: StagedImage[];
  onChange: (images: StagedImage[]) => void;
  error?: string;
  onImageClick?: (index: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  function addFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;
    onChange([...images, ...files.map(makeStagedImage)]);
  }

  function handleRemove(id: string) {
    const removed = images.find((img) => img.id === id);
    if (removed) URL.revokeObjectURL(removed.previewUrl);
    onChange(images.filter((img) => img.id !== id));
  }

  function handleReorderDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const fromIndex = images.findIndex((i) => i.id === draggedId);
    const toIndex = images.findIndex((i) => i.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const next = images.slice();
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    onChange(next);
    setDraggedId(null);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors duration-200 ${
          dragOver ? "border-gold bg-gold/5 text-gold-to" : "border-navy/15 text-navy/40 hover:border-gold/60"
        } ${error ? "border-red-300" : ""}`}
      >
        <UploadIcon />
        <p className="text-sm font-medium text-navy">Kéo thả ảnh vào đây</p>
        <p className="text-xs text-navy/50">hoặc bấm để chọn ảnh từ máy</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((img, index) => (
            <div
              key={img.id}
              draggable
              onDragStart={() => setDraggedId(img.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleReorderDrop(img.id)}
              className="group relative aspect-square cursor-grab overflow-hidden rounded-lg border border-navy/10 bg-navy/5 active:cursor-grabbing"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- preview ảnh local (blob URL) trước khi upload lên Cloudinary */}
              <img
                src={img.previewUrl}
                alt=""
                onClick={onImageClick ? () => onImageClick(index) : undefined}
                className={`h-full w-full object-cover ${onImageClick ? "cursor-zoom-in" : ""}`}
              />
              {index === 0 ? (
                <span className="absolute top-1.5 left-1.5 rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-2 py-0.5 text-[10px] font-semibold text-navy shadow-sm">
                  Ảnh bìa
                </span>
              ) : (
                <span className="absolute top-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy/70 text-[10px] font-semibold text-white">
                  {index + 1}
                </span>
              )}
              <button
                type="button"
                onClick={() => handleRemove(img.id)}
                className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy/70 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-label="Xoá ảnh"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
