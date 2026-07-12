import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://bebiluminacao.com.br/contato",
  },
}

export default function ContatoLayout({ children }: { children: ReactNode }) {
  return children
}
