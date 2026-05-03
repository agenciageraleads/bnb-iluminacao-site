'use client'

import { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const faqs = [
    {
        question: "Qual a diferença entre poste galvanizado a fogo e apenas pintado?",
        answer: "A galvanização a fogo (NBR 6323) é um banho de zinco que protege o aço por dentro e por fora contra ferrugem por décadas. Já a pintura (eletrostática ou líquida) oferece proteção mais básica e é mais voltada para estética. Oferecemos ambas as opções, além do poste galvanizado E pintado, que é a proteção máxima."
    },
    {
        question: "Qual o prazo padrão para produção?",
        answer: "Para lotes de até 100 postes, nosso prazo padrão é de 10 a 15 dias úteis. Pedidos com quantidades maiores ou especificações muito fora do padrão requerem um planejamento de produção dedicado, informado no momento do orçamento."
    },
    {
        question: "A B&B Iluminação realiza faturamento ou venda no boleto?",
        answer: "Sim. Realizamos vendas na modalidade faturada (boleto) para Pessoas Jurídicas. Esta condição está sujeita à aprovação prévia de crédito pelo nosso departamento financeiro ou apresentação de carta de seguro de crédito."
    },
    {
        question: "Vocês fornecem apenas o poste ou o conjunto completo?",
        answer: "Podemos fornecer a solução 100% completa. Além dos postes e braços metálicos, fornecemos toda a linha de materiais elétricos (cabos, disjuntores, relés) e as luminárias LED para a instalação."
    },
    {
        question: "Quais alturas de postes vocês fabricam?",
        answer: "Fabricamos postes desde 2 metros (ideais para linha garden e decorativa) até 15 metros de altura (ideais para rodovias, pátios industriais e grandes praças)."
    },
    {
        question: "Como funciona a entrega para outros estados?",
        answer: "Estamos localizados em Goiânia (GO), o que nos dá uma malha logística privilegiada. Atendemos todo o Brasil através de transportadoras parceiras homologadas para o transporte seguro de estruturas metálicas de grande porte."
    },
    {
        question: "O poste já vem com chumbadores e janela de inspeção?",
        answer: "Não por padrão. A janela de inspeção deve ser solicitada no momento da configuração do seu pedido. Os chumbadores (acessórios de fixação da base) também são vendidos separadamente, caso o cliente deseje."
    },
    {
        question: "Os postes suportam ventanias fortes (NBR 6123)?",
        answer: "Sim, nossos postes são calculados estruturalmente considerando a velocidade dos ventos da sua região de instalação, atendendo rigorosamente a NBR 6123 para garantir a segurança da obra."
    },
    {
        question: "Qual é a garantia estrutural dos produtos?",
        answer: "Oferecemos garantia de fábrica contra defeitos de fabricação em toda a nossa linha. A durabilidade da estrutura galvanizada a fogo pode exceder 20 anos, dependendo da agressividade do ambiente (maresia, índices químicos)."
    },
    {
        question: "O poste galvanizado exige algum tipo de manutenção?",
        answer: "A manutenção do poste em si é mínima, focada mais na parte elétrica. Recomendamos apenas conferir o aperto dos parafusos (base e fixação dos braços/luminárias) de tempos em tempos para garantir a máxima segurança."
    }
]

export interface FaqItem {
    question: string
    answer: string
}

interface FaqSectionProps {
    items?: FaqItem[]
}

export function FaqSection({ items }: FaqSectionProps) {
    const displayFaqs = items && items.length > 0 ? items : faqs
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 bg-industrial-950 border-t border-industrial-900" aria-labelledby="faq-heading">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center size-12 bg-industrial-900 mb-4 border border-industrial-800">
                        <HelpCircle className="size-6 text-accent-premium" />
                    </div>
                    <h2 id="faq-heading" className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
                        Dúvidas <span className="text-accent-premium">Frequentes</span>
                    </h2>
                    <p className="text-industrial-400 font-medium text-lg">
                        Tudo o que você precisa saber antes de fechar negócio com a B&B.
                    </p>
                </div>

                <div className="space-y-4">
                    {displayFaqs.map((faq, index) => {
                        const isOpen = openIndex === index

                        return (
                            <div 
                                key={index} 
                                className={`border transition-all duration-300 ${isOpen ? 'border-accent-premium bg-industrial-900/50' : 'border-industrial-800 bg-industrial-950 hover:border-industrial-700'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className={`font-bold text-lg md:text-xl pr-6 transition-colors ${isOpen ? 'text-white' : 'text-industrial-300'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 flex items-center justify-center size-8 border transition-colors ${isOpen ? 'border-accent-premium bg-accent-premium text-black' : 'border-industrial-700 text-industrial-400'}`}>
                                        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                                    </div>
                                </button>
                                
                                <div 
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="p-6 pt-0 text-industrial-400 leading-relaxed text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
