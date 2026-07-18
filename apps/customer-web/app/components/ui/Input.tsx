import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/app/lib/cn";

const FIELD_BASE =
  "w-full rounded-input border bg-white px-3.5 py-2.5 text-sm text-navy outline-none transition-colors " +
  "duration-300 placeholder:text-navy/35 focus:border-gold disabled:cursor-not-allowed disabled:opacity-50 " +
  "dark:bg-white/5 dark:text-white dark:placeholder:text-white/35";

function fieldTone(error?: boolean) {
  return error
    ? "border-red-400 focus:border-red-500 dark:border-red-400/60"
    : "border-navy/15 dark:border-white/15";
}

interface FieldWrapperProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

function FieldWrapper({ id, label, error, hint, required, className, children }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-xs font-medium text-navy/70 dark:text-white/70">
        {label}
        {required && <span className="text-gold-to"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-navy/45 dark:text-white/45">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> &
  Omit<FieldWrapperProps, "children">;

export function Input({ id, label, error, hint, required, className, ...rest }: InputProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(FIELD_BASE, fieldTone(!!error), className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> &
  Omit<FieldWrapperProps, "children">;

export function Textarea({ id, label, error, hint, required, className, rows = 4, ...rest }: TextareaProps) {
  return (
    <FieldWrapper id={id} label={label} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(FIELD_BASE, "resize-none", fieldTone(!!error), className)}
        {...rest}
      />
    </FieldWrapper>
  );
}
