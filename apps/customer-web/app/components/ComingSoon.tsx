import { Clock3 } from "lucide-react";
import EmptyState from "@/app/components/ui/EmptyState";
import type { ButtonProps } from "@/app/components/ui/Button";

export default function ComingSoon({
  kicker,
  description,
  action,
}: {
  kicker: string;
  description: string;
  action?: { label: string } & Pick<ButtonProps, "href" | "variant">;
}) {
  return (
    <EmptyState
      icon={Clock3}
      kicker={kicker}
      title="Đang cập nhật"
      description={description}
      action={action}
    />
  );
}
