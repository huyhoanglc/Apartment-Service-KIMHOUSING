import { Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import EmptyState from "@/app/components/ui/EmptyState";
import type { ButtonProps } from "@/app/components/ui/Button";

export default async function ComingSoon({
  kicker,
  description,
  action,
}: {
  kicker: string;
  description: string;
  action?: { label: string } & Pick<ButtonProps, "href" | "variant">;
}) {
  const t = await getTranslations("comingSoon");

  return (
    <EmptyState
      icon={Clock3}
      kicker={kicker}
      title={t("title")}
      description={description}
      action={action}
    />
  );
}
