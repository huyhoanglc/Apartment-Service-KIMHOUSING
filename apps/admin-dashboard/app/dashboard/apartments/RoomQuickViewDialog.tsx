"use client";

import Link from "next/link";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import PhotoGalleryGrid from "@/app/components/PhotoGalleryGrid";
import StatusBadge from "@/app/components/dashboard/StatusBadge";
import { ROOM_TYPE_LABEL, type RoomListItem } from "./RoomCard";

export default function RoomQuickViewDialog({
  room,
  onOpenChange,
}: {
  room: RoomListItem | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!room} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {room && (
          <>
            <DialogHeader>
              <DialogTitle>
                {room.apartment.houseNumber} {room.apartment.street}, {room.apartment.district}
              </DialogTitle>
            </DialogHeader>

            <div className="overflow-hidden rounded-lg">
              <PhotoGalleryGrid
                images={room.media.filter((m) => m.type === "IMAGE").map((m) => m.url)}
                heightClass="h-56"
              />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <dt className="text-xs text-navy/45">Mã phòng</dt>
                <dd className="font-medium text-navy">{room.code}</dd>
              </div>
              <div>
                <dt className="text-xs text-navy/45">Loại phòng</dt>
                <dd className="font-medium text-navy">{ROOM_TYPE_LABEL[room.roomType]}</dd>
              </div>
              <div>
                <dt className="text-xs text-navy/45">Diện tích</dt>
                <dd className="font-medium text-navy">{room.area}m²</dd>
              </div>
              <div>
                <dt className="text-xs text-navy/45">Giá</dt>
                <dd className="font-semibold text-gold-to">{room.publicPrice.toLocaleString("vi-VN")}đ/tháng</dd>
              </div>
              <div>
                <dt className="text-xs text-navy/45">Trạng thái</dt>
                <dd className="mt-0.5">
                  <StatusBadge status={room.status} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-navy/45">Cập nhật</dt>
                <dd className="font-medium text-navy">{new Date(room.updatedAt).toLocaleString("vi-VN")}</dd>
              </div>
            </dl>

            <DialogFooter>
              <Button variant="outline" asChild>
                <Link href={`/dashboard/apartments/${room.apartment.id}/rooms/${room.id}/edit`}>Sửa phòng</Link>
              </Button>
              <Button asChild>
                <Link href={`/dashboard/apartments/${room.apartment.id}/rooms/${room.id}`}>Xem chi tiết</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
