import { Check, Phone, Shield, Truck, Zap, Calculator, FileText, MapPin } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { Portfolio } from "@/components/sections/portfolio"
import { FaqSection } from "@/components/sections/faq"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { getPortfolioProjects, getClientLogos, getRegionBySlug, getRegions } from "@/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const dynamic = 'force-dynamic'

interface Props {
  params: { city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = await getRegionBySlug(params.city)
  if (!city) return {}

  const title = `Braços para Luminária Pública em ${city.cityName} - ${city.uf} | B&B Iluminação`
  const description = `Braços para luminária pública em ${city.cityName} com fabricação própria, atendimento técnico e prazo confirmado em orçamento conforme volume e rota.`

  return {
    title,
    description,
    alternates: { canonical: `/lp/braco-para-luminaria/cidades/${city.slug}` },
    openGraph: {
      title,
      description,
      images: [(city.featuredImage as any)?.url || '/portfolio/reserva-parque.webp'],
    },
  }
}

export default async function BracoCityLP({ params }: Props) {
  const city = await getRegionBySlug(params.city)
  if (!city) notFound()

  const [projects, clients, allRegions] = await Promise.all([
    getPortfolioProjects(),
    getClientLogos(),
    getRegions(),
  ])

  const deliveryCondition = city.trust?.deliveryTime || "Prazo e frete confirmados no orçamento conforme volume, rota e cidade de entrega."
  const logisticsText = city.trust?.logistics || "Logística avaliada por projeto, com rota, volume e descarga confirmados na proposta."

  const WA_MSG = `Olá, estou em ${city.cityName} e preciso de um orçamento de braços para luminária pública.`

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-industrial-200 shadow-sm py-3 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center h-14">
          <div className="relative h-10 w-40">
            <Image src="/logo.png" alt="B&B Iluminação" fill className="object-contain object-left" priority />
          </div>
          <WhatsAppLink
            message={WA_MSG}
            className="flex items-center gap-2 bg-industrial-950 text-white hover:bg-industrial-800 font-black uppercase tracking-widest text-[10px] px-4 h-10 transition-colors"
          >
            <Phone className="size-4" />
            <span className="hidden sm:inline">ORÇAMENTO RÁPIDO</span>
            <span className="sm:hidden">WHATSAPP</span>
          </WhatsAppLink>
        </div>
      </header>

      <section className="pt-10 pb-20 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-8">
                <span className="size-2 bg-green-500 rounded-full animate-pulse" />
                Atendimento Especializado em {city.cityName}, {city.uf}
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                Braços para Luminária em <br />
                <span className="text-accent-premium">{city.cityName}</span>
              </h1>
              <p className="text-industrial-500 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                A B&B Iluminação fornece braços e suportes metálicos galvanizados para {city.cityName}. Solução completa para projetos de iluminação pública, construtoras e prefeituras.{' '}
                <span className="text-industrial-950 font-bold">{deliveryCondition}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <WhatsAppLink
                  message={WA_MSG}
                  className="flex items-center justify-center gap-3 bg-industrial-950 text-white hover:bg-industrial-800 font-black h-16 px-10 w-full sm:w-auto uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-xl shadow-industrial-950/20"
                >
                  <Calculator className="size-5" />
                  SOLICITAR ORÇAMENTO
                </WhatsAppLink>
                <a
                  href="/downloads"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-industrial-200 text-industrial-800 hover:border-industrial-950 font-black h-16 px-8 w-full sm:w-auto uppercase tracking-widest transition-colors"
                >
                  <FileText className="size-5" />
                  CATÁLOGOS PDF
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-2 text-industrial-500 text-[11px] font-bold uppercase tracking-widest">
                <Truck className="size-4 text-accent-dark" />
                {logisticsText}
              </div>
            </div>

            <div className="flex-1 w-full max-w-2xl lg:max-w-none">
              <div className="relative aspect-[4/3] lg:aspect-square bg-industrial-100 border-8 border-white shadow-2xl skew-y-2 lg:skew-y-0 lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={(city.featuredImage as any)?.url || "/portfolio/reserva-parque.webp"}
                  alt={`Braços para Luminária em ${city.cityName}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-accent-premium text-black font-black text-[10px] tracking-widest px-4 py-2 uppercase">
                  {city.cityName === "Goiânia" ? "Fábrica Própria" : "Atendimento Direto"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsMarquee clients={clients} />

      <section className="py-20 bg-industrial-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight mb-4">
              Logística para {city.cityName}
            </h2>
            <div className="w-24 h-1 bg-accent-premium mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Prazo sob orçamento", desc: `Frete, rota e prazo para ${city.cityName} são confirmados conforme volume e cronograma da obra.`, icon: <Zap /> },
              { title: "Galvanização", desc: "Proteção superior a fogo contra corrosão, maresia e intempéries.", icon: <Shield /> },
              { title: "NBR ABNT", desc: "Braços dimensionados conforme NBR 6123 para máxima segurança estrutural.", icon: <Check /> },
              { title: "Fábrica Direta", desc: "Sem intermediários. Melhor preço e suporte técnico especializado.", icon: <Calculator /> },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-industrial-200 p-8 hover:border-accent-premium transition-colors hover:shadow-md">
                <div className="size-12 bg-industrial-950 text-white flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-black text-industrial-950 uppercase mb-3 text-sm">{item.title}</h3>
                <p className="text-industrial-500 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Portfolio projects={projects} />

      <FaqSection items={city.faq} />

      {allRegions.length > 1 && (
        <section className="py-16 bg-white border-t border-industrial-100">
          <div className="container mx-auto px-4">
            <h2 className="text-industrial-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-center">
              Outras cidades atendidas pela B&B Iluminação
            </h2>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto">
              {allRegions.filter((c: any) => c.slug !== city.slug).map((c: any) => (
                <Link
                  key={c.slug}
                  href={`/lp/braco-para-luminaria/cidades/${c.slug}`}
                  className="text-industrial-500 hover:text-accent-premium text-xs font-bold transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                  <MapPin className="size-3" />
                  {c.cityName}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-32 bg-accent-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-industrial.png')] opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-black uppercase leading-none tracking-tighter">
            PROJETO EM {city.cityName}?<br />PEÇA SEU ORÇAMENTO
          </h2>
          <p className="text-black/80 font-medium text-lg md:text-xl max-w-2xl mx-auto">
            Nossa equipe organiza a proposta técnica para {city.cityName} conforme modelo, quantidade, acabamento, rota e prazo desejado.
          </p>
          <WhatsAppLink
            message={WA_MSG}
            className="inline-flex items-center justify-center gap-3 bg-black text-white hover:bg-industrial-800 font-black h-16 w-full sm:w-auto px-12 text-lg uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl"
          >
            <Phone className="size-5" />
            FALAR COM UM ESPECIALISTA
          </WhatsAppLink>
        </div>
      </section>
    </main>
  )
}
