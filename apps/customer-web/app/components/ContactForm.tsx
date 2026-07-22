"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { Input, Textarea } from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = { name: "", email: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\-\s()]{8,15}$/;

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function validate(v: FormValues): FormErrors {
    const nextErrors: FormErrors = {};
    if (!v.name.trim()) nextErrors.name = t("nameError");
    if (!v.email.trim()) nextErrors.email = t("emailRequiredError");
    else if (!EMAIL_RE.test(v.email)) nextErrors.email = t("emailInvalidError");
    if (!v.phone.trim()) nextErrors.phone = t("phoneRequiredError");
    else if (!PHONE_RE.test(v.phone)) nextErrors.phone = t("phoneInvalidError");
    if (!v.message.trim()) nextErrors.message = t("messageError");
    return nextErrors;
  }

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    // Chưa có API liên hệ ở backend - đây là trạng thái thành công phía client sau khi
    // xác thực hợp lệ, chưa thực sự gửi dữ liệu đi đâu. Nối API thật khi backend có endpoint.
    window.setTimeout(() => {
      setStatus("success");
      setValues(EMPTY_VALUES);
    }, 600);
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-card border border-navy/10 bg-white p-8 text-center shadow-soft dark:border-white/10 dark:bg-white/5"
      >
        <CheckCircle2 size={32} strokeWidth={1.5} className="text-gold-to" />
        <p className="text-base font-semibold text-navy dark:text-white">{t("successTitle")}</p>
        <p className="text-sm text-navy/60 dark:text-white/60">{t("successDescription")}</p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")} className="mt-1">
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        id="contact-name"
        label={t("nameLabel")}
        required
        placeholder={t("namePlaceholder")}
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
      />
      <Input
        id="contact-email"
        type="email"
        label={t("emailLabel")}
        required
        placeholder={t("emailPlaceholder")}
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <div className="sm:col-span-2">
        <Input
          id="contact-phone"
          label={t("phoneLabel")}
          required
          placeholder={t("phonePlaceholder")}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
      </div>
      <div className="sm:col-span-2">
        <Textarea
          id="contact-message"
          label={t("messageLabel")}
          required
          rows={4}
          placeholder={t("messagePlaceholder")}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          error={errors.message}
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" loading={status === "submitting"}>
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
