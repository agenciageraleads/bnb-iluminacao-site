import type { Metadata } from "next"
import { redirect } from "next/navigation"

// As páginas por estado foram consolidadas em /postes-metalicos (05/11/2026); as URLs antigas
// /lp/estados/<estado> seguem direto para lá.
const destino = "/postes-metalicos"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    title: "Redirecionando | B&B Iluminação",
    alternates: {
        canonical: `https://bebiluminacao.com.br${destino}`,
    },
    robots: {
        index: false,
        follow: true,
    },
}

export default function LegacyEstadoPage() {
    redirect(destino)
}
