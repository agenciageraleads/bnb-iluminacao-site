import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { regionalUfPageList } from "@/lib/seo/regional-ufs"

export const dynamic = "force-dynamic"

const legacyStateRedirects: Record<string, string> = Object.fromEntries(
    regionalUfPageList.map((page) => [page.stateSlug, page.path])
)

interface LegacyStatePageProps {
    params: Promise<{ estado: string }>
}

export async function generateMetadata({ params }: LegacyStatePageProps): Promise<Metadata> {
    const { estado } = await params
    const destination = legacyStateRedirects[estado] ?? "/postes-metalicos"

    return {
        title: "Redirecionando | B&B Iluminacao",
        alternates: {
            canonical: `https://bebiluminacao.com.br${destination}`,
        },
        robots: {
            index: false,
            follow: true,
        },
    }
}

export async function generateStaticParams() {
    return regionalUfPageList.map((page) => ({
        estado: page.stateSlug,
    }))
}

export default async function LegacyEstadoPage({ params }: LegacyStatePageProps) {
    const { estado } = await params
    redirect(legacyStateRedirects[estado] ?? "/postes-metalicos")
}
