"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Tổng quan", exact: true, icon: HomeIcon },
  { href: "/dashboard/feed", label: "Bảng tin", exact: false, icon: TagIcon },
  {
    href: "/dashboard/apartments",
    label: "Kho rổ hàng",
    exact: false,
    icon: InboxIcon,
    matchPrefixes: ["/dashboard/apartments", "/dashboard/rooms"],
  },
  { href: "/dashboard/my-sources", label: "Nguồn của tôi", exact: false, icon: ShareIcon },
  { href: "/dashboard/source-updates", label: "Nguồn căn cập nhật", exact: false, icon: AlertIcon, badge: 26 },
  { href: "/dashboard/update-history", label: "Lịch sử cập nhật", exact: false, icon: HistoryIcon },
  { href: "/dashboard/customers", label: "Khách hàng", exact: false, icon: UsersIcon },
  { href: "/dashboard/reports", label: "Báo cáo thống kê", exact: false, icon: ChartIcon },
  { href: "/dashboard/messages", label: "Tin nhắn nội bộ", exact: false, icon: ChatIcon, dot: true },
  { href: "/dashboard/settings", label: "Cài đặt hệ thống", exact: false, icon: SettingsIcon },
];

function HomeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <path d="M3 9.5 10 3l7 6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8.5V17h10V8.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <path d="M10.5 3H4.5A1.5 1.5 0 0 0 3 4.5v6l8 8 7-7-8-8.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <path d="M3 11 5.5 4h9L17 11" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 11v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4h-4.2a2.3 2.3 0 0 1-4.6 0H3Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <circle cx="7" cy="10" r="3" />
      <path d="M9.5 8.5 14 5.5M9.5 11.5 14 14.5" strokeLinecap="round" />
      <circle cx="15" cy="4.5" r="1.6" />
      <circle cx="15" cy="15.5" r="1.6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <path d="M10 3.5 17.5 16h-15L10 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 8.3v3.4" strokeLinecap="round" />
      <circle cx="10" cy="13.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <circle cx="10" cy="10.5" r="6.5" />
      <path d="M10 7v3.5l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.5 3.5 5.8" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <circle cx="7.2" cy="7" r="2.5" />
      <path d="M2.5 16c.8-2.6 2.5-4 4.7-4s3.9 1.4 4.7 4" strokeLinecap="round" />
      <circle cx="14" cy="6.5" r="2" />
      <path d="M12.8 9.3c1.9.3 3.1 1.6 3.7 3.7" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <path d="M4 16.5V9M10 16.5V3.5M16 16.5v-6" strokeLinecap="round" />
      <path d="M3 16.5h14" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <path d="M3 10a6.5 6.5 0 1 1 3.2 5.6L3 16.5l1-3.2A6.4 6.4 0 0 1 3 10Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.3 10h.01M10 10h.01M12.7 10h.01" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <circle cx="10" cy="10" r="2.5" />
      <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.3 5.3l1.4 1.4M13.3 13.3l1.4 1.4M5.3 14.7l1.4-1.4M13.3 6.7l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
    </svg>
  );
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Lớp phủ mờ phía sau sidebar khi mở trên mobile, tap để đóng lại */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-navy/50 backdrop-blur-[1px] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col overflow-y-auto bg-navy text-white transition-transform duration-300 ease-in-out md:static md:z-auto md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <Link href="/" className="flex items-center transition-opacity duration-200 hover:opacity-80">
            <Image
              src="/Logo_navbar.png"
              alt="Kim Housing"
              width={468}
              height={196}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white md:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const prefixes = "matchPrefixes" in item && item.matchPrefixes ? item.matchPrefixes : [item.href];
            const active = item.exact ? pathname === item.href : prefixes.some((p) => pathname?.startsWith(p));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  active
                    ? "bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                      active ? "bg-navy text-white" : "bg-gold text-navy"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.dot && <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-xs text-white/40">
          Kim Housing © {new Date().getFullYear()}
        </div>
      </aside>
    </>
  );
}
