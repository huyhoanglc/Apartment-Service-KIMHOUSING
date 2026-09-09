"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, UserRound, KeyRound, LogOut } from "lucide-react";
import type { AuthUser } from "@/app/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

function Avatar({ user, className }: { user: AuthUser; className?: string }) {
  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={user.name}
        width={32}
        height={32}
        className={`rounded-full object-cover ${className ?? ""}`}
        unoptimized
      />
    );
  }

  return (
    <span
      className={`flex items-center justify-center rounded-full bg-linear-to-br from-gold-from via-gold-via to-gold-to text-xs font-semibold text-navy ${className ?? ""}`}
    >
      {initials}
    </span>
  );
}

export default function UserMenu({ user, onLogout, onComingSoon }: { user: AuthUser; onLogout: () => void; onComingSoon: () => void }) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-navy/5">
          <Avatar user={user} className="h-8 w-8" />
          <span className="hidden text-sm text-navy/70 sm:inline">
            {user.name} <span className="text-navy/40">({user.role})</span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-navy/50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Xin chào, {user.name}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          <UserRound className="h-4 w-4" strokeWidth={1.8} />
          Hồ sơ của tôi
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onComingSoon}>
          <KeyRound className="h-4 w-4" strokeWidth={1.8} />
          Đổi mật khẩu
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem danger onClick={onLogout}>
          <LogOut className="h-4 w-4" strokeWidth={1.8} />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
