import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Benefits } from "@/components/sections/benefits"
import { Categories } from "@/components/sections/categories"
import { Portfolio } from "@/components/sections/portfolio"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { Sobre } from "@/components/sections/sobre"
import { Downloads } from "@/components/sections/downloads"
import { BlogPreview } from "@/components/sections/blog-preview"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { generateSeoMetadata } from "@/lib/seo"
import { SchemaOrg } from "@/components/seo/schema-org"

export const metadata = generateSeoMetadata({
  title: "B&B Loja de Iluminação | Qualidade Garantida em Goiânia",
  description: "Loja de Iluminação em Goiânia | Ofertas Imperdíveis | Variedade e Qualidade em Postes e Refletores.",
})

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "B&B Iluminação",
  "image": "https://www.bebiluminacao.com.br/logo.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Goiânia",
    "addressRegion": "GO",
    "addressCountry": "BR"
  },
  "url": "https://www.bebiluminacao.com.br"
}

export default function Home() {
  return (
    <main className="min-h-screen bg-industrial-950 font-sans">
      <SchemaOrg data={homeSchema} />
      <Header />
      <FloatingWhatsApp />

      {/* Vão para acomodar o Header Fixado */}
      <div className="pt-20"></div>

      <Hero />
      <Benefits />
      <Categories />

      <div id="portfolio">
        <Portfolio />
      </div>

      <ClientsMarquee />
      <Sobre />
      <Downloads />
      <BlogPreview />

      <Footer />
    </main>
  )
}

