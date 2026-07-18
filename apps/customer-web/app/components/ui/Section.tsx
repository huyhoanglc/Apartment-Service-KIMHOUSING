import type { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

export function Container({
  className,
  wide = false,
  children,
}: {
  className?: string;
  wide?: boolean;
  children?: ReactNode;
}) {
  return <div className={cn("mx-auto", wide ? "max-w-[1600px]" : "max-w-7xl", className)}>{children}</div>;
}

type SectionTone = "white" | "navy" | "subtle";

const TONES: Record<SectionTone, string> = {
  white: "bg-white dark:bg-navy",
  navy: "bg-navy text-white",
  subtle: "bg-subtle dark:bg-white/3",
};

export default function Section({
  id,
  tone = "white",
  className,
  containerClassName,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  children?: ReactNode;
}) {
  return (
    <section id={id} className={cn("px-4 py-16 sm:px-6 sm:py-20 lg:px-8", TONES[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
