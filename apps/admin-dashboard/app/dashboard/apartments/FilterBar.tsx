"use client";

import { useState, useEffect } from "react";
import { Search, X, LayoutGrid, List as ListIcon } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import MultiSelectFilter from "@/app/components/dashboard/MultiSelectFilter";
import PriceRangeSlider from "./PriceRangeSlider";
import { ROOM_STATUS_LABEL, ROOM_TYPE_LABEL } from "./RoomCard";
import { HCMC_DISTRICTS } from "@/app/lib/hcmcDistricts";
import { cn } from "@/app/lib/utils";
import {
  useInventoryStore,
  PRICE_MIN,
  PRICE_MAX,
  PRICE_STEP,
} from "@/app/store/useInventoryStore";

const DISTRICT_OPTIONS = HCMC_DISTRICTS.map((d) => ({ value: d, label: d }));
const ROOM_TYPE_OPTIONS = Object.entries(ROOM_TYPE_LABEL).map(([value, label]) => ({ value, label }));
const STATUS_OPTIONS = Object.entries(ROOM_STATUS_LABEL).map(([value, label]) => ({ value, label }));
const APARTMENT_TYPE_OPTIONS = [
  { value: "APARTMENT", label: "Chung cư" },
  { value: "SERVICED_APARTMENT", label: "Căn hộ dịch vụ" },
];

export default function FilterBar() {
  const filters = useInventoryStore((s) => s.filters);
  const setSearch = useInventoryStore((s) => s.setSearch);
  const toggleListValue = useInventoryStore((s) => s.toggleListValue);
  const setPriceRange = useInventoryStore((s) => s.setPriceRange);
  const clearFilters = useInventoryStore((s) => s.clearFilters);
  const viewMode = useInventoryStore((s) => s.viewMode);
  const setViewMode = useInventoryStore((s) => s.setViewMode);

  const [searchInput, setSearchInput] = useState(filters.search);

  // Search debounce ~350ms trước khi áp vào store (tránh lọc lại danh sách theo từng phím gõ)
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const activeFilterCount =
    filters.districts.length +
    filters.roomTypes.length +
    filters.apartmentTypes.length +
    filters.statuses.length +
    (filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX ? 1 : 0);

  function handleClear() {
    clearFilters();
    setSearchInput("");
  }

  return (
    <div className="space-y-4 rounded-lg border border-navy/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-navy/40" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Tìm theo địa chỉ hoặc mã phòng..."
            className="pl-9"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-navy/30 hover:text-navy/60"
              aria-label="Xoá tìm kiếm"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 rounded-md border border-navy/15 p-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded transition-colors duration-200",
              viewMode === "grid" ? "bg-navy text-white" : "text-navy/50 hover:text-navy"
            )}
            aria-label="Xem dạng lưới"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded transition-colors duration-200",
              viewMode === "table" ? "bg-navy text-white" : "text-navy/50 hover:text-navy"
            )}
            aria-label="Xem dạng bảng"
          >
            <ListIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MultiSelectFilter
          label="Quận"
          options={DISTRICT_OPTIONS}
          selected={filters.districts}
          onToggle={(v) => toggleListValue("districts", v)}
          searchable
        />
        <MultiSelectFilter
          label="Dạng phòng"
          options={ROOM_TYPE_OPTIONS}
          selected={filters.roomTypes}
          onToggle={(v) => toggleListValue("roomTypes", v as never)}
        />
        <MultiSelectFilter
          label="Dạng căn hộ"
          options={APARTMENT_TYPE_OPTIONS}
          selected={filters.apartmentTypes}
          onToggle={(v) => toggleListValue("apartmentTypes", v as never)}
        />
        <MultiSelectFilter
          label="Trạng thái"
          options={STATUS_OPTIONS}
          selected={filters.statuses}
          onToggle={(v) => toggleListValue("statuses", v as never)}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-navy/60">Khoảng giá</label>
        <PriceRangeSlider min={PRICE_MIN} max={PRICE_MAX} step={PRICE_STEP} value={filters.priceRange} onChange={setPriceRange} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-navy/40">{activeFilterCount > 0 ? `${activeFilterCount} bộ lọc đang áp dụng` : "Chưa áp dụng bộ lọc nào"}</p>
        <Button type="button" variant="outline" size="sm" onClick={handleClear} disabled={activeFilterCount === 0 && !searchInput}>
          Xoá lọc
        </Button>
      </div>
    </div>
  );
}
