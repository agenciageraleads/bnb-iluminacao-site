import type { Metadata } from "next"

import { P0CommercialPage } from "@/components/seo/p0-commercial-page"
import { p0CommercialPages } from "@/lib/seo/p0-commercial-pages"

const config = p0CommercialPages.industriaPostesMetalicos

export const metadata: Metadata = {
    title: { absolute: "Industria de Postes Metalicos | B&B Iluminacao" },
    description: config.description,
    alternates: { canonical: config.pageUrl },
    openGraph: {
        title: "Industria de Postes Metalicos | B&B Iluminacao",
        description: config.description,
        url: config.pageUrl,
        type: "website",
        images: [{ url: `https://bebiluminacao.com.br${config.heroImage}`, width: 1200, height: 630, alt: config.heroAlt }],
    },
}

export default function IndustriaDePostesMetalicosPage() {
    return <P0CommercialPage config={config} />
}
