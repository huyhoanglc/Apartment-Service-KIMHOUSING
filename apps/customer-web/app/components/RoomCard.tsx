import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import type { RoomListItem } from "@/app/lib/api";
import Badge from "@/app/components/ui/Badge";

const ROOM_TYPE_LABEL: Record<RoomListItem["roomType"], string> = {
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  ONE_BEDROOM: "1 phòng ngủ",
  TWO_BEDROOM: "2 phòng ngủ",
  THREE_BEDROOM: "3 phòng ngủ",
};

export default function RoomCard({ room }: { room: RoomListItem }) {
  const thumbnail = room.media.find((m) => m.type === "IMAGE");
  const address = `${room.apartment.houseNumber} ${room.apartment.street}${
    room.apartment.buildingName ? ` (${room.apartment.buildingName})` : ""
  }`;

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group block overflow-hidden rounded-card border border-navy/10 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={`Phòng ${room.code}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-navy/5 text-navy/40 dark:bg-white/5 dark:text-white/40">
            <ImageOff size={22} strokeWidth={1.5} />
            <span className="text-xs">Chưa có ảnh</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-navy/60 dark:text-white/60">{room.apartment.district}</p>
        <h3 className="text-base font-semibold text-navy dark:text-white">
          Phòng {room.code} - {ROOM_TYPE_LABEL[room.roomType]}
        </h3>
        <p className="text-sm text-navy/60 dark:text-white/60">
          {address} · {room.area} m²
        </p>
        <p className="mt-2 text-lg font-semibold text-navy dark:text-white">
          {room.publicPrice.toLocaleString("vi-VN")} đ/tháng
        </p>
        {room.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {room.features.map((rf) => (
              <Badge key={rf.feature.id} variant="chip">
                {rf.feature.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
