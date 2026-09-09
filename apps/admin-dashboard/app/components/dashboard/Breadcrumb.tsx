"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { findNavItemForPath } from "@/app/lib/navItems";
import { useHeaderTitle } from "@/app/components/PageTitleContext";

export default function Breadcrumb() {
  const pathname = usePathname() ?? "/dashboard";
  const title = useHeaderTitle();
  const navItem = findNavItemForPath(pathname);

  const isSectionRoot = navItem && pathname === navItem.href;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-navy/45">
      <Link href="/dashboard" className="flex items-center gap-1 transition-colors duration-200 hover:text-gold-to">
        <Home className="h-3.5 w-3.5" />
        Tổng quan
      </Link>
      {navItem && navItem.href !== "/dashboard" && (
        <>
          <ChevronRight className="h-3 w-3" />
          {isSectionRoot ? (
            <span className="font-medium text-navy/70">{navItem.label}</span>
          ) : (
            <Link href={navItem.href} className="transition-colors duration-200 hover:text-gold-to">
              {navItem.label}
            </Link>
          )}
        </>
      )}
      {!isSectionRoot && title && navItem && (
        <>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate font-medium text-navy/70">{title}</span>
        </>
      )}
    </nav>
  );
}
