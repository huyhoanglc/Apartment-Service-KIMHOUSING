"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Tổng quan", exact: true, icon: OverviewIcon },
  { href: "/dashboard/apartments", label: "Apartments", exact: false, icon: BuildingIcon },
];

function OverviewIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 shrink-0">
      <rect x="4" y="2" width="12" height="16" rx="1" />
      <path d="M7 6h1M12 6h1M7 9.5h1M12 9.5h1M7 13h1M12 13h1" strokeLinecap="round" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-navy text-white">
      <div className="flex items-center px-5 py-5">
        <Image
          src="/Logo_navbar.png"
          alt="Kim Housing"
          width={468}
          height={196}
          priority
          className="h-7 w-auto object-contain"
        />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-5 py-4 text-xs text-white/40">
        Kim Housing © {new Date().getFullYear()}
      </div>
    </aside>
  );
}
