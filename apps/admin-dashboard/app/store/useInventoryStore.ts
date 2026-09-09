import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoomType, RoomStatus } from "@/app/dashboard/apartments/RoomCard";

export type ApartmentTypeFilter = "APARTMENT" | "SERVICED_APARTMENT";
export type ViewMode = "grid" | "table";
export type SortField = "publicPrice" | "area" | "updatedAt";
export type SortDir = "asc" | "desc";

export const PRICE_MIN = 0;
export const PRICE_MAX = 30_000_000;
export const PRICE_STEP = 500_000;
export const PAGE_SIZE = 12;

export interface InventoryFilters {
  search: string;
  districts: string[];
  roomTypes: RoomType[];
  apartmentTypes: ApartmentTypeFilter[];
  statuses: RoomStatus[];
  priceRange: [number, number];
}

export const DEFAULT_FILTERS: InventoryFilters = {
  search: "",
  districts: [],
  roomTypes: [],
  apartmentTypes: [],
  statuses: [],
  priceRange: [PRICE_MIN, PRICE_MAX],
};

interface InventoryState {
  filters: InventoryFilters;
  page: number;
  sortField: SortField;
  sortDir: SortDir;
  viewMode: ViewMode;
  selectedIds: string[];

  setSearch: (search: string) => void;
  toggleListValue: <K extends "districts" | "roomTypes" | "apartmentTypes" | "statuses">(
    key: K,
    value: InventoryFilters[K][number]
  ) => void;
  setPriceRange: (range: [number, number]) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setSort: (field: SortField) => void;
  setSortExplicit: (field: SortField, dir: SortDir) => void;
  setViewMode: (mode: ViewMode) => void;

  toggleSelected: (id: string) => void;
  setSelected: (ids: string[]) => void;
  clearSelected: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      filters: DEFAULT_FILTERS,
      page: 1,
      sortField: "updatedAt",
      sortDir: "desc",
      viewMode: "grid",
      selectedIds: [],

      setSearch: (search) => set((s) => ({ filters: { ...s.filters, search }, page: 1 })),

      toggleListValue: (key, value) =>
        set((s) => {
          const current = s.filters[key] as unknown[];
          const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
          return { filters: { ...s.filters, [key]: next }, page: 1 };
        }),

      setPriceRange: (priceRange) => set((s) => ({ filters: { ...s.filters, priceRange }, page: 1 })),

      clearFilters: () => set({ filters: DEFAULT_FILTERS, page: 1 }),

      setPage: (page) => set({ page }),

      setSort: (field) =>
        set((s) => ({
          sortField: field,
          // Bấm lại cùng cột thì đảo chiều, đổi cột khác thì mặc định giảm dần
          sortDir: s.sortField === field && s.sortDir === "desc" ? "asc" : "desc",
        })),

      setSortExplicit: (sortField, sortDir) => set({ sortField, sortDir }),

      setViewMode: (viewMode) => set({ viewMode }),

      toggleSelected: (id) =>
        set((s) => ({
          selectedIds: s.selectedIds.includes(id)
            ? s.selectedIds.filter((v) => v !== id)
            : [...s.selectedIds, id],
        })),
      setSelected: (selectedIds) => set({ selectedIds }),
      clearSelected: () => set({ selectedIds: [] }),
    }),
    {
      name: "kimhousing_admin_inventory",
      // Chỉ nhớ chế độ xem (grid/table) giữa các phiên, không nhớ filter/lựa chọn (dễ gây nhầm lẫn dữ liệu cũ)
      partialize: (s) => ({ viewMode: s.viewMode }),
    }
  )
);
