import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoomBySlug, type RoomListItem } from "@/app/lib/api";

const ROOM_TYPE_LABEL: Record<RoomListItem["roomType"], string> = {
  STUDIO: "Studio",
  DUPLEX: "Duplex",
  ONE_BEDROOM: "1 phòng ngủ",
  TWO_BEDROOM: "2 phòng ngủ",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug).catch(() => null);

  if (!room) {
    return { title: "Không tìm thấy phòng" };
  }

  return {
    title: `Phòng ${room.code} - ${room.apartment.district}`,
    description: `${ROOM_TYPE_LABEL[room.roomType]}, ${room.area}m², giá ${room.publicPrice.toLocaleString(
      "vi-VN"
    )}đ/tháng tại ${room.apartment.district}.`,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug).catch(() => null);

  if (!room) {
    notFound();
  }

  const address = `${room.apartment.houseNumber} ${room.apartment.street}${
    room.apartment.buildingName ? ` (${room.apartment.buildingName})` : ""
  }`;

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <Link href="/" className="text-sm text-zinc-600 underline dark:text-zinc-400">
          ← Danh sách phòng
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
        {room.media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {room.media.map((m) => (
              <div
                key={m.id}
                className="relative aspect-square overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900"
              >
                {m.type === "IMAGE" ? (
                  <Image
                    src={m.url}
                    alt={`Phòng ${room.code}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <video src={m.url} controls className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{room.apartment.district}</p>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Phòng {room.code} - {ROOM_TYPE_LABEL[room.roomType]}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{address}</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Diện tích: {room.area} m²</p>
          <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {room.publicPrice.toLocaleString("vi-VN")} đ/tháng
          </p>
        </div>

        {room.features.length > 0 && (
          <div>
            <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
              Tiện ích
            </h2>
            <div className="flex flex-wrap gap-2">
              {room.features.map((rf) => (
                <span
                  key={rf.feature.id}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {rf.feature.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
