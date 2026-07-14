// Chỉ dùng phía server (Server Component), không cần prefix NEXT_PUBLIC_ -
// tránh bị inline cứng vào bundle lúc build, giữ cấu hình được ở runtime (VD: đổi qua docker-compose)
export const API_URL = process.env.API_URL ?? "http://localhost:5000";

export type RoomType = "DUPLEX" | "STUDIO" | "ONE_BEDROOM" | "TWO_BEDROOM" | "THREE_BEDROOM";

export interface Feature {
  id: string;
  name: string;
}

export interface Media {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  order: number;
}

export interface RoomListItem {
  id: string;
  slug: string;
  code: string;
  roomType: RoomType;
  area: number;
  publicPrice: number;
  status: "AVAILABLE" | "RENTED" | "HIDDEN";
  features: { feature: Feature }[];
  media: Media[];
  apartment: {
    id: string;
    district: string;
    street: string;
    houseNumber: string;
    buildingName: string | null;
  };
}

export interface RoomFilters {
  district?: string;
  roomType?: RoomType | "";
  minPrice?: string;
  maxPrice?: string;
  featureId?: string;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Backend trả envelope { success, message, data, pagination }. Hai hàm dưới tự bóc lớp envelope
// và trả lại đúng shape PaginatedResponse<T>/Feature[]/T mà các trang gọi đang mong đợi.
export async function getRooms(filters: RoomFilters): Promise<PaginatedResponse<RoomListItem>> {
  const query = new URLSearchParams();
  // customer-web chỉ hiển thị phòng còn trống, không cho khách chọn xem phòng đã thuê/ẩn
  query.set("status", "AVAILABLE");
  if (filters.district) query.set("district", filters.district);
  if (filters.roomType) query.set("roomType", filters.roomType);
  if (filters.minPrice) query.set("minPrice", filters.minPrice);
  if (filters.maxPrice) query.set("maxPrice", filters.maxPrice);
  if (filters.featureId) query.set("featureId", filters.featureId);
  query.set("page", String(filters.page ?? 1));

  const res = await fetch(`${API_URL}/api/rooms?${query.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Không tải được danh sách phòng");
  const result = await res.json();
  return {
    data: result.data,
    total: result.pagination.total,
    page: result.pagination.page,
    pageSize: result.pagination.limit,
    totalPages: result.pagination.totalPages,
  };
}

export async function getFeatures(): Promise<Feature[]> {
  const res = await fetch(`${API_URL}/api/features`, { cache: "no-store" });
  if (!res.ok) throw new Error("Không tải được danh sách tiện ích");
  const result = await res.json();
  return result.data;
}

export async function getRoomBySlug(slug: string): Promise<RoomListItem | null> {
  const res = await fetch(`${API_URL}/api/rooms/slug/${slug}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Không tải được thông tin phòng");
  const result = await res.json();
  return result.data;
}
