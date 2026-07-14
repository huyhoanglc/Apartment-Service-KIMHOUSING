"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { apiFetch } from "@/app/lib/api";
import { usePageTitle } from "@/app/components/PageTitleContext";
import { HCMC_DISTRICTS } from "@/app/lib/hcmcDistricts";
import RoomCard, { type RoomListItem, type RoomStatus, type RoomType } from "./RoomCard";
import PriceRangeSlider from "./PriceRangeSlider";

type ApartmentType = "APARTMENT" | "SERVICED_APARTMENT";

interface Filters {
  district: string;
  roomType: RoomType | "";
  apartmentType: ApartmentType | "";
  status: RoomStatus | "";
  priceRange: [number, number];
}

const PRICE_MIN = 0;
const PRICE_MAX = 30_000_000;
const PRICE_STEP = 500_000;

const DEFAULT_FILTERS: Filters = {
  district: "",
  roomType: "",
  apartmentType: "",
  status: "",
  priceRange: [PRICE_MIN, PRICE_MAX],
};

const inputClass =
  "w-full rounded-md border border-navy/15 px-3 py-2 text-sm text-navy outline-none transition-colors duration-300 focus:border-gold";
const labelClass = "mb-1 block text-xs font-medium text-navy/60";

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
      <circle cx="9" cy="9" r="6" />
      <path d="m17 17-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}

function buildQuery(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.district) params.set("district", filters.district);
  if (filters.roomType) params.set("roomType", filters.roomType);
  if (filters.apartmentType) params.set("apartmentType", filters.apartmentType);
  if (filters.status) params.set("status", filters.status);
  if (filters.priceRange[0] > PRICE_MIN) params.set("minPrice", String(filters.priceRange[0]));
  if (filters.priceRange[1] < PRICE_MAX) params.set("maxPrice", String(filters.priceRange[1]));
  const query = params.toString();
  return query ? `?${query}` : "";
}

export default function ApartmentsPage() {
  usePageTitle("Rổ Hàng Kim Housing");

  const [rooms, setRooms] = useState<RoomListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [draftFilters, setDraftFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch(`/api/rooms${buildQuery(appliedFilters)}`);
        const data = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(data.message ?? "Không tải được danh sách phòng");
          return;
        }
        setRooms(data);
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [appliedFilters]);

  function handleFilterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAppliedFilters(draftFilters);
  }

  function handleClearFilters() {
    setDraftFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setSearch("");
  }

  const keyword = search.trim().toLowerCase();
  const visibleRooms = keyword
    ? rooms.filter((room) => {
        const haystack =
          `${room.apartment.houseNumber} ${room.apartment.street} ${room.apartment.district} ${room.code}`.toLowerCase();
        return haystack.includes(keyword);
      })
    : rooms;

  return (
    <div>
      <div className="mb-6 flex items-center justify-end gap-4">
        <Link
          href="/dashboard/apartments/new"
          className="text-sm text-navy/50 underline transition-colors duration-300 hover:text-gold-to"
        >
          Chỉ tạo dự án
        </Link>
        <Link
          href="/dashboard/rooms/new"
          className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
        >
          + Thêm Phòng
        </Link>
      </div>

      <form
        onSubmit={handleFilterSubmit}
        className="mb-6 space-y-4 rounded-lg border border-navy/10 bg-white p-5 shadow-sm"
      >
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-navy/40">
            <SearchIcon />
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo địa chỉ hoặc mã phòng..."
            className={`${inputClass} pl-9`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className={labelClass}>Quận</label>
            <select
              value={draftFilters.district}
              onChange={(e) => setDraftFilters((f) => ({ ...f, district: e.target.value }))}
              className={inputClass}
            >
              <option value="">Tất cả</option>
              {HCMC_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Dạng phòng</label>
            <select
              value={draftFilters.roomType}
              onChange={(e) => setDraftFilters((f) => ({ ...f, roomType: e.target.value as RoomType | "" }))}
              className={inputClass}
            >
              <option value="">Tất cả</option>
              <option value="STUDIO">Studio</option>
              <option value="DUPLEX">Duplex</option>
              <option value="ONE_BEDROOM">1 Phòng Ngủ</option>
              <option value="TWO_BEDROOM">2 Phòng Ngủ</option>
              <option value="THREE_BEDROOM">3 Phòng Ngủ</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Dạng Căn Hộ</label>
            <select
              value={draftFilters.apartmentType}
              onChange={(e) =>
                setDraftFilters((f) => ({ ...f, apartmentType: e.target.value as ApartmentType | "" }))
              }
              className={inputClass}
            >
              <option value="">Tất cả</option>
              <option value="APARTMENT">Chung cư</option>
              <option value="SERVICED_APARTMENT">Căn hộ dịch vụ</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Trạng thái</label>
            <select
              value={draftFilters.status}
              onChange={(e) => setDraftFilters((f) => ({ ...f, status: e.target.value as RoomStatus | "" }))}
              className={inputClass}
            >
              <option value="">Tất cả</option>
              <option value="AVAILABLE">Còn Trống</option>
              <option value="ABOUT_TO_VACATE">Sắp Trống</option>
              <option value="RENTED">Đã lock</option>
            </select>
          </div>
        </div>

        <div className="max-w-sm">
          <label className={labelClass}>Khoảng giá</label>
          <PriceRangeSlider
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={draftFilters.priceRange}
            onChange={(priceRange) => setDraftFilters((f) => ({ ...f, priceRange }))}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-full bg-linear-to-r from-gold-from via-gold-via to-gold-to px-5 py-2 text-sm font-semibold text-navy shadow-sm transition-all duration-300 hover:shadow-md hover:brightness-105"
          >
            Lọc
          </button>
          <button
            type="button"
            onClick={handleClearFilters}
            className="rounded-full border border-navy/15 px-5 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
          >
            Xoá lọc
          </button>
        </div>
      </form>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-navy/60">Đang tải...</p>}

      {!loading && !error && visibleRooms.length === 0 && (
        <p className="text-sm text-navy/60">Không tìm thấy phòng phù hợp.</p>
      )}

      {!loading && visibleRooms.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
