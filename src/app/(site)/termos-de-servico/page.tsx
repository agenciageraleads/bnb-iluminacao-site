import { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp"
import { SchemaOrg } from "@/components/seo/schema-org"
import { createSchemaGraph, createFactoryOrganizationSchema, createWebPageSchema, SITE_URL } from "@/lib/seo/schema"

export const metadata: Metadata = {
    title: "Termos de Serviço | B&B Iluminação",
    description: "Termos de Serviço e condições de uso dos canais de mensageria móvel oficiais da B&B Iluminação: WhatsApp Cloud API (Meta) e Google RCS Business Messaging.",
    alternates: {
        canonical: `${SITE_URL}/termos-de-servico`,
    },
}

export default function TermosDeServicoPage() {
    const pageUrl = `${SITE_URL}/termos-de-servico`
    const schema = createSchemaGraph([
        createFactoryOrganizationSchema(),
        createWebPageSchema({
            url: pageUrl,
            name: "Termos de Serviço | B&B Iluminação",
            description: "Termos de Serviço dos canais de mensageria móvel oficiais da B&B Iluminação.",
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
                        Termos de Serviço<span className="text-accent-dark">.</span>
                    </h1>
                    <p className="text-industrial-500 text-base md:text-lg leading-relaxed max-w-2xl">
                        Última atualização: 09 de setembro de 2026 — válido para os canais digitais, WhatsApp Cloud API (Meta) e
                        Google RCS Business Messaging.
                    </p>
                </div>
            </section>

            <section className="py-14 md:py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="prose-industrial">
                        <p>
                            Estes Termos de Serviço regulam o uso dos canais de atendimento digital e mensageria móvel fornecidos
                            pela <strong>B&B INDÚSTRIA E COMÉRCIO DE PRODUTOS PARA ILUMINAÇÃO LTDA.</strong>, inscrita no CNPJ sob
                            os nºs <strong>14.401.288/0001-10</strong> (Matriz) e <strong>14.401.288/0002-00</strong> (Filial)
                            (&quot;B&B Iluminação&quot;, &quot;nós&quot;).
                        </p>
                        <p>
                            Ao realizar pedidos, cadastrar sua empresa em nossos canais de faturamento ou aceitar comunicações
                            institucionais, você concorda com as condições a seguir.
                        </p>

                        <h2>1. Objeto dos canais digitais</h2>
                        <p>
                            Os canais digitais da B&B Iluminação destinam-se ao suporte comercial B2B, emissão e consulta de
                            pedidos de postes e estruturas metálicas para iluminação e urbanismo, faturamento e facilitação de
                            rotinas financeiras (consulta de duplicatas, boletos e chaves Pix).
                        </p>

                        <h2>2. Mensageria móvel — Google RCS e WhatsApp Cloud API</h2>
                        <ul>
                            <li><strong>Remetente verificado:</strong> B&B Iluminação / B&B Financeiro;</li>
                            <li><strong>Finalidade:</strong> alertas operacionais, confirmações de pedido, avisos de vencimento e facilitação de pagamento de títulos comerciais;</li>
                            <li><strong>Custo:</strong> a B&B Iluminação não cobra pelo envio das mensagens; tarifas de dados da sua operadora podem se aplicar conforme seu plano;</li>
                            <li><strong>Frequência:</strong> mensagens pontuais vinculadas aos ciclos de faturamento e vencimento (em média 1 a 4 mensagens por evento de cobrança).</li>
                        </ul>

                        <h2>3. Consentimento (opt-in) e cancelamento (opt-out)</h2>
                        <p>
                            <strong>Opt-in:</strong> o envio de mensagens ocorre a partir dos contatos corporativos fornecidos no
                            cadastro comercial, em pedidos de compra ou notas fiscais.
                        </p>
                        <p>
                            <strong>Opt-out:</strong> você pode cancelar o recebimento de mensagens automáticas a qualquer momento,
                            sem custo, por qualquer um dos meios abaixo:
                        </p>
                        <ul>
                            <li>Respondendo à mensagem RCS ou WhatsApp com <strong>&quot;SAIR&quot;</strong>, <strong>&quot;CANCELAR&quot;</strong> ou <strong>&quot;STOP&quot;</strong>;</li>
                            <li>Enviando e-mail para <strong>financeiro@bebiluminacao.com</strong> com o número da linha a descadastrar;</li>
                            <li>Ligando ou enviando mensagem para o telefone oficial <strong>(62) 93618-0409</strong>.</li>
                        </ul>

                        <h2>4. Responsabilidades e segurança</h2>
                        <p>A B&B Iluminação identifica todas as cobranças com seus próprios dados oficiais. O cliente se compromete a:</p>
                        <ul>
                            <li>Manter atualizados os contatos de sua equipe financeira e de compras;</li>
                            <li>Conferir se o favorecido de qualquer Pix ou boleto é <strong>B&B Indústria e Comércio de Produtos para Iluminação Ltda.</strong> antes de efetuar o pagamento;</li>
                            <li>Reportar imediatamente qualquer mensagem suspeita que não venha de nossos canais verificados.</li>
                        </ul>

                        <h2>5. Legislação e foro</h2>
                        <p>
                            Estes Termos são regidos pela legislação brasileira, incluindo o Marco Civil da Internet e a LGPD.
                            Fica eleito o foro da Comarca de Goiânia/Aparecida de Goiânia — Estado de Goiás.
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </main>
    )
}
