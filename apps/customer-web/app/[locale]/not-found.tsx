import { Compass } from "lucide-react";
import { getTranslations } from "next-intl/server";
import EmptyState from "@/app/components/ui/EmptyState";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <EmptyState
      icon={Compass}
      kicker={t("kicker")}
      title={t("title")}
      description={t("description")}
      action={{ label: t("action"), href: "/" }}
    />
  );
}
