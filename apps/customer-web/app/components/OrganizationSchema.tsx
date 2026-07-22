import { ORGANIZATION, SITE_URL } from "@/app/lib/site";

// LocalBusiness kế thừa từ Organization trong schema.org nên một node LocalBusiness duy nhất
// đã bao phủ cả hai - không cần khai báo trùng lặp hai @type riêng biệt.
export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    image: ORGANIZATION.logo,
    description:
      "Kim Housing cung cấp dịch vụ cho thuê căn hộ dịch vụ, phòng trọ cao cấp tại TP.HCM - đầy đủ tiện nghi, vị trí thuận tiện, giá cả hợp lý.",
    email: ORGANIZATION.email,
    ...(ORGANIZATION.telephone ? { telephone: ORGANIZATION.telephone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.streetAddress,
      addressLocality: ORGANIZATION.addressLocality,
      addressRegion: ORGANIZATION.addressRegion,
      addressCountry: ORGANIZATION.addressCountry,
    },
    sameAs: ORGANIZATION.sameAs,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
