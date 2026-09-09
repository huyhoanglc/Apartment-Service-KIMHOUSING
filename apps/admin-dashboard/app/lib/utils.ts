import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Gộp className kiểu shadcn: clsx để gộp điều kiện, twMerge để loại trùng class Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
