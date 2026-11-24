import type { Metadata } from "next"
import type { ReactNode } from "react"
import { withSocial } from "@/lib/seo/metadata"

export const metadata: Metadata = withSocial("/contato", {
  title: "Contato e Orçamento",
  description: "Fale com a B&B Iluminação e peça orçamento de postes metálicos, braços e suportes. Fábrica em Goiânia-GO, com envio para todo o Brasil.",
})

export default function ContatoLayout({ children }: { children: ReactNode }) {
  return children
}
