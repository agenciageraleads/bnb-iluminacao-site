import type { Metadata } from "next"

import { P0CommercialPage } from "@/components/seo/p0-commercial-page"
import { p0CommercialPages } from "@/lib/seo/p0-commercial-pages"

const config = p0CommercialPages.fabricantePostesIluminacao

export const metadata: Metadata = {
    title: { absolute: "Fabricante de Postes de Iluminacao | B&B" },
    description: config.description,
    alternates: { canonical: config.pageUrl },
    openGraph: {
        title: "Fabricante de Postes de Iluminacao | B&B",
        description: config.description,
        url: config.pageUrl,
        type: "website",
        images: [{ url: `https://bebiluminacao.com.br${config.heroImage}`, width: 1200, height: 630, alt: config.heroAlt }],
    },
}

export default function FabricanteDePostesDeIluminacaoPage() {
    return <P0CommercialPage config={config} />
}
