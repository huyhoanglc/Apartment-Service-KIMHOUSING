"use client";

import Link from "next/link";
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import type { RoomListItem } from "./RoomCard";
import { ROOM_TYPE_LABEL } from "./RoomCard";
import type { SortDir, SortField } from "@/app/store/useInventoryStore";

function SortableHead({
  label,
  field,
  sortField,
  sortDir,
  onSort,
}: {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
}) {
  const active = sortField === field;
  return (
    <TableHead>
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1 transition-colors duration-150 hover:text-navy"
      >
        {label}
        {active ? sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3 opacity-40" />}
      </button>
    </TableHead>
  );
}

export default function RoomTable({
  rooms,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  sortField,
  sortDir,
  onSort,
  onQuickView,
  onDelete,
  canDelete,
}: {
  rooms: RoomListItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  sortField: SortField;
  sortDir: SortDir;
  onSort: (field: SortField) => void;
  onQuickView: (room: RoomListItem) => void;
  onDelete?: (room: RoomListItem) => void;
  canDelete: boolean;
}) {
  const allSelected = rooms.length > 0 && rooms.every((r) => selectedIds.includes(r.id));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox checked={allSelected} onCheckedChange={onToggleSelectAll} aria-label="Chọn tất cả" />
          </TableHead>
          <TableHead>Phòng</TableHead>
          <TableHead>Quận</TableHead>
          <SortableHead label="Diện tích" field="area" sortField={sortField} sortDir={sortDir} onSort={onSort} />
          <SortableHead label="Giá" field="publicPrice" sortField={sortField} sortDir={sortDir} onSort={onSort} />
          <TableHead>Trạng thái</TableHead>
          <SortableHead label="Cập nhật" field="updatedAt" sortField={sortField} sortDir={sortDir} onSort={onSort} />
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.map((room) => {
          const roomHref = `/dashboard/apartments/${room.apartment.id}/rooms/${room.id}`;
          const editHref = `${roomHref}/edit`;
          const thumb = room.media.find((m) => m.type === "IMAGE")?.url;
          return (
            <TableRow key={room.id} data-state={selectedIds.includes(room.id) ? "selected" : undefined} className="data-[state=selected]:bg-gold/5">
              <TableCell>
                <Checkbox checked={selectedIds.includes(room.id)} onCheckedChange={() => onToggleSelect(room.id)} aria-label="Chọn phòng" />
              </TableCell>
              <TableCell>
                <Link href={roomHref} className="flex items-center gap-3">
                  <span className="h-10 w-14 shrink-0 overflow-hidden rounded-md bg-navy/5">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element -- ảnh Cloudinary/blob URL
                      <img src={thumb} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-navy hover:text-gold-to hover:underline">
                      {room.apartment.houseNumber} {room.apartment.street}
                    </span>
                    <span className="block text-xs text-navy/45">
                      {room.code} · {ROOM_TYPE_LABEL[room.roomType]}
                    </span>
                  </span>
                </Link>
              </TableCell>
              <TableCell className="text-navy/70">{room.apartment.district}</TableCell>
              <TableCell className="text-navy/70">{room.area}m²</TableCell>
              <TableCell className="font-semibold text-gold-to">{room.publicPrice.toLocaleString("vi-VN")}đ</TableCell>
              <TableCell>
                <StatusBadge status={room.status} />
              </TableCell>
              <TableCell className="text-xs text-navy/50">
                {new Date(room.updatedAt).toLocaleDateString("vi-VN")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-navy/50 transition-colors duration-200 hover:bg-navy/5 hover:text-navy"
                      aria-label="Thao tác khác"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onQuickView(room)}>
                      <Eye className="h-4 w-4" /> Xem nhanh
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={editHref}>
                        <Pencil className="h-4 w-4" /> Sửa
                      </Link>
                    </DropdownMenuItem>
                    {canDelete && onDelete && (
                      <DropdownMenuItem danger onClick={() => onDelete(room)}>
                        <Trash2 className="h-4 w-4" /> Xoá
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
