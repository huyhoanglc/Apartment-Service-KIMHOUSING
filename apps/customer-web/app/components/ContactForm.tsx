"use client";

import { useState, type FormEvent } from "react";
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

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Vui lòng nhập họ và tên";
  if (!values.email.trim()) errors.email = "Vui lòng nhập email";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Email không hợp lệ";
  if (!values.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại";
  else if (!PHONE_RE.test(values.phone)) errors.phone = "Số điện thoại không hợp lệ";
  if (!values.message.trim()) errors.message = "Vui lòng nhập nội dung cần hỗ trợ";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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
        <p className="text-base font-semibold text-navy dark:text-white">Đã gửi thành công</p>
        <p className="text-sm text-navy/60 dark:text-white/60">
          Cảm ơn bạn đã liên hệ. Đội ngũ Kim Housing sẽ phản hồi trong thời gian sớm nhất.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")} className="mt-1">
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input
        id="contact-name"
        label="Họ và tên"
        required
        placeholder="Nguyễn Văn A"
        value={values.name}
        onChange={(e) => update("name", e.target.value)}
        error={errors.name}
      />
      <Input
        id="contact-email"
        type="email"
        label="Email"
        required
        placeholder="example@email.com"
        value={values.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <div className="sm:col-span-2">
        <Input
          id="contact-phone"
          label="Số điện thoại"
          required
          placeholder="0912 345 678"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
      </div>
      <div className="sm:col-span-2">
        <Textarea
          id="contact-message"
          label="Nội dung"
          required
          rows={4}
          placeholder="Bạn cần hỗ trợ điều gì?"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          error={errors.message}
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" loading={status === "submitting"}>
          {status === "submitting" ? "Đang gửi..." : "Gửi ngay"}
        </Button>
      </div>
    </form>
  );
}
