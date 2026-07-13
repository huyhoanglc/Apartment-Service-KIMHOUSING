import { getToken } from "@/app/lib/auth";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// fetch tự đính kèm Authorization Bearer token cho các route cần đăng nhập (SALE/ADMIN)
export function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    // FormData tự set Content-Type (kèm boundary) khi fetch gửi đi, không được ghi đè
    ...(options.body && !isFormData ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
