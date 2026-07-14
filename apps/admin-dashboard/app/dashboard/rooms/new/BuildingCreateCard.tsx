"use client";

import { useState } from "react";
import { apiFetch } from "@/app/lib/api";
import { extractErrorMessage } from "@/app/lib/apiError";
import { useToast } from "@/app/components/ToastProvider";
import LoadingOverlay from "@/app/components/LoadingOverlay";
import {
  ACCESS_TYPE_LABEL,
  APARTMENT_TYPE_LABEL,
  type AccessType,
  type ApartmentType,
} from "../../apartments/ApartmentForm";
import type { BuildingSearchInput, BuildingSummary } from "./types";

const inputClass =
  "w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-navy/70";

export default function BuildingCreateCard({
  addressSummary,
  onCreated,
}: {
  addressSummary: BuildingSearchInput;
  onCreated: (building: BuildingSummary) => void;
}) {
  const { showToast } = useToast();
  const [buildingName, setBuildingName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [apartmentType, setApartmentType] = useState<ApartmentType>("APARTMENT");
  const [accessType, setAccessType] = useState<AccessType | "">("");
  const [isNewProject, setIsNewProject] = useState(false);
  const [totalRooms, setTotalRooms] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const valid = managerName.trim() && managerPhone.trim() && accessType && Number(totalRooms) > 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!valid) return;

    setSaving(true);
    try {
      const res = await apiFetch("/api/apartments", {
        method: "POST",
        body: JSON.stringify({
          houseNumber: addressSummary.houseNumber,
          street: addressSummary.street,
          district: addressSummary.district,
          buildingName: buildingName.trim() || undefined,
          managerName: managerName.trim(),
          managerPhone: managerPhone.trim(),
          accessType,
          apartmentType,
          isNewProject,
          totalRooms: Number(totalRooms),
        }),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(extractErrorMessage(result, "Tạo dự án thất bại"));
        return;
      }

      showToast("Đã tạo dự án thành công", "success");
      onCreated({ ...result.data, rooms: [] });
    } catch {
      setError("Không thể kết nối đến máy chủ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="animate-fade-in rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <LoadingOverlay show={saving} label="Đang lưu dự án..." />

      <h2 className="text-base font-semibold text-navy">Thông tin dự án</h2>
      <p className="mt-1 mb-4 text-sm text-navy/50">
        {addressSummary.houseNumber} {addressSummary.street} · {addressSummary.district}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Tên toà nhà</label>
          <input
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            placeholder="VD: KIM HOUSE (không bắt buộc)"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tên quản lý *</label>
            <input
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className={`${inputClass} ${touched && !managerName.trim() ? "border-red-400" : ""}`}
            />
          </div>
          <div>
            <label className={labelClass}>SĐT quản lý *</label>
            <input
              value={managerPhone}
              onChange={(e) => setManagerPhone(e.target.value)}
              className={`${inputClass} ${touched && !managerPhone.trim() ? "border-red-400" : ""}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Loại căn hộ</label>
            <select
              value={apartmentType}
              onChange={(e) => setApartmentType(e.target.value as ApartmentType)}
              className={inputClass}
            >
              {Object.entries(APARTMENT_TYPE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Thang bộ / thang máy *</label>
            <select
              value={accessType}
              onChange={(e) => setAccessType(e.target.value as AccessType)}
              className={`${inputClass} ${touched && !accessType ? "border-red-400" : ""}`}
            >
              <option value="" disabled>
                -- Chọn --
              </option>
              {Object.entries(ACCESS_TYPE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tổng số phòng *</label>
            <input
              type="number"
              min={1}
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              className={`${inputClass} ${touched && !(Number(totalRooms) > 0) ? "border-red-400" : ""}`}
            />
          </div>
          <label className="flex items-center gap-2 self-end pb-2 text-sm text-navy/70">
            <input
              type="checkbox"
              checked={isNewProject}
              onChange={(e) => setIsNewProject(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-navy/30 accent-current text-gold-to"
            />
            Dự án mới
          </label>
        </div>

        <div className="border-t border-navy/10 pt-4">
          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-60"
          >
            {saving ? "Đang lưu..." : "Lưu dự án"}
          </button>
        </div>
      </form>
    </div>
  );
}
