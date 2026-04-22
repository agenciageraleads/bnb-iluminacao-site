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
import { getClientLogos, getPortfolioProjects, getBlogPosts, getCatalogs } from "@/lib/data"

export const metadata = generateSeoMetadata({
  title: "B&B Indústria de Iluminação | Qualidade Garantida em Goiânia",
  description: "Indústria de Iluminação em Goiânia | Fabricante de Postes e Refletores Certificados ABNT | Máxima Resistência e Durabilidade.",
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

export default async function Home() {
      const logos = await getClientLogos();
  const projects = await getPortfolioProjects();
  const posts = await getBlogPosts(3);
  const catalogs = await getCatalogs();
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
        <Portfolio projects={projects} />
      </div>

      <ClientsMarquee clients={logos} />
      <Sobre />
      <Downloads catalogs={catalogs} />
      <BlogPreview posts={posts} />

      <Footer />
    </main>
  )
}

