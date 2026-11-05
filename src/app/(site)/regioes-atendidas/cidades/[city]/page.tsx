import type { Metadata } from "next"
import { redirect } from "next/navigation"

const nationalPostesPath = "/postes-metalicos"

const legacyCityRedirects: Record<string, string> = {
  aparecida: nationalPostesPath,
  "belo-horizonte": nationalPostesPath,
  brasilia: nationalPostesPath,
  campinas: nationalPostesPath,
  "campo-grande": nationalPostesPath,
  cuiaba: nationalPostesPath,
  curitiba: nationalPostesPath,
  fortaleza: nationalPostesPath,
  "joao-pessoa": nationalPostesPath,
  joinville: nationalPostesPath,
  londrina: nationalPostesPath,
  maceio: nationalPostesPath,
  manaus: nationalPostesPath,
  "montes-claros": nationalPostesPath,
  natal: nationalPostesPath,
  "porto-alegre": nationalPostesPath,
  recife: nationalPostesPath,
  "rio-de-janeiro": nationalPostesPath,
  "rio-verde": nationalPostesPath,
  salvador: nationalPostesPath,
  "sao-paulo": nationalPostesPath,
  teresina: nationalPostesPath,
  trindade: nationalPostesPath,
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
