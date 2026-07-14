"use client";

import { useState } from "react";
import { HCMC_DISTRICTS } from "@/app/lib/hcmcDistricts";
import BuildingCardSkeleton from "./Skeleton";
import type { BuildingSearchInput, BuildingSummary } from "./types";

const inputClass =
  "w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-sm font-medium text-navy/70";

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <circle cx="10" cy="10" r="7.5" />
      <path d="m6.8 10 2.2 2.2 4.2-4.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0">
      <path d="M10 3.5 17.5 16h-15L10 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8.3v3.4" strokeLinecap="round" />
      <circle cx="10" cy="13.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6 shrink-0">
      <rect x="4" y="2" width="12" height="16" rx="1" />
      <path d="M7 6h1M12 6h1M7 9.5h1M12 9.5h1M7 13h1M12 13h1" strokeLinecap="round" />
    </svg>
  );
}

const APARTMENT_TYPE_LABEL: Record<string, string> = {
  APARTMENT: "Chung cư",
  SERVICED_APARTMENT: "Serviced Apartment",
};

export default function BuildingSearchCard({
  status,
  building,
  onSearch,
  onContinue,
  onCreateNew,
}: {
  status: "idle" | "loading" | "found" | "not-found";
  building: BuildingSummary | null;
  onSearch: (input: BuildingSearchInput) => void;
  onContinue: () => void;
  onCreateNew: () => void;
}) {
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = houseNumber.trim() && street.trim() && district;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSearch({ houseNumber: houseNumber.trim(), street: street.trim(), district });
  }

  return (
    <div className="animate-fade-in rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">Thông tin dự án</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Số nhà *</label>
            <input
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className={`${inputClass} ${touched && !houseNumber.trim() ? "border-red-400" : ""}`}
              placeholder="VD: 244"
            />
          </div>
          <div>
            <label className={labelClass}>Tên đường *</label>
            <input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={`${inputClass} ${touched && !street.trim() ? "border-red-400" : ""}`}
              placeholder="VD: Bình Tiên"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Quận *</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className={`${inputClass} ${touched && !district ? "border-red-400" : ""}`}
          >
            <option value="">-- Chọn quận --</option>
            {HCMC_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105 disabled:opacity-60"
        >
          <SearchIcon />
          {status === "loading" ? "Đang kiểm tra..." : "Kiểm tra dự án"}
        </button>
      </form>

      {status === "loading" && (
        <div className="mt-5">
          <BuildingCardSkeleton />
        </div>
      )}

      {status === "found" && building && (
        <div className="animate-fade-in mt-5">
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            <CheckCircleIcon />
            Đã tìm thấy dự án
          </div>

          <div className="rounded-xl border border-navy/10 bg-background p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold-from via-gold-via to-gold-to text-navy">
                <BuildingIcon />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-navy">
                  {building.buildingName || `${building.houseNumber} ${building.street}`}
                </p>
                <p className="text-xs text-navy/60">
                  {building.houseNumber} {building.street}
                </p>
                <p className="text-xs text-navy/60">{building.district}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-navy/5 px-2.5 py-1 font-medium text-navy/70">
                {building.rooms.length} phòng
              </span>
              <span className="rounded-full bg-navy/5 px-2.5 py-1 font-medium text-navy/70">
                {APARTMENT_TYPE_LABEL[building.apartmentType] ?? building.apartmentType}
              </span>
            </div>

            <div className="mt-3 border-t border-navy/10 pt-3 text-xs text-navy/60">
              <p className="font-medium text-navy/70">Quản lý</p>
              <p>
                {building.managerName} · {building.managerPhone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="mt-4 w-full rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-navy-light"
          >
            Tiếp tục tạo phòng
          </button>
        </div>
      )}

      {status === "not-found" && (
        <div className="animate-fade-in mt-5">
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
            <WarningIcon />
            <span>Không tìm thấy dự án. Bạn có muốn tạo mới?</span>
          </div>

          <button
            type="button"
            onClick={onCreateNew}
            className="mt-4 w-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            Tạo dự án
          </button>
        </div>
      )}
    </div>
  );
}
