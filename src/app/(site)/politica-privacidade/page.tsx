import { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { SchemaOrg } from "@/components/seo/schema-org"
import { createSchemaGraph, createFactoryOrganizationSchema, createWebPageSchema, SITE_URL } from "@/lib/seo/schema"

export const metadata: Metadata = {
    title: "Política de Privacidade | B&B Iluminação",
    description: "Política de Privacidade da B&B Indústria e Comércio de Produtos para Iluminação Ltda., em conformidade com a LGPD e com os canais oficiais de mensageria (WhatsApp Cloud API e Google RCS Business Messaging).",
    alternates: {
        canonical: `${SITE_URL}/politica-privacidade`,
    },
}

export default function PoliticaPrivacidadePage() {
    const pageUrl = `${SITE_URL}/politica-privacidade`
    const schema = createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Política de Privacidade | B&B Iluminação",
            description: "Política de Privacidade e proteção de dados pessoais da B&B Iluminação, LGPD e canais oficiais de mensageria.",
        }),
    ])

    return (
        <main className="min-h-screen bg-white">
            <SchemaOrg data={schema} />
            <Header />
            <FloatingWhatsApp />

            <section className="pt-24 md:pt-28 pb-12 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-3">Jurídico</p>
                    <h1 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase leading-none mb-4">
                        Política de Privacidade<span className="text-accent-dark">.</span>
                    </h1>
                    <p className="text-industrial-500 text-base md:text-lg leading-relaxed max-w-2xl">
                        Última atualização: 09 de setembro de 2026 — em conformidade com a LGPD (Lei nº 13.709/2018).
                    </p>
                </div>
            </section>

            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="prose-industrial">
                        <p>
                            A <strong>B&B INDÚSTRIA E COMÉRCIO DE PRODUTOS PARA ILUMINAÇÃO LTDA.</strong>, inscrita no CNPJ sob os
                            nºs <strong>14.401.288/0001-10</strong> (Matriz) e <strong>14.401.288/0002-00</strong> (Filial), com sede
                            em Goiás, Brasil (&quot;B&B Iluminação&quot;), preza pela privacidade, sigilo e segurança dos dados de
                            seus clientes, parceiros e representantes comerciais.
                        </p>
                        <p>
                            Esta Política de Privacidade explica como coletamos, tratamos, armazenamos e protegemos dados pessoais
                            em nossos canais digitais, portais e canais oficiais de mensageria móvel — Google RCS Business
                            Messaging e WhatsApp Cloud API (Meta).
                        </p>

                        <h2>1. Dados que coletamos</h2>
                        <p>Coletamos apenas os dados necessários ao relacionamento comercial e ao cumprimento de obrigações legais:</p>
                        <ul>
                            <li><strong>Dados cadastrais e corporativos:</strong> razão social, nome fantasia, CNPJ, inscrição estadual, endereço e dados de contato de sócios ou administradores;</li>
                            <li><strong>Dados de contato comercial:</strong> nome do responsável financeiro ou comprador, telefone/WhatsApp corporativo e e-mail;</li>
                            <li><strong>Dados financeiros e transacionais:</strong> histórico de pedidos, notas fiscais eletrônicas (NF-e), títulos a receber, boletos e chaves Pix vinculadas a cobranças.</li>
                        </ul>

                        <h2>2. Finalidade do tratamento (bases legais da LGPD)</h2>
                        <p>O tratamento se baseia na execução de contrato (Art. 7º, V) e no cumprimento de obrigação legal ou regulatória (Art. 7º, II):</p>
                        <ul>
                            <li>Emissão de notas fiscais e relatórios exigidos pela legislação tributária brasileira;</li>
                            <li>Notificações operacionais de fabricação, pedido e despacho logístico;</li>
                            <li>Gestão de contas a receber — lembretes de vencimento, 2ª via de boleto e código Pix Copia e Cola;</li>
                            <li>Atendimento comercial e suporte pós-venda.</li>
                        </ul>

                        <h2>3. Comunicação via Google RCS e WhatsApp Cloud API</h2>
                        <p>
                            A B&B Iluminação utiliza exclusivamente canais oficiais e criptografados (Google RCS Business
                            Messaging e Meta WhatsApp Cloud API), sempre identificados com a marca verificada B&B Iluminação.
                            Nunca solicitamos senhas, dados de cartão ou transferências para contas de terceiros por esses canais.
                        </p>
                        <p>
                            Mensagens enviadas por RCS, WhatsApp ou SMS têm caráter transacional e operacional. O destinatário pode
                            solicitar o descadastramento (opt-out) a qualquer momento respondendo <strong>&quot;SAIR&quot;</strong> ou
                            entrando em contato pelos canais da seção 5.
                        </p>

                        <h2>4. Compartilhamento e armazenamento</h2>
                        <p>A B&B Iluminação não comercializa, aluga ou cede dados pessoais a terceiros. O compartilhamento se restringe a:</p>
                        <ul>
                            <li><strong>Instituições financeiras conveniadas</strong>, para registro, emissão e conciliação de cobranças;</li>
                            <li><strong>Provedores de infraestrutura de mensageria</strong> (Meta Platforms Inc. e Google LLC), estritamente para o tráfego criptografado dos alertas;</li>
                            <li><strong>Órgãos públicos e fiscais</strong>, quando exigido por lei ou requisição judicial válida.</li>
                        </ul>

                        <h2>5. Direitos do titular e canais de contato</h2>
                        <p>
                            Em conformidade com o Art. 18 da LGPD, o titular pode confirmar a existência de tratamento, solicitar
                            acesso, corrigir dados incorretos, solicitar anonimização/eliminação de dados desnecessários e revogar
                            consentimentos concedidos.
                        </p>

                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Atendimento geral</strong></td>
                                    <td>(62) 3576-1988 · contato@bebiluminacao.com</td>
                                </tr>
                                <tr>
                                    <td><strong>Canal oficial de mensageria (WhatsApp/RCS)</strong></td>
                                    <td>(62) 93618-0409 · financeiro@bebiluminacao.com</td>
                                </tr>
                                <tr>
                                    <td><strong>Razão social</strong></td>
                                    <td>B&B Indústria e Comércio de Produtos para Iluminação Ltda.</td>
                                </tr>
                                <tr>
                                    <td><strong>CNPJ Matriz / Filial</strong></td>
                                    <td>14.401.288/0001-10 · 14.401.288/0002-00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
}
