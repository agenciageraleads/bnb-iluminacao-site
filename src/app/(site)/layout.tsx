import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SchemaOrg } from "@/components/seo/schema-org";

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
    default: "B&B Iluminação | Soluções Metálicas para Urbanismo",
    template: "%s | B&B Iluminação",
  },
  description: "Postes metálicos, braços, suportes e estruturas para iluminação pública, urbanismo, segurança e projetos industriais. Na medida. No prazo. Na norma.",
  keywords: ["postes metálicos", "iluminação pública", "estruturas metálicas", "braços para luminária", "B&B Iluminação", "Goiânia"],
  authors: [{ name: "B&B Iluminação" }],
  openGraph: {
    title: "B&B Iluminação | Soluções Metálicas para Urbanismo",
    description: "Postes metálicos, braços, suportes e estruturas para iluminação, urbanismo e segurança.",
    url: "https://bebiluminacao.com.br",
    siteName: "B&B Iluminação",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B&B Iluminação",
    description: "Soluções metálicas para urbanismo. Na medida. No prazo. Na norma.",
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
      "alternateName": "B&B Engenharia e Iluminação",
      "sameAs": [
        "https://instagram.com/bebiluminacao",
        "https://facebook.com/bebiluminacao",
        "https://linkedin.com/company/bebiluminacao"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-62-3576-1988",
        "contactType": "Geral e Vendas",
        "areaServed": "BR",
        "availableLanguage": "Portuguese",
        "email": "contato@bebiluminacao.com"
      }
    }
  ]
};


import { GoogleTagManager } from "@/components/Tracking";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
  const adsId = process.env.NEXT_PUBLIC_ADS_ID || '';
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';
  const apolloAppId = process.env.NEXT_PUBLIC_APOLLO_APP_ID || '6a3aa1ba9c16ed00206f1cd6';

  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-industrial-50 text-industrial-950`}
      >
        <GoogleTagManager
          gtmId={gtmId}
          adsId={adsId}
          gaId={gaId}
          fbPixelId={fbPixelId}
          apolloAppId={apolloAppId}
        />
        <SchemaOrg id="global-schema" data={jsonLd} />
        {children}
      </body>
    </html>
  );
}
