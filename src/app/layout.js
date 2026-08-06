import "./globals.css";

export const metadata = {
  title: "Kelurahan Karatuang - Bantaeng, Sulawesi Selatan",
  description:
    "Website resmi Kelurahan Karatuang, Kecamatan Bantaeng, Kabupaten Bantaeng, Sulawesi Selatan. Jelajahi keindahan alam, wisata air terjun, dan potensi sumber daya alam daerah Karatuang.",
  keywords:
    "Karatuang, Bantaeng, Sulawesi Selatan, wisata, air terjun, kelurahan, pertanian, perikanan",
  openGraph: {
    title: "Kelurahan Karatuang - Permata Tersembunyi Bantaeng",
    description:
      "Jelajahi keindahan alam Kelurahan Karatuang dengan wisata air terjun yang memukau, kekayaan pertanian, dan budaya masyarakat Bantaeng.",
    type: "website",
  },
  icons: {
    icon: '/images/bantaeng-logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              "name": "Kelurahan Karatuang",
              "url": "https://kelurahankaratuang.com",
              "logo": "https://kelurahankaratuang.com/images/bantaeng-logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bantaeng",
                "addressRegion": "Sulawesi Selatan",
                "addressCountry": "ID"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
