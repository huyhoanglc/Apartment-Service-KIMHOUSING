import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/app/components/PageHero";
import ContactForm from "@/app/components/ContactForm";
import Section from "@/app/components/ui/Section";
import Card from "@/app/components/ui/Card";
import IconBadge from "@/app/components/ui/IconBadge";
import Reveal from "@/app/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ Kim Housing để được tư vấn thuê căn hộ dịch vụ hoặc hợp tác cho thuê tại TP.HCM.",
};

const CONTACT_INFO = [
  {
    title: "Địa chỉ",
    value: "14/5A5 Đường Kỳ Đồng, Phường Nhiêu Lộc, TP. Hồ Chí Minh",
    icon: MapPin,
  },
  {
    title: "Hotline",
    value: "0394-008-700",
    href: "tel:0394008700",
    icon: Phone,
  },
  {
    title: "Email",
    value: "info@kimhousing.vn",
    href: "mailto:info@kimhousing.vn",
    icon: Mail,
  },
  {
    title: "Giờ làm việc",
    value: "8:00 - 18:00, Thứ Hai - Chủ Nhật",
    icon: Clock,
  },
];

export default function LienHePage() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-navy">
      <PageHero
        breadcrumb="Liên hệ"
        title="Liên Hệ Kim Housing"
        description="Đội ngũ tư vấn Kim Housing luôn sẵn sàng hỗ trợ bạn tìm căn hộ phù hợp hoặc hợp tác cho thuê."
      />

      {/* Contact info cards */}
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_INFO.map((item, i) => {
            const inner = (
              <>
                <IconBadge icon={item.icon} />
                <p className="mt-4 text-sm font-semibold text-navy dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm text-navy/60 dark:text-white/60">{item.value}</p>
              </>
            );
            return (
              <Reveal key={item.title} direction="scale" delay={i * 0.08}>
                {item.href ? (
                  <Card as="a" href={item.href} hoverable>
                    {inner}
                  </Card>
                ) : (
                  <Card>{inner}</Card>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Form + map */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <Reveal direction="right">
            <h2 className="text-lg font-semibold text-navy dark:text-white">Gửi tin nhắn cho chúng tôi</h2>
            <div className="mt-4 border-t border-navy/10 pt-4 dark:border-white/10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal direction="left" className="overflow-hidden rounded-card border border-navy/10 dark:border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3570711312486!2d106.67911157583852!3d10.783940059053496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f294e460b1d%3A0x2c1d653af8180d80!2zMTQvNUE1IMSQLiBL4buzIMSQ4buTbmcsIE5oacOqdSBM4buZYywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1784301028086!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 360 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vị trí Kim Housing trên Google Maps"
            />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
