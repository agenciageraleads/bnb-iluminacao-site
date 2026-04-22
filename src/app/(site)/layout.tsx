import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://bebiluminacao.com.br'),
  title: {
    default: "B&B Iluminação | Postes Metálicos de Alta Performance",
    template: "%s | B&B Iluminação",
  },
  description: "Líder nacional em postes metálicos certificados ABNT. Iluminação pública, industrial e decorativa com máxima durabilidade e tecnologia.",
  keywords: ["postes metálicos", "iluminação pública", "aço galvanizado", "B&B Iluminação", "postes decorativos", "Goiania"],
  authors: [{ name: "B&B Engenharia" }],
  openGraph: {
    title: "B&B Iluminação | Postes Metálicos",
    description: "Qualidade superior em engenharia de postes e iluminação LED para projetos estruturais.",
    url: "https://bebiluminacao.com.br",
    siteName: "B&B Iluminação",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B&B Iluminação",
    description: "Fabricante líder em postes metálicos galvanizados.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bebiluminacao.com.br/#organization",
      "name": "B&B Iluminação",
      "url": "https://bebiluminacao.com.br/",
      "logo": "https://bebiluminacao.com.br/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-62-3576-1988",
        "contactType": "Geral e Vendas",
        "areaServed": "BR",
        "availableLanguage": "Portuguese"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://bebiluminacao.com.br/#localbusiness",
      "name": "B&B Iluminação Comercial",
      "url": "https://bebiluminacao.com.br/",
      "telephone": "+55 62 3576-1988",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Goiânia",
        "addressRegion": "GO",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-16.6869",
        "longitude": "-49.2643"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-industrial-50 text-industrial-950`}
      >
        <Script
            id="global-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
