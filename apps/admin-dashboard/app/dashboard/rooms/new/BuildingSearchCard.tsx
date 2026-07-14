"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/app/lib/api";
import { HCMC_DISTRICTS } from "@/app/lib/hcmcDistricts";
import { APARTMENT_TYPE_LABEL } from "../../apartments/ApartmentForm";
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

function BuildingSmallIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 h-4 w-4 shrink-0 text-navy/40">
      <rect x="4" y="2" width="12" height="16" rx="1" />
      <path d="M7 6h1M12 6h1M7 9.5h1M12 9.5h1M7 13h1M12 13h1" strokeLinecap="round" />
    </svg>
  );
}

export default function BuildingSearchCard({
  onContinue,
  onCreateNew,
}: {
  onContinue: (building: BuildingSummary) => void;
  onCreateNew: (input: BuildingSearchInput) => void;
}) {
  const [allApartments, setAllApartments] = useState<BuildingSummary[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [touched, setTouched] = useState(false);
  const [activeField, setActiveField] = useState<"houseNumber" | "street" | null>(null);
  const [found, setFound] = useState<BuildingSummary | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await apiFetch("/api/apartments?pageSize=100");
        const result = await res.json();
        if (ignore) return;
        if (!res.ok) {
          setLoadError(result.message ?? "Không tải được danh sách dự án");
          return;
        }
        setAllApartments(result.data ?? []);
      } catch {
        if (!ignore) setLoadError("Không thể kết nối đến máy chủ");
      } finally {
        if (!ignore) setLoadingList(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const suggestions =
    houseNumber.trim() || street.trim() || district
      ? allApartments
          .filter((apt) => {
            const matchesHouse =
              !houseNumber.trim() || apt.houseNumber.toLowerCase().includes(houseNumber.trim().toLowerCase());
            const matchesStreet = !street.trim() || apt.street.toLowerCase().includes(street.trim().toLowerCase());
            const matchesDistrict = !district || apt.district === district;
            return matchesHouse && matchesStreet && matchesDistrict;
          })
          .slice(0, 6)
      : [];

  function resetResult() {
    setFound(null);
    setNotFound(false);
  }

  function handlePickSuggestion(apt: BuildingSummary) {
    setHouseNumber(apt.houseNumber);
    setStreet(apt.street);
    setDistrict(apt.district);
    setActiveField(null);
    setFound(apt);
    setNotFound(false);
  }

  function handleCheck(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    setActiveField(null);
    if (!houseNumber.trim() || !street.trim() || !district) return;

    const match = allApartments.find(
      (apt) =>
        apt.houseNumber.trim().toLowerCase() === houseNumber.trim().toLowerCase() &&
        apt.street.trim().toLowerCase() === street.trim().toLowerCase()
    );

    if (match) {
      setFound(match);
      setNotFound(false);
    } else {
      setFound(null);
      setNotFound(true);
    }
  }

  return (
    <div className="animate-fade-in rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-navy">Thông tin dự án</h2>

      <p className="mb-3 text-xs text-navy/40">Gõ vào bất kỳ ô nào để lọc theo dự án có sẵn.</p>

      <form onSubmit={handleCheck} className="space-y-4">
        <div className="relative">
          <label className={labelClass}>Số nhà *</label>
          <input
            value={houseNumber}
            onChange={(e) => {
              setHouseNumber(e.target.value);
              setActiveField("houseNumber");
              resetResult();
            }}
            onFocus={() => setActiveField("houseNumber")}
            onBlur={() => setActiveField(null)}
            placeholder={loadingList ? "Đang tải danh sách dự án..." : "VD: 244"}
            className={`${inputClass} ${touched && !houseNumber.trim() ? "border-red-400" : ""}`}
            autoComplete="off"
          />

          {activeField === "houseNumber" && suggestions.length > 0 && (
            <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-navy/10 bg-white py-1 shadow-lg">
              {suggestions.map((apt) => (
                <button
                  key={apt.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handlePickSuggestion(apt)}
                  className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-navy transition-colors duration-150 hover:bg-navy/5"
                >
                  <BuildingSmallIcon />
                  <span>
                    {apt.houseNumber} {apt.street}, {apt.district}
                    {apt.buildingName ? ` (${apt.buildingName})` : ""}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className={labelClass}>Tên đường *</label>
            <input
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                setActiveField("street");
                resetResult();
              }}
              onFocus={() => setActiveField("street")}
              onBlur={() => setActiveField(null)}
              className={`${inputClass} ${touched && !street.trim() ? "border-red-400" : ""}`}
              placeholder="VD: Bình Tiên"
              autoComplete="off"
            />

            {activeField === "street" && suggestions.length > 0 && (
              <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-navy/10 bg-white py-1 shadow-lg">
                {suggestions.map((apt) => (
                  <button
                    key={apt.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handlePickSuggestion(apt)}
                    className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-navy transition-colors duration-150 hover:bg-navy/5"
                  >
                    <BuildingSmallIcon />
                    <span>
                      {apt.houseNumber} {apt.street}, {apt.district}
                      {apt.buildingName ? ` (${apt.buildingName})` : ""}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className={labelClass}>Quận *</label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                resetResult();
              }}
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
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
        >
          <SearchIcon />
          Kiểm tra dự án
        </button>
      </form>

      {loadError && <p className="mt-3 text-sm text-red-600">{loadError}</p>}

      {found && (
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
                  {found.buildingName || `${found.houseNumber} ${found.street}`}
                </p>
                <p className="text-xs text-navy/60">
                  {found.houseNumber} {found.street}
                </p>
                <p className="text-xs text-navy/60">{found.district}</p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-navy/5 px-2.5 py-1 font-medium text-navy/70">
                {found.rooms.length} phòng
              </span>
              <span className="rounded-full bg-navy/5 px-2.5 py-1 font-medium text-navy/70">
                {APARTMENT_TYPE_LABEL[found.apartmentType]}
              </span>
              {found.isNewProject && (
                <span className="rounded-full bg-linear-to-r from-rose-500 to-orange-500 px-2.5 py-1 font-bold tracking-wide text-white">
                  NEW
                </span>
              )}
            </div>

            <div className="mt-3 border-t border-navy/10 pt-3 text-xs text-navy/60">
              <p className="font-medium text-navy/70">Quản lý</p>
              <p>
                {found.managerName} · {found.managerPhone}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onContinue(found)}
            className="mt-4 w-full rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-navy-light"
          >
            Tiếp tục tạo phòng
          </button>
        </div>
      )}

      {notFound && (
        <div className="animate-fade-in mt-5">
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
            <WarningIcon />
            <span>Không tìm thấy dự án. Bạn có muốn tạo mới?</span>
          </div>

          <button
            type="button"
            onClick={() => onCreateNew({ houseNumber: houseNumber.trim(), street: street.trim(), district })}
            className="mt-4 w-full rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2.5 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            Tạo dự án
          </button>
        </div>
      )}
    </div>
  );
}
