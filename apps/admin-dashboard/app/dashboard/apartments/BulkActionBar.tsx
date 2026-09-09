"use client";

import { X, RefreshCcw, UserCog, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ROOM_STATUS_LABEL, type RoomStatus } from "./RoomCard";

const STATUS_OPTIONS: RoomStatus[] = ["AVAILABLE", "ABOUT_TO_VACATE", "RENTED", "HIDDEN"];

export default function BulkActionBar({
  count,
  onClear,
  onChangeStatus,
  onAssignSale,
  onDelete,
  canDelete,
  busy,
}: {
  count: number;
  onClear: () => void;
  onChangeStatus: (status: RoomStatus) => void;
  onAssignSale: () => void;
  onDelete: () => void;
  canDelete: boolean;
  busy?: boolean;
}) {
  if (count === 0) return null;

  return (
    <div className="animate-fade-in sticky bottom-4 z-20 flex flex-wrap items-center gap-3 rounded-full border border-navy/10 bg-navy px-4 py-2.5 text-white shadow-xl">
      <button
        type="button"
        onClick={onClear}
        className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors duration-200 hover:bg-white/10 hover:text-white"
        aria-label="Bỏ chọn"
      >
        <X className="h-4 w-4" />
      </button>
      <span className="text-sm font-medium">Đã chọn {count} phòng</span>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={busy} className="border-white/20 bg-transparent text-white hover:border-gold hover:text-gold-to">
              <RefreshCcw className="h-3.5 w-3.5" /> Đổi trạng thái
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {STATUS_OPTIONS.map((s) => (
              <DropdownMenuItem key={s} onClick={() => onChangeStatus(s)}>
                {ROOM_STATUS_LABEL[s]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          disabled={busy}
          onClick={onAssignSale}
          className="border-white/20 bg-transparent text-white hover:border-gold hover:text-gold-to"
        >
          <UserCog className="h-3.5 w-3.5" /> Gán cho sale khác
        </Button>

        {canDelete && (
          <Button variant="destructive" size="sm" disabled={busy} onClick={onDelete}>
            <Trash2 className="h-3.5 w-3.5" /> Xoá
          </Button>
        )}
      </div>
    </div>
  );
}
