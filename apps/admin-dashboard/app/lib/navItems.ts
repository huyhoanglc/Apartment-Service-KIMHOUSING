import {
  LayoutDashboard,
  Newspaper,
  PackageSearch,
  Share2,
  BellRing,
  History,
  Users,
  BadgeCheck,
  BarChart3,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  exact: boolean;
  icon: LucideIcon;
  matchPrefixes?: string[];
  badge?: number;
  dot?: boolean;
  adminOnly?: boolean;
}

// Danh sách điều hướng dùng chung cho Sidebar và Breadcrumb, tránh lệch nhãn giữa 2 nơi
export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Tổng quan", exact: true, icon: LayoutDashboard },
  { href: "/dashboard/feed", label: "Bảng tin", exact: false, icon: Newspaper },
  {
    href: "/dashboard/apartments",
    label: "Kho rổ hàng",
    exact: false,
    icon: PackageSearch,
    matchPrefixes: ["/dashboard/apartments", "/dashboard/rooms"],
  },
  { href: "/dashboard/my-sources", label: "Nguồn của tôi", exact: false, icon: Share2 },
  { href: "/dashboard/source-updates", label: "Nguồn căn cập nhật", exact: false, icon: BellRing, badge: 26 },
  { href: "/dashboard/update-history", label: "Lịch sử cập nhật", exact: false, icon: History },
  { href: "/dashboard/customers", label: "Khách hàng", exact: false, icon: Users },
  { href: "/dashboard/employees", label: "Quản lý nhân viên", exact: false, icon: BadgeCheck, adminOnly: true },
  { href: "/dashboard/reports", label: "Báo cáo thống kê", exact: false, icon: BarChart3 },
  { href: "/dashboard/messages", label: "Tin nhắn nội bộ", exact: false, icon: MessageSquare, dot: true },
  { href: "/dashboard/settings", label: "Cài đặt hệ thống", exact: false, icon: Settings },
];

export function findNavItemForPath(pathname: string): NavItem | undefined {
  return NAV_ITEMS.find((item) => (item.matchPrefixes ?? [item.href]).some((p) => pathname.startsWith(p)));
}
