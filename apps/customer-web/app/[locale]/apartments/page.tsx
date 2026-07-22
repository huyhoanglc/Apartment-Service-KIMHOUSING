import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ComingSoon from "@/app/components/ComingSoon";
import { pageMetadata } from "@/app/lib/site";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.apartments" });
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    ...pageMetadata({ locale: locale as AppLocale, title, description, path: "/apartments" }),
  };
}

export default async function ApartmentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "apartmentsListing" });

  return (
    <ComingSoon
      kicker={t("kicker")}
      description={t("description")}
      action={{ label: t("action"), href: "/contact" }}
    />
  );
}
