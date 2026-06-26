import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

interface LegacyCityPageProps {
    params: Promise<{ city: string }>
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Redirecionando | B&B Iluminacao",
        alternates: {
            canonical: "https://bebiluminacao.com.br/postes-metalicos",
        },
        robots: {
            index: false,
            follow: true,
        },
    }
}

export default async function LegacyPostesMetalicosCityPage(_props: LegacyCityPageProps) {
    redirect("/postes-metalicos")
}
