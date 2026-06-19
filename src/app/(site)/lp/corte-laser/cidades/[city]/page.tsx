import { Phone, MapPin } from "lucide-react"
import { ClientsMarquee } from "@/components/sections/clients-marquee"
import { GoogleReviews } from "@/components/sections/google-reviews"
import { WhatsAppLink } from "@/components/ui/whatsapp-link"
import { LaserQuoteForm } from "../../LaserQuoteForm"
import { getClientLogos, getRegionBySlug } from "@/lib/data"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const dynamic = 'force-dynamic'

// Corte a laser é serviço local — campanha targeteia 80km de Goiânia
const LASER_CITIES = ['goiania', 'aparecida-de-goiania', 'anapolis', 'brasilia']

const LASER_CITY_LABELS: Record<string, { name: string; uf: string }> = {
  'goiania': { name: 'Goiânia', uf: 'GO' },
  'aparecida-de-goiania': { name: 'Aparecida de Goiânia', uf: 'GO' },
  'anapolis': { name: 'Anápolis', uf: 'GO' },
  'brasilia': { name: 'Brasília', uf: 'DF' },
}

interface Props {
  params: { city: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = LASER_CITY_LABELS[params.city]
  if (!label) return {}

  const title = `Corte a Laser Industrial em ${label.name} - ${label.uf} | B&B Iluminação`
  const description = `Serviço de corte a laser fibra óptica 3kW exclusivamente em aço carbono para indústrias e metalúrgicas em ${label.name}. Chapas e tubos até 19mm.`

  return {
    title,
    description,
    alternates: { canonical: `/lp/corte-laser/cidades/${params.city}` },
  }
}

export default async function LaserCityLP({ params }: Props) {
  if (!LASER_CITIES.includes(params.city)) notFound()

  const label = LASER_CITY_LABELS[params.city]
  const [clients, region] = await Promise.all([
    getClientLogos(),
    getRegionBySlug(params.city),
  ])

  const cityName = region?.cityName || label.name
  const uf = label.uf

  const WA_MSG = `Olá, estou em ${cityName} e preciso de orçamento para corte a laser industrial em aço carbono.`

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

      <section className="pt-10 pb-16 md:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent-premium" aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-50 border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-widest uppercase mb-8">
                <span className="size-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                Somente aço carbono em {cityName}, {uf}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-industrial-950 leading-[0.9] mb-6 uppercase tracking-tighter">
                Corte a Laser <br />
                em <span className="text-accent-premium">{cityName}</span>
              </h1>
              <p className="text-industrial-500 text-lg font-medium leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Serviço de corte a laser fibra óptica para metalúrgicas, construtoras e indústrias em {cityName}. Trabalhamos exclusivamente com aço carbono em chapas e tubos até 19mm. Não cortamos inox ou alumínio.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0 mb-6">
                {[
                  { value: "3kW", label: "Potência" },
                  { value: "19mm", label: "Espessura máx." },
                  { value: "3×1,5m", label: "Área de mesa" },
                  { value: "Aço carbono", label: "Material" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-industrial-50 border border-industrial-200 p-4 text-center">
                    <p className="text-xl font-black text-industrial-950">{stat.value}</p>
                    <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[480px] shrink-0">
              <div className="bg-industrial-50 border border-industrial-200 p-6 md:p-8">
                <h2 className="text-lg font-black text-industrial-950 uppercase tracking-tight mb-1">
                  Cotação para {cityName}
                </h2>
                <p className="text-industrial-500 text-xs mb-6">
                  Atendimento exclusivo para aço carbono. Descreva sua peça ou envie DXF via WhatsApp após preencher.
                </p>
                <LaserQuoteForm cidade={cityName} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientsMarquee clients={clients} />

      <GoogleReviews />

      {/* Interlinking cidades locais */}
      <section className="py-12 bg-white border-t border-industrial-100">
        <div className="container mx-auto px-4">
          <p className="text-industrial-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-center">
            Cidades atendidas para corte a laser
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {LASER_CITIES.filter(c => c !== params.city).map(c => (
              <Link
                key={c}
                href={`/lp/corte-laser/cidades/${c}`}
                className="text-industrial-500 hover:text-accent-premium text-xs font-bold transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                <MapPin className="size-3" />
                {LASER_CITY_LABELS[c]?.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none tracking-tighter">
            REDUZA CUSTOS<br />
            <span className="text-accent-premium">NA SUA OBRA</span>
          </h2>
          <WhatsAppLink
            message={WA_MSG}
            className="inline-flex items-center justify-center gap-3 bg-accent-premium text-black hover:bg-yellow-300 font-black h-16 w-full sm:w-auto px-12 uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl"
          >
            <Phone className="size-5" />
            FALAR PELO WHATSAPP
          </WhatsAppLink>
        </div>
      </section>
    </main>
  )
}
