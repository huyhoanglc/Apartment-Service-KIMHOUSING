"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { getUser, type AuthUser } from "@/app/lib/auth";
import { useUIStore } from "@/app/store/useUIStore";
import { cn } from "@/app/lib/utils";
import { NAV_ITEMS, type NavItem } from "@/app/lib/navItems";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

function NavLink({ item, active, collapsed, onNavigate }: { item: NavItem; active: boolean; collapsed: boolean; onNavigate: () => void }) {
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-200",
        collapsed && "justify-center px-2",
        active ? "bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy" : "text-white/70 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" strokeWidth={1.8} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span
              className={cn(
                "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                active ? "bg-navy text-white" : "bg-gold text-navy"
              )}
            >
              {item.badge}
            </span>
          )}
          {item.dot && <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />}
        </>
      )}
      {collapsed && (item.badge !== undefined || item.dot) && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
      )}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div className="relative">{link}</div>
      </TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const user = useSyncExternalStore(subscribeNoop, getUser, getServerSnapshot);
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleCollapsed = useUIStore((s) => s.toggleSidebarCollapsed);
  const navItems = NAV_ITEMS.filter((item) => !item.adminOnly || user?.role === "ADMIN");

  return (
    <TooltipProvider>
      {/* Lớp phủ mờ phía sau sidebar khi mở trên mobile, tap để đóng lại */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-30 bg-navy/50 backdrop-blur-[1px] transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex shrink-0 flex-col overflow-y-auto overflow-x-hidden bg-navy text-white transition-[transform,width] duration-300 ease-in-out md:static md:z-auto md:translate-x-0",
          collapsed ? "w-64 md:w-[76px]" : "w-64",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className={cn("flex items-center justify-between px-5 py-6", collapsed && "md:justify-center md:px-2")}>
          <Link href="/" className="flex items-center overflow-hidden transition-opacity duration-200 hover:opacity-80">
            <Image
              src="/Logo_navbar.png"
              alt="Kim Housing"
              width={468}
              height={196}
              priority
              className={cn("h-12 w-auto object-contain", collapsed && "md:h-9")}
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const prefixes = item.matchPrefixes ?? [item.href];
            const active = item.exact ? pathname === item.href : prefixes.some((p) => pathname?.startsWith(p));
            return (
              <NavLink
                key={item.href}
                item={item}
                active={active}
                collapsed={collapsed}
                onNavigate={onClose}
              />
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={toggleCollapsed}
            className={cn(
              "hidden w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/60 transition-colors duration-200 hover:bg-white/5 hover:text-white md:flex",
              collapsed && "justify-center px-2"
            )}
          >
            {collapsed ? <PanelLeftOpen className="h-5 w-5 shrink-0" /> : <PanelLeftClose className="h-5 w-5 shrink-0" />}
            {!collapsed && <span>Thu gọn</span>}
          </button>
          {!collapsed && (
            <p className="mt-2 px-3 text-xs text-white/40">Kim Housing © {new Date().getFullYear()}</p>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
