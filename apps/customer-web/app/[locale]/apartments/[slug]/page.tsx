import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getRoomBySlug } from "@/app/lib/api";
import Badge from "@/app/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const room = await getRoomBySlug(slug).catch(() => null);

  if (!room) {
    const t = await getTranslations({ locale, namespace: "metadata.roomNotFound" });
    return { title: t("title"), robots: { index: false, follow: false } };
  }

  const tRoomType = await getTranslations({ locale, namespace: "roomType" });
  const tDetail = await getTranslations({ locale, namespace: "apartmentDetail" });
  const roomType = tRoomType(room.roomType);

  const title = `${tDetail("roomTitle", { code: room.code, roomType })} - ${room.apartment.district}`;
  const description = `${roomType}, ${room.area}m², ${tDetail("pricePerMonth", {
    price: room.publicPrice.toLocaleString("vi-VN"),
  })} - ${room.apartment.district}.`;
  const path = `/apartments/${room.slug}`;
  const roomImage = room.media.find((m) => m.type === "IMAGE")?.url;
  const base = pageMetadata({ locale: locale as AppLocale, title, description, path });

  return {
    title,
    description,
    ...base,
    openGraph: {
      ...base.openGraph,
      images: roomImage ? [{ url: roomImage, alt: title }] : base.openGraph?.images,
    },
    twitter: {
      ...base.twitter,
      images: [roomImage ?? "/Logo_navbar.png"],
    },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const room = await getRoomBySlug(slug).catch(() => null);

  if (!room) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "apartmentDetail" });
  const tRoomType = await getTranslations({ locale, namespace: "roomType" });
  const roomType = tRoomType(room.roomType);

  const address = `${room.apartment.houseNumber} ${room.apartment.street}${
    room.apartment.buildingName ? ` (${room.apartment.buildingName})` : ""
  }`;

  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <div className="border-b border-navy/10 px-6 py-3 dark:border-white/10">
        <Link
          href="/apartments"
          className="inline-flex items-center gap-1.5 text-sm text-navy/60 transition-colors duration-300 hover:text-gold-to dark:text-white/60"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          {t("backToList")}
        </Link>
      </div>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6">
        {room.media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {room.media.map((m, i) => (
              <div
                key={m.id}
                className="relative aspect-square overflow-hidden rounded-input bg-navy/5 dark:bg-white/5"
              >
                {m.type === "IMAGE" ? (
                  <Image
                    src={m.url}
                    alt={t("altImage", { roomType, code: room.code, district: room.apartment.district, index: i + 1 })}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                ) : (
                  <video src={m.url} controls className="h-full w-full object-cover" />
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <p className="text-sm text-navy/60 dark:text-white/60">{room.apartment.district}</p>
          <h1 className="text-xl font-semibold text-navy dark:text-white">
            {t("roomTitle", { code: room.code, roomType })}
          </h1>
          <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{address}</p>
          <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{t("areaLabel", { area: room.area })}</p>
          <p className="mt-3 text-2xl font-semibold text-navy dark:text-white">
            {t("pricePerMonth", { price: room.publicPrice.toLocaleString("vi-VN") })}
          </p>
        </div>

        {room.features.length > 0 && (
          <div>
            <h2 className="mb-2 text-base font-semibold text-navy dark:text-white">{t("amenities")}</h2>
            <div className="flex flex-wrap gap-2">
              {room.features.map((rf) => (
                <Badge key={rf.feature.id} variant="chip">
                  {rf.feature.name}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
