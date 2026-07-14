// Backend trả lỗi validate dạng { success:false, message, errors: { field: "msg" } }.
// Gom các message trong errors lại (nếu có) để hiển thị cho người dùng, không thì dùng message chung.
export function extractErrorMessage(result: unknown, fallback: string): string {
  if (result && typeof result === "object") {
    const r = result as { message?: string; errors?: Record<string, string> | null };
    if (r.errors && typeof r.errors === "object") {
      const messages = Object.values(r.errors).filter(Boolean);
      if (messages.length > 0) return messages.join(", ");
    }
    if (r.message) return r.message;
  }
  return fallback;
}
