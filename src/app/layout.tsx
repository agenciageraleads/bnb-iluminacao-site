import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
  title: "B&B Iluminação | Postes Metálicos de Alta Performance",
  description: "Líder nacional em postes metálicos certificados ABNT. Iluminação pública, industrial e decorativa com máxima durabilidade e tecnologia.",
  keywords: ["postes metálicos", "iluminação pública", "aço galvanizado", "B&B Iluminação", "postes decorativos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
