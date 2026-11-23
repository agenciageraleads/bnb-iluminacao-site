import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/schema"

/**
 * Completa o metadata da página com canonical, Open Graph e Twitter próprios.
 * Sem isso a página herda título e URL da home do layout raiz.
 * Título e descrição sociais saem do próprio metadata (sem o sufixo da marca;
 * `og:site_name` já traz a marca).
 */
export function withSocial(path: string, meta: Metadata & { title: string; description: string }): Metadata {
    const url = `${SITE_URL}${path === "/" ? "" : path}`
    return {
        ...meta,
        alternates: { canonical: url, ...meta.alternates },
        openGraph: {
            title: meta.title,
            description: meta.description,
            url,
            siteName: "B&B Iluminação",
            locale: "pt_BR",
            type: "website",
            ...meta.openGraph,
        },
        twitter: { card: "summary_large_image", title: meta.title, description: meta.description, ...meta.twitter },
    }
}
