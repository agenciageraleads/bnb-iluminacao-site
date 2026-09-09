import { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { SchemaOrg } from "@/components/seo/schema-org"
import { createSchemaGraph, createFactoryOrganizationSchema, createWebPageSchema, SITE_URL } from "@/lib/seo/schema"

export const metadata: Metadata = {
    title: "Canais Oficiais de Atendimento | B&B Iluminação",
    description: "Canais oficiais de comunicação da B&B Iluminação via WhatsApp Cloud API (Meta) e Google RCS Business Messaging: identificação, finalidade e como falar com o financeiro.",
    alternates: {
        canonical: `${SITE_URL}/canais-oficiais`,
    },
}

export default function CanaisOficiaisPage() {
    const pageUrl = `${SITE_URL}/canais-oficiais`
    const schema = createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Canais Oficiais de Atendimento | B&B Iluminação",
            description: "Canais oficiais de comunicação via WhatsApp Cloud API e Google RCS Business Messaging da B&B Iluminação.",
        }),
    ])

    return (
        <main className="min-h-screen bg-white">
            <SchemaOrg data={schema} />
            <Header />
            <FloatingWhatsApp />

            <section className="pt-24 md:pt-28 pb-12 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-3">Transparência</p>
                    <h1 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase leading-none mb-4">
                        Canais Oficiais de Atendimento<span className="text-accent-dark">.</span>
                    </h1>
                    <p className="text-industrial-500 text-base md:text-lg leading-relaxed max-w-2xl">
                        Como identificar as comunicações oficiais da B&B Iluminação por WhatsApp e RCS, e onde consultar
                        nossa Política de Privacidade e Termos de Serviço.
                    </p>
                </div>
            </section>

            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="prose-industrial">
                        <p>
                            A <strong>B&B INDÚSTRIA E COMÉRCIO DE PRODUTOS PARA ILUMINAÇÃO LTDA.</strong> (CNPJ
                            14.401.288/0001-10 · 14.401.288/0002-00) utiliza exclusivamente canais oficiais e verificados para
                            se comunicar com clientes e parceiros por mensagens móveis: <strong>Meta WhatsApp Cloud API</strong> e{" "}
                            <strong>Google RCS Business Messaging</strong>.
                        </p>

                        <h2>Identificação do remetente</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Nome verificado</strong></td>
                                    <td>B&B Iluminação / B&B Financeiro</td>
                                </tr>
                                <tr>
                                    <td><strong>Número oficial</strong></td>
                                    <td>+55 (62) 93618-0409</td>
                                </tr>
                                <tr>
                                    <td><strong>E-mail do canal</strong></td>
                                    <td>financeiro@bebiluminacao.com</td>
                                </tr>
                                <tr>
                                    <td><strong>Atendimento geral</strong></td>
                                    <td>(62) 3576-1988 · contato@bebiluminacao.com</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>O que enviamos por esses canais</h2>
                        <ul>
                            <li>Confirmações de pedido e status de fabricação/despacho;</li>
                            <li>Avisos de vencimento, 2ª via de boleto e chave Pix Copia e Cola;</li>
                            <li>Suporte comercial e pós-venda.</li>
                        </ul>
                        <p>
                            <strong>Nunca</strong> solicitamos senhas, dados de cartão ou transferências para contas de
                            terceiros por essas mensagens. Antes de pagar qualquer boleto ou Pix, confira se o favorecido é a
                            B&B Indústria e Comércio de Produtos para Iluminação Ltda.
                        </p>

                        <h2>Cancelar o recebimento (opt-out)</h2>
                        <p>
                            Responda a qualquer mensagem com <strong>&quot;SAIR&quot;</strong> ou <strong>&quot;CANCELAR&quot;</strong>,
                            ou fale com o financeiro pelos canais acima.
                        </p>

                        <h2>Documentos legais</h2>
                        <p>
                            <Link href="/politica-privacidade" className="font-bold text-industrial-950 underline">Política de Privacidade</Link>
                            {" "}·{" "}
                            <Link href="/termos-de-servico" className="font-bold text-industrial-950 underline">Termos de Serviço</Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
