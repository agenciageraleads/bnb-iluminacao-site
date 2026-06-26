import type { Metadata } from "next"
import { redirect } from "next/navigation"

const nationalPostesPath = "/postes-metalicos"

const legacyCityRedirects: Record<string, string> = {
  aparecida: "/postes-metalicos-goias",
  "belo-horizonte": "/postes-metalicos-minas-gerais",
  brasilia: "/postes-metalicos-distrito-federal",
  campinas: "/postes-metalicos-sao-paulo",
  "campo-grande": "/postes-metalicos-mato-grosso-do-sul",
  cuiaba: "/postes-metalicos-mato-grosso",
  curitiba: "/postes-metalicos-parana",
  fortaleza: "/postes-metalicos-ceara",
  "joao-pessoa": nationalPostesPath,
  joinville: "/postes-metalicos-santa-catarina",
  londrina: "/postes-metalicos-parana",
  maceio: nationalPostesPath,
  manaus: nationalPostesPath,
  "montes-claros": "/postes-metalicos-minas-gerais",
  natal: nationalPostesPath,
  "porto-alegre": "/postes-metalicos-rio-grande-do-sul",
  recife: "/postes-metalicos-pernambuco",
  "rio-de-janeiro": "/postes-metalicos-rio-de-janeiro",
  "rio-verde": "/postes-metalicos-goias",
  salvador: "/postes-metalicos-bahia",
  "sao-paulo": "/postes-metalicos-sao-paulo",
  teresina: nationalPostesPath,
  trindade: "/postes-metalicos-goias",
}

interface LegacyRegionCityPageProps {
  params: Promise<{ city: string }>
}

function normalizeCitySlug(city: string) {
  return city.trim().toLowerCase()
}

function getLegacyCityDestination(city: string) {
  return legacyCityRedirects[normalizeCitySlug(city)] ?? nationalPostesPath
}

export async function generateMetadata({
  params,
}: LegacyRegionCityPageProps): Promise<Metadata> {
  const { city } = await params
  const canonicalPath = getLegacyCityDestination(city)

  return {
    title: "Redirecionando | B&B Iluminacao",
    alternates: {
      canonical: `https://bebiluminacao.com.br${canonicalPath}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}

export default async function LegacyRegionCityPage({
  params,
}: LegacyRegionCityPageProps) {
  const { city } = await params

  redirect(getLegacyCityDestination(city))
}
