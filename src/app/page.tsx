import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { Benefits } from "@/components/sections/benefits"
import { Categories } from "@/components/sections/categories"
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

      {/* Vão para acomodar o Header Fixado */}
      <div className="pt-20"></div>

      <Hero />
      <Benefits />
      <Categories />

      {/* Footer "Entre em contato conosco" exato do Catálogo (Pg 61) */}
      <footer className="bg-accent-premium py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">

            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-industrial-950 tracking-tight">
                ENTRE EM CONTATO <br /> CONOSCO
              </h2>

              <div className="space-y-4 text-industrial-900 font-bold text-lg md:text-xl">
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Rua CV 10, 324 - Goiânia - GO</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>(62) 3576-1988 (WhatsApp)</span>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>contato@bebiluminacao.com.br</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 hidden md:block">
              {/* Logo Escura no Footer */}
              <svg viewBox="0 0 400 150" className="h-24 lg:h-32 w-auto fill-industrial-950" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                <path d="M160,105 l20,-30 h-15 c-10,0 -15,-5 -15,-15 c0,-15 15,-15 25,-15 h30 l-25,-25 h-35 c-25,0 -45,15 -45,45 c0,20 15,35 30,40 z" />
                <path d="M220,105 l40,-40 h-20 c-15,0 -20,-5 -20,-15 c0,-10 10,-15 20,-15 h35 l15,-15 h-80 c-25,0 -40,20 -40,40 c0,25 20,35 40,45 z" />
                <path d="M250,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                <rect x="5" y="180" width="370" height="8" />
                <text x="50" y="215" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="10" fill="#000">ILUMINAÇÃO</text>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

