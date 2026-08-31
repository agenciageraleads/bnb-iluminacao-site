"use client"

import Script from "next/script"

/**
 * Botão "Adicionar às fontes preferidas" do Google.
 *
 * Permite que o leitor marque o bebiluminacao.com.br como fonte preferida no
 * Google Search. Uma vez marcado, o site é priorizado para aquele leitor em
 * Top Stories, AI Overviews e AI Mode (com badge "Preferred Source" visível).
 *
 * Doc oficial: https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * O script do Google renderiza o botão dentro da div. Se o script não carregar
 * (adblock, rede), a div fica vazia e nada quebra no layout.
 *
 * O idioma do botão segue o `lang` do <html> (pt-BR); por isso não passamos
 * `data-lang`, que exigiria um código da lista suportada pelo Google.
 */
export function PreferredSourceButton({
    theme = "light",
    className,
}: {
    theme?: "light" | "dark"
    className?: string
}) {
    return (
        <div className={className}>
            <Script
                src="https://news.google.com/swg/js/v1/publisher.js"
                strategy="lazyOnload"
            />
            <div google-add-preferred-source-btn="" data-theme={theme} />
        </div>
    )
}
