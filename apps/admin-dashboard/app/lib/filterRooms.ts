import type { RoomListItem } from "@/app/dashboard/apartments/RoomCard";
import type { InventoryFilters, SortDir, SortField } from "@/app/store/useInventoryStore";

// Áp lại các điều kiện mà API /api/rooms không hỗ trợ lọc nhiều giá trị cùng lúc
// (server đã lọc field nào chỉ có đúng 1 lựa chọn - xem hooks/useRooms.ts)
export function refineRooms(rows: RoomListItem[], filters: InventoryFilters): RoomListItem[] {
  let result = rows;

  if (filters.districts.length > 1) {
    result = result.filter((r) => filters.districts.includes(r.apartment.district));
  }
  if (filters.roomTypes.length > 1) {
    result = result.filter((r) => filters.roomTypes.includes(r.roomType));
  }
  if (filters.statuses.length > 1) {
    result = result.filter((r) => filters.statuses.includes(r.status));
  }

  const keyword = filters.search.trim().toLowerCase();
  if (keyword) {
    result = result.filter((r) => {
      const haystack = `${r.apartment.houseNumber} ${r.apartment.street} ${r.apartment.district} ${r.code}`.toLowerCase();
      return haystack.includes(keyword);
    });
  }

  return result;
}

export function sortRooms(rows: RoomListItem[], field: SortField, dir: SortDir): RoomListItem[] {
  const sorted = [...rows].sort((a, b) => {
    let diff = 0;
    if (field === "publicPrice") diff = a.publicPrice - b.publicPrice;
    else if (field === "area") diff = a.area - b.area;
    else diff = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    return dir === "asc" ? diff : -diff;
  });
  return sorted;
}
