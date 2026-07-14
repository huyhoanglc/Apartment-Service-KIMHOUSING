export type Role = "ADMIN" | "SALE" | "CUSTOMER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string | null;
}

const TOKEN_KEY = "kimhousing_admin_token";
const USER_KEY = "kimhousing_admin_user";

export function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Cache theo raw string để trả về CÙNG một tham chiếu khi dữ liệu chưa đổi -
// bắt buộc phải vậy vì getUser được dùng làm getSnapshot cho useSyncExternalStore,
// trả về object mới mỗi lần gọi (do JSON.parse) sẽ gây vòng lặp render vô hạn (React error #185).
let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedUser = raw ? (JSON.parse(raw) as AuthUser) : null;
  }
  return cachedUser;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
