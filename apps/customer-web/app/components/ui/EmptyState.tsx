import type { LucideIcon } from "lucide-react";
import Button, { type ButtonProps } from "@/app/components/ui/Button";

export default function EmptyState({
  icon: Icon,
  kicker,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  kicker?: string;
  title: string;
  description: string;
  action?: { label: string } & Pick<ButtonProps, "href" | "variant">;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white px-4 py-24 text-center dark:bg-navy">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-gold-from/25 via-gold-via/25 to-gold-to/25 text-gold-to">
        <Icon size={28} strokeWidth={1.5} />
      </span>
      {kicker && <p className="text-xs font-semibold tracking-widest text-gold-to uppercase">{kicker}</p>}
      <h1 className="text-2xl font-semibold text-navy dark:text-white">{title}</h1>
      <p className="max-w-md text-sm text-navy/60 dark:text-white/60">{description}</p>
      {action && (
        <Button href={action.href} variant={action.variant ?? "primary"} className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
