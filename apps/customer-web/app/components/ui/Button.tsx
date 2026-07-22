import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/app/lib/cn";
import Spinner from "@/app/components/ui/Spinner";
import { Link } from "@/i18n/navigation";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outline-invert" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
  "transition-all duration-300 ease-[var(--ease-premium)] active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-to focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-white dark:focus-visible:ring-offset-navy disabled:pointer-events-none disabled:opacity-50";

const SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-gold-from via-gold-via to-gold-to text-navy shadow-soft " +
    "hover:shadow-gold hover:brightness-105 hover:scale-[1.02]",
  secondary:
    "bg-navy text-white shadow-soft hover:shadow-soft-md hover:brightness-110 hover:scale-[1.02] " +
    "dark:bg-white dark:text-navy",
  outline:
    "border border-navy/15 text-navy hover:border-gold hover:text-gold-to hover:scale-[1.02] " +
    "dark:border-white/15 dark:text-white dark:hover:border-gold",
  "outline-invert":
    "border border-white/20 text-white hover:border-gold hover:text-gold hover:scale-[1.02]",
  ghost: "text-navy hover:bg-navy/5 dark:text-white dark:hover:bg-white/10",
  danger: "bg-red-600 text-white shadow-soft hover:bg-red-500 hover:scale-[1.02]",
  success: "bg-emerald-600 text-white shadow-soft hover:bg-emerald-500 hover:scale-[1.02]",
};

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & { href?: undefined };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], className);
  const content = (
    <>
      {loading ? <Spinner size="sm" tone={variant === "outline" || variant === "ghost" ? "brand" : "current"} /> : icon}
      {children}
      {!loading && trailingIcon}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} aria-disabled={loading} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const { type = "button", disabled, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} disabled={disabled || loading} {...buttonRest}>
      {content}
    </button>
  );
}
