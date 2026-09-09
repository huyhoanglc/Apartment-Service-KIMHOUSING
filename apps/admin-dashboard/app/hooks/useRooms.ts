import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/app/lib/api";
import type { InventoryFilters } from "@/app/store/useInventoryStore";
import { PRICE_MAX, PRICE_MIN } from "@/app/store/useInventoryStore";
import type { RoomListItem } from "@/app/dashboard/apartments/RoomCard";

// API /api/rooms chỉ lọc chính xác 1 giá trị cho mỗi field (district/roomType/apartmentType/status),
// không hỗ trợ mảng nhiều lựa chọn. Vì vậy khi người dùng multi-select > 1 giá trị cho 1 field,
// ta bỏ field đó khỏi query gửi server và lọc lại phía client (xem lib/filterRooms.ts) - vẫn đảm bảo
// đúng kết quả, đổi lại phải tải một trang lớn hơn thay vì phân trang hoàn toàn trên server.
const FETCH_CAP = 500;

function buildServerParams(filters: InventoryFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.districts.length === 1) params.set("district", filters.districts[0]);
  if (filters.roomTypes.length === 1) params.set("roomType", filters.roomTypes[0]);
  if (filters.apartmentTypes.length === 1) params.set("apartmentType", filters.apartmentTypes[0]);
  if (filters.statuses.length === 1) params.set("status", filters.statuses[0]);
  if (filters.priceRange[0] > PRICE_MIN) params.set("minPrice", String(filters.priceRange[0]));
  if (filters.priceRange[1] < PRICE_MAX) params.set("maxPrice", String(filters.priceRange[1]));
  params.set("page", "1");
  params.set("pageSize", String(FETCH_CAP));
  return params;
}

async function fetchRooms(filters: InventoryFilters): Promise<{ rows: RoomListItem[]; total: number; capped: boolean }> {
  const params = buildServerParams(filters);
  const res = await apiFetch(`/api/rooms?${params.toString()}`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message ?? "Không tải được danh sách phòng");
  }
  const total: number = result.pagination?.total ?? result.data.length;
  return { rows: result.data ?? [], total, capped: total > FETCH_CAP };
}

export function useRooms(filters: InventoryFilters) {
  const params = buildServerParams(filters);
  return useQuery({
    queryKey: ["rooms", params.toString()],
    queryFn: () => fetchRooms(filters),
    placeholderData: (prev) => prev,
  });
}
