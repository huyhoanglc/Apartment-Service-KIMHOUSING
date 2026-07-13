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
      className="block overflow-hidden rounded-lg border border-zinc-200 bg-white transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
        {thumbnail ? (
          <Image
            src={thumbnail.url}
            alt={`Phòng ${room.code}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            Chưa có ảnh
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{room.apartment.district}</p>
        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
          Phòng {room.code} - {ROOM_TYPE_LABEL[room.roomType]}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {address} · {room.area} m²
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {room.publicPrice.toLocaleString("vi-VN")} đ/tháng
        </p>
        {room.features.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {room.features.map((rf) => (
              <span
                key={rf.feature.id}
                className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
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
