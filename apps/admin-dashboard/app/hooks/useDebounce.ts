import { useEffect, useState } from "react";

// Trì hoãn cập nhật giá trị đến khi người dùng ngừng gõ/kéo trong `delayMs`
export function useDebounce<T>(value: T, delayMs = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}
