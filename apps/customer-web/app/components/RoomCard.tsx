import Image from "next/image";
import Link from "next/link";
import type { RoomListItem } from "@/app/lib/api";

const ROOM_TYPE_LABEL: Record<RoomListItem["roomType"], string> = {
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  ONE_BEDROOM: "1 phòng ngủ",
  TWO_BEDROOM: "2 phòng ngủ",
};

export default function RoomCard({ room }: { room: RoomListItem }) {
  const thumbnail = room.media.find((m) => m.type === "IMAGE");
  const address = `${room.apartment.houseNumber} ${room.apartment.street}${
    room.apartment.buildingName ? ` (${room.apartment.buildingName})` : ""
  }`;

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="block overflow-hidden rounded-lg border border-navy/10 bg-white transition-shadow duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div className="relative aspect-video w-full bg-navy/5 dark:bg-white/5">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={`Phòng ${room.code}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-navy/40 dark:text-white/40">
            Chưa có ảnh
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
              <span
                key={rf.feature.id}
                className="rounded-full bg-navy/5 px-2 py-0.5 text-xs text-navy/70 dark:bg-white/10 dark:text-white/70"
              >
                {rf.feature.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
