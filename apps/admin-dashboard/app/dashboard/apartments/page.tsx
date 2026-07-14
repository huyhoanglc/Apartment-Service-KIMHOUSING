"use client";

import { useEffect, useState } from "react";
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
const PAGE_SIZE = 20;

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

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path
        d={direction === "left" ? "M12.5 4.5 6 10l6.5 5.5" : "M7.5 4.5 14 10l-6.5 5.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildQuery(filters: Filters, page: number): string {
  const params = new URLSearchParams();
  if (filters.district) params.set("district", filters.district);
  if (filters.roomType) params.set("roomType", filters.roomType);
  if (filters.apartmentType) params.set("apartmentType", filters.apartmentType);
  if (filters.status) params.set("status", filters.status);
  if (filters.priceRange[0] > PRICE_MIN) params.set("minPrice", String(filters.priceRange[0]));
  if (filters.priceRange[1] < PRICE_MAX) params.set("maxPrice", String(filters.priceRange[1]));
  params.set("page", String(page));
  params.set("pageSize", String(PAGE_SIZE));
  return `?${params.toString()}`;
}

export default function ApartmentsPage() {
  usePageTitle("Rổ Hàng Kim Housing");

  const [rooms, setRooms] = useState<RoomListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [priceRangeUi, setPriceRangeUi] = useState<[number, number]>(DEFAULT_FILTERS.priceRange);
  const [page, setPage] = useState(1);

  function updateFilters(updater: (f: Filters) => Filters) {
    setFilters(updater);
    setPage(1);
  }

  // Thanh kéo giá cập nhật UI ngay lập tức, nhưng chỉ áp filter thật (gọi API) sau khi
  // người dùng dừng kéo ~400ms, tránh gọi API liên tục theo từng pixel kéo.
  useEffect(() => {
    const t = setTimeout(() => {
      updateFilters((f) => ({ ...f, priceRange: priceRangeUi }));
    }, 400);
    return () => clearTimeout(t);
  }, [priceRangeUi]);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiFetch(`/api/rooms${buildQuery(filters, page)}`);
        const result = await res.json();
        if (ignore) return;

        if (!res.ok) {
          setError(result.message ?? "Không tải được danh sách phòng");
          return;
        }
        setRooms(result.data ?? []);
        setTotal(result.total ?? 0);
        setTotalPages(result.totalPages ?? 1);
      } catch {
        if (!ignore) setError("Không thể kết nối đến máy chủ");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [filters, page]);

  function handleClearFilters() {
    setFilters(DEFAULT_FILTERS);
    setPriceRangeUi(DEFAULT_FILTERS.priceRange);
    setSearch("");
    setPage(1);
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

      <div className="mb-6 space-y-4 rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
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
              value={filters.district}
              onChange={(e) => updateFilters((f) => ({ ...f, district: e.target.value }))}
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
              value={filters.roomType}
              onChange={(e) => updateFilters((f) => ({ ...f, roomType: e.target.value as RoomType | "" }))}
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
              value={filters.apartmentType}
              onChange={(e) =>
                updateFilters((f) => ({ ...f, apartmentType: e.target.value as ApartmentType | "" }))
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
              value={filters.status}
              onChange={(e) => updateFilters((f) => ({ ...f, status: e.target.value as RoomStatus | "" }))}
              className={inputClass}
            >
              <option value="">Tất cả</option>
              <option value="AVAILABLE">Còn Trống</option>
              <option value="ABOUT_TO_VACATE">Sắp Trống</option>
              <option value="RENTED">Đã lock</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Khoảng giá</label>
          <PriceRangeSlider
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={priceRangeUi}
            onChange={setPriceRangeUi}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClearFilters}
            className="rounded-full border border-navy/15 px-5 py-2 text-sm font-medium text-navy transition-colors duration-300 hover:border-gold hover:text-gold-to"
          >
            Xoá lọc
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="text-sm text-navy/60">Đang tải...</p>}

      {!loading && !error && visibleRooms.length === 0 && (
        <p className="text-sm text-navy/60">Không tìm thấy phòng phù hợp.</p>
      )}

      {!loading && visibleRooms.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to disabled:opacity-30"
                aria-label="Trang trước"
              >
                <ChevronIcon direction="left" />
              </button>
              <span className="text-sm text-navy/60">
                Trang {page} / {totalPages} · {total} phòng
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-200 hover:border-gold hover:text-gold-to disabled:opacity-30"
                aria-label="Trang sau"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
