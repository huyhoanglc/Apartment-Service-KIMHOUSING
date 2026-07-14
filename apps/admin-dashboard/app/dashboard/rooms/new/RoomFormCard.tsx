"use client";

import { useState } from "react";
import { formatThousands, stripThousands } from "@/app/lib/formatNumber";
import { ROOM_TYPE_LABEL, ROOM_STATUS_LABEL } from "../../apartments/RoomCard";
import ChipToggleGroup from "./ChipToggleGroup";
import ImageDropzone, { type StagedImage } from "./ImageDropzone";
import type { RoomFieldErrors, WizardRoomValues } from "./types";

export interface Feature {
  id: string;
  name: string;
}

const inputClass =
  "w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-navy/70";
const errorInputClass = "border-red-400";

export default function RoomFormCard({
  values,
  onChange,
  images,
  onImagesChange,
  errors,
  features,
  featuresError,
  onAddFeature,
  addingFeature,
  onDeleteFeature,
  onImageClick,
}: {
  values: WizardRoomValues;
  onChange: <K extends keyof WizardRoomValues>(key: K, value: WizardRoomValues[K]) => void;
  images: StagedImage[];
  onImagesChange: (images: StagedImage[]) => void;
  errors: RoomFieldErrors;
  features: Feature[];
  featuresError: string | null;
  onAddFeature: (name: string) => void;
  addingFeature: boolean;
  onDeleteFeature?: (id: string) => void;
  onImageClick?: (index: number) => void;
}) {
  const [newFeatureName, setNewFeatureName] = useState("");

  function toggleFeature(id: string) {
    onChange(
      "featureIds",
      values.featureIds.includes(id)
        ? values.featureIds.filter((f) => f !== id)
        : [...values.featureIds, id]
    );
  }

  function handleAddFeatureClick() {
    const name = newFeatureName.trim();
    if (!name) return;
    onAddFeature(name);
    setNewFeatureName("");
  }

  return (
    <div className="animate-fade-in space-y-5 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div>
        <h2 className="mb-4 text-base font-semibold text-navy">Thông tin phòng</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Mã phòng *</label>
              <input
                value={values.code}
                onChange={(e) => onChange("code", e.target.value)}
                placeholder="VD: A-301"
                className={`${inputClass} ${errors.code ? errorInputClass : ""}`}
              />
              {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
            </div>
            <div>
              <label className={labelClass}>Loại phòng *</label>
              <select
                value={values.roomType}
                onChange={(e) => onChange("roomType", e.target.value as WizardRoomValues["roomType"])}
                className={`${inputClass} ${errors.roomType ? errorInputClass : ""}`}
              >
                <option value="" disabled>
                  -- Chọn --
                </option>
                {Object.entries(ROOM_TYPE_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.roomType && <p className="mt-1 text-xs text-red-600">{errors.roomType}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Diện tích (m²) *</label>
              <input
                type="number"
                min={0}
                step="0.1"
                value={values.area}
                onChange={(e) => onChange("area", e.target.value)}
                className={`${inputClass} ${errors.area ? errorInputClass : ""}`}
              />
              {errors.area && <p className="mt-1 text-xs text-red-600">{errors.area}</p>}
            </div>
            <div>
              <label className={labelClass}>Trạng thái</label>
              <select
                value={values.status}
                onChange={(e) => onChange("status", e.target.value as WizardRoomValues["status"])}
                className={inputClass}
              >
                {Object.entries(ROOM_STATUS_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Giá chủ nhà (đ) *</label>
              <input
                type="text"
                inputMode="numeric"
                value={formatThousands(values.basePrice)}
                onChange={(e) => onChange("basePrice", stripThousands(e.target.value))}
                placeholder="VD: 11.000.000"
                className={`${inputClass} ${errors.price ? errorInputClass : ""}`}
              />
            </div>
            <div>
              <label className={labelClass}>Giá công khai (đ) *</label>
              <input
                type="text"
                inputMode="numeric"
                value={formatThousands(values.publicPrice)}
                onChange={(e) => onChange("publicPrice", stripThousands(e.target.value))}
                placeholder="VD: 12.500.000"
                className={`${inputClass} ${errors.price ? errorInputClass : ""}`}
              />
            </div>
          </div>
          {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
        </div>
      </div>

      <div className="border-t border-navy/10 pt-5">
        <span className={labelClass}>Tiện ích</span>

        {featuresError && <p className="mb-2 text-sm text-red-600">{featuresError}</p>}

        <ChipToggleGroup
          options={features.map((f) => ({ id: f.id, label: f.name }))}
          selected={values.featureIds}
          onToggle={toggleFeature}
          onDelete={onDeleteFeature}
        />

        <div className="mt-3 flex gap-2">
          <input
            value={newFeatureName}
            onChange={(e) => setNewFeatureName(e.target.value)}
            placeholder="Thêm tiện ích mới, VD: Khoá thông minh"
            className={inputClass}
          />
          <button
            type="button"
            disabled={addingFeature}
            onClick={handleAddFeatureClick}
            className="whitespace-nowrap rounded-lg border border-navy/15 px-3 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to disabled:opacity-50"
          >
            + Thêm
          </button>
        </div>
      </div>

      <div className="border-t border-navy/10 pt-5">
        <span className={labelClass}>Hình ảnh *</span>
        <ImageDropzone images={images} onChange={onImagesChange} error={errors.images} onImageClick={onImageClick} />
      </div>
    </div>
  );
}
