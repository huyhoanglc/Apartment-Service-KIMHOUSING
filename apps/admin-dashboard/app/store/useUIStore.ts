import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  // Sidebar desktop thu gọn thành rail chỉ icon (mobile luôn dùng drawer riêng, không liên quan state này)
  sidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebarCollapsed: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: "kimhousing_admin_ui" }
  )
);
