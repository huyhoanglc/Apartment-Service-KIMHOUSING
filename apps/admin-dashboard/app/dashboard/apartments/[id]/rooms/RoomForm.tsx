"use client";

import { useEffect, useState, type FormEvent } from "react";
import { apiFetch } from "@/app/lib/api";

export type RoomType = "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM";
export type RoomStatus = "AVAILABLE" | "RENTED" | "HIDDEN";

export interface Feature {
  id: string;
  name: string;
}

export interface RoomFormValues {
  code: string;
  slug: string;
  roomType: RoomType | "";
  area: string;
  basePrice: string;
  publicPrice: string;
  status: RoomStatus;
  featureIds: string[];
}

export const emptyRoomFormValues: RoomFormValues = {
  code: "",
  slug: "",
  roomType: "",
  area: "",
  basePrice: "",
  publicPrice: "",
  status: "AVAILABLE",
  featureIds: [],
};

const inputClass =
  "w-full rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50";
const labelClass = "mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

export default function RoomForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: Partial<RoomFormValues>;
  onSubmit: (values: RoomFormValues) => Promise<string | null>;
  submitLabel: string;
}) {
  const [values, setValues] = useState<RoomFormValues>({
    ...emptyRoomFormValues,
    ...initialValues,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [features, setFeatures] = useState<Feature[]>([]);
  const [featuresError, setFeaturesError] = useState<string | null>(null);
  const [newFeatureName, setNewFeatureName] = useState("");
  const [addingFeature, setAddingFeature] = useState(false);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch("/api/features");
        const data = await res.json();
        if (ignore) return;
        if (!res.ok) {
          setFeaturesError(data.message ?? "Không tải được danh sách tiện ích");
          return;
        }
        setFeatures(data);
      } catch {
        if (!ignore) setFeaturesError("Không thể kết nối đến máy chủ");
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function update<K extends keyof RoomFormValues>(key: K, value: RoomFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function toggleFeature(featureId: string, checked: boolean) {
    update(
      "featureIds",
      checked
        ? [...values.featureIds, featureId]
        : values.featureIds.filter((id) => id !== featureId)
    );
  }

  async function handleAddFeature() {
    const name = newFeatureName.trim();
    if (!name) return;

    setAddingFeature(true);
    setFeaturesError(null);
    try {
      const res = await apiFetch("/api/features", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFeaturesError(data.message ?? "Không thêm được tiện ích");
        return;
      }

      setFeatures((prev) => [...prev, data]);
      update("featureIds", [...values.featureIds, data.id]);
      setNewFeatureName("");
    } catch {
      setFeaturesError("Không thể kết nối đến máy chủ");
    } finally {
      setAddingFeature(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const errMessage = await onSubmit(values);
    setLoading(false);
    if (errMessage) setError(errMessage);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="code" className={labelClass}>
            Mã phòng
          </label>
          <input
            id="code"
            required
            value={values.code}
            onChange={(e) => update("code", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug (duy nhất, dùng cho URL)
          </label>
          <input
            id="slug"
            required
            value={values.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="roomType" className={labelClass}>
            Loại phòng
          </label>
          <select
            id="roomType"
            required
            value={values.roomType}
            onChange={(e) => update("roomType", e.target.value as RoomType)}
            className={inputClass}
          >
            <option value="" disabled>
              -- Chọn --
            </option>
            <option value="STUDIO">Studio</option>
            <option value="DUPLEX">Duplex</option>
            <option value="ONE_BEDROOM">1 phòng ngủ</option>
            <option value="TWO_BEDROOM">2 phòng ngủ</option>
          </select>
        </div>
        <div>
          <label htmlFor="area" className={labelClass}>
            Diện tích (m²)
          </label>
          <input
            id="area"
            type="number"
            min={0}
            step="0.1"
            required
            value={values.area}
            onChange={(e) => update("area", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="basePrice" className={labelClass}>
            Giá gốc (chỉ nội bộ thấy)
          </label>
          <input
            id="basePrice"
            type="number"
            min={0}
            required
            value={values.basePrice}
            onChange={(e) => update("basePrice", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="publicPrice" className={labelClass}>
            Giá công khai
          </label>
          <input
            id="publicPrice"
            type="number"
            min={0}
            required
            value={values.publicPrice}
            onChange={(e) => update("publicPrice", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className={labelClass}>
          Trạng thái
        </label>
        <select
          id="status"
          value={values.status}
          onChange={(e) => update("status", e.target.value as RoomStatus)}
          className={inputClass}
        >
          <option value="AVAILABLE">Còn trống</option>
          <option value="RENTED">Đã thuê</option>
          <option value="HIDDEN">Ẩn</option>
        </select>
      </div>

      <div>
        <span className={labelClass}>Tiện ích</span>

        {featuresError && (
          <p className="mb-2 text-sm text-red-600 dark:text-red-400">{featuresError}</p>
        )}

        <div className="mb-2 max-h-40 space-y-1 overflow-y-auto rounded-md border border-zinc-300 p-2 dark:border-zinc-700">
          {features.length === 0 && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Chưa có tiện ích nào.</p>
          )}
          {features.map((feature) => (
            <label
              key={feature.id}
              className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-50"
            >
              <input
                type="checkbox"
                checked={values.featureIds.includes(feature.id)}
                onChange={(e) => toggleFeature(feature.id, e.target.checked)}
              />
              {feature.name}
            </label>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={newFeatureName}
            onChange={(e) => setNewFeatureName(e.target.value)}
            placeholder="Tên tiện ích mới, VD: Có Gym"
            className={inputClass}
          />
          <button
            type="button"
            disabled={addingFeature}
            onClick={handleAddFeature}
            className="whitespace-nowrap rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-50"
          >
            + Thêm
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {loading ? "Đang lưu..." : submitLabel}
      </button>
    </form>
  );
}
