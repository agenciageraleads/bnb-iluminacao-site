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
 *
 * A largura fixa vai no WRAPPER, não no container do botão — e não é
 * decoração. O script do Google escreve `style="width: 100%"` inline no
 * container, o que vence qualquer classe CSS; a largura real passa a ser a
 * do pai. Sem largura no wrapper ele colapsa para 0px (é um bloco dentro de
 * um flex centralizado) e o botão renderiza invisível — foi o que aconteceu
 * nos deploys de #78 e #81.
 */
export function PreferredSourceButton({
    theme = "light",
    className,
}: {
    theme?: "light" | "dark"
    className?: string
}) {
    return (
        <div className={`w-[260px] ${className ?? ""}`}>
            <Script
                src="https://news.google.com/swg/js/v1/publisher.js"
                strategy="lazyOnload"
            />
            <div google-add-preferred-source-btn="" data-theme={theme} />
        </div>
    )
}
