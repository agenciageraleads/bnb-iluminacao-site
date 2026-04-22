"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { 
    Target, 
    MessageCircle, 
    ShieldAlert, 
    ChevronRight, 
    Copy, 
    Check,
    ArrowLeft,
    Lightbulb,
    HelpCircle,
    UserCircle,
    Smartphone,
    ClipboardList
} from "lucide-react"
import Link from "next/link"

export default function SalesTrainingPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const scripts = [
        {
            id: "zap1",
            title: "Primeira Mensagem (Prospecção)",
            text: "Fala [nome], tudo bem? Trabalho com a B&B Iluminação, a gente atende construtoras e engenheiros com postes metálicos sob medida. Vocês estão com alguma obra em andamento ou previsão?"
        },
        {
            id: "zap2",
            title: "Pitch de 30 Segundos",
            text: "Trabalho com a B&B Iluminação, somos fabricantes de postes metálicos para obras em todo o Brasil. Atendemos projetos que precisam de especificação técnica, garantindo que o produto entregue seja exatamente o que foi definido no projeto. Se você tiver alguma obra em andamento ou previsão, posso analisar e te mandar uma solução alinhada."
        },
        {
            id: "zap3",
            title: "Abordagem Consultiva",
            text: "A B&B é indústria e desenvolve postes metálicos conforme a necessidade técnica da obra, respeitando projeto, medidas e acabamento. Nosso foco é evitar ajustes na obra e garantir que o que foi projetado seja exatamente o que será instalado."
        }
    ]

    const objections = [
        {
            q: "Está caro",
            a: "Vale a pena comparar a especificação técnica, porque espessura, galvanização e acabamento impactam diretamente na durabilidade."
        },
        {
            q: "Tenho opção mais barata",
            a: "Perfeito, podemos comparar tecnicamente pra garantir que está no mesmo padrão de qualidade."
        },
        {
            q: "Preciso de prazo menor",
            a: "Dependendo do volume e modelo conseguimos priorizar produção. Posso validar internamente."
        },
        {
            q: "Outro fornecedor oferece frete incluso",
            a: "Também conseguimos trabalhar com CIF, só preciso validar o custo de frete pra te passar a melhor condição."
        }
    ]

    return (
        <main className="min-h-screen bg-industrial-50 pb-20">
            <Header />

            {/* Breadcrumbs & Header */}
            <section className="pt-32 pb-16 bg-industrial-950 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-accent-premium/5 -skew-x-12" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/treinamento" className="inline-flex items-center gap-2 text-accent-premium text-xs font-bold uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform">
                        <ArrowLeft className="size-4" />
                        Voltar ao Dashboard
                    </Link>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="size-12 bg-accent-premium flex items-center justify-center">
                            <Target className="size-7 text-industrial-950" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                            Vendas & <span className="text-accent-premium">Abordagem</span>
                        </h1>
                    </div>
                    <p className="text-industrial-400 text-lg max-w-3xl leading-relaxed">
                        Domine a arte de identificar necessidades técnicas e transformar projetos em vendas reais.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Navegação Rápida (Anchor Links) - Opcional */}
                <aside className="lg:col-span-3 hidden lg:block sticky top-32 h-fit space-y-1">
                    <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-[0.2em] mb-4 ml-2">Conteúdo do Módulo</p>
                    <a href="#mindset" className="flex items-center gap-2 px-4 py-3 bg-white border border-industrial-200 text-xs font-bold uppercase tracking-wider text-industrial-900 border-l-4 border-l-accent-premium shadow-sm">
                        1. Mentalidade Consultiva
                    </a>
                    <a href="#roteiro" className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-industrial-500 hover:bg-industrial-100 transition-colors">
                        2. Roteiro de Conversa
                    </a>
                    <a href="#whatsapp" className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-industrial-500 hover:bg-industrial-100 transition-colors">
                        3. Scripts de WhatsApp
                    </a>
                    <a href="#objecoes" className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-industrial-500 hover:bg-industrial-100 transition-colors">
                        4. Quebra de Objeções
                    </a>
                </aside>

                <div className="lg:col-span-9 space-y-20">
                    
                    {/* Seção 1: Mentalidade */}
                    <section id="mindset" className="space-y-8 scroll-mt-32">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-industrial-900 flex items-center justify-center text-accent-premium">
                                <Lightbulb className="size-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-industrial-950">A Mentalidade do Consultor</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 border-l-4 border-l-accent-premium shadow-sm">
                                <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest mb-2">Regra de Ouro #1</p>
                                <h4 className="text-lg font-black uppercase text-industrial-900 mb-4">"Quem pergunta, vende. Quem apresenta, perde."</h4>
                                <p className="text-industrial-600 text-sm leading-relaxed">
                                    Não tente empurrar produto. Comece entendendo o cenário da obra. O seu papel é identificar uma necessidade técnica e oferecer uma solução de engenharia.
                                </p>
                            </div>
                            <div className="bg-white p-6 border-l-4 border-l-industrial-900 shadow-sm">
                                <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest mb-2">Regra de Ouro #2</p>
                                <h4 className="text-lg font-black uppercase text-industrial-900 mb-4">Venda Segurança, não Poste.</h4>
                                <p className="text-industrial-600 text-sm leading-relaxed">
                                    O poste é o meio. O fim é a previsibilidade na obra, o respeito ao projeto e a durabilidade do que foi instalado.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Seção 2: Roteiro */}
                    <section id="roteiro" className="space-y-8 scroll-mt-32">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-industrial-900 flex items-center justify-center text-accent-premium">
                                <HelpCircle className="size-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-industrial-950">Roteiro de Conversa (O Fluxo Real)</h2>
                        </div>
                        
                        <div className="relative space-y-6 before:absolute before:left-5 before:top-4 before:bottom-4 before:w-[2px] before:bg-industrial-200">
                            {[
                                { t: "ABERTURA", d: "“Vocês estão com alguma obra em andamento ou previsão?”", i: MessageCircle },
                                { t: "EXPLORAÇÃO", d: "“Essa parte de iluminação externa já está definida em projeto ou ainda está em aberto?”", i: ClipboardList },
                                { t: "CONEXÃO", d: "“A gente atende muitos clientes nessa fase, que precisam garantir que o que foi projetado funcione na prática.”", i: UserCircle },
                                { t: "SOLUÇÃO", d: "“A B&B fabrica postes conforme a especificação do projeto, evitando ajustes na obra.”", i: ShieldAlert },
                                { t: "FECHAMENTO", d: "“Se quiser, posso analisar algum projeto seu e te mandar uma opção alinhada.”", i: Check }
                            ].map((step, idx) => (
                                <div key={idx} className="relative pl-14 group">
                                    <div className="absolute left-0 top-1 size-10 bg-white border-2 border-industrial-200 rounded-full flex items-center justify-center z-10 group-hover:border-accent-premium group-hover:bg-accent-premium transition-all">
                                        <step.i className="size-5 text-industrial-400 group-hover:text-industrial-950" />
                                    </div>
                                    <div className="bg-white p-6 border border-industrial-200 shadow-sm transition-all group-hover:shadow-md">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-industrial-400 mb-2">{step.t}</h4>
                                        <p className="text-industrial-900 font-bold text-lg italic">
                                            {step.d}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Seção 3: WhatsApp */}
                    <section id="whatsapp" className="space-y-8 scroll-mt-32">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-industrial-900 flex items-center justify-center text-accent-premium">
                                <Smartphone className="size-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-industrial-950">Scripts para WhatsApp (Copie e Use)</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {scripts.map((script) => (
                                <div key={script.id} className="bg-white border border-industrial-200 overflow-hidden shadow-sm">
                                    <div className="flex items-center justify-between p-4 bg-industrial-50 border-b border-industrial-100">
                                        <h4 className="text-[11px] font-black uppercase tracking-widest text-industrial-900">{script.title}</h4>
                                        <button 
                                            onClick={() => copyToClipboard(script.text, script.id)}
                                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-industrial-500 hover:text-accent-premium transition-colors"
                                        >
                                            {copiedId === script.id ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                                            {copiedId === script.id ? 'Copiado!' : 'Copiar Texto'}
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-industrial-700 bg-industrial-50/50 p-4 rounded border border-dashed border-industrial-200 text-sm leading-relaxed">
                                            {script.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Seção 4: Objeções */}
                    <section id="objecoes" className="space-y-8 scroll-mt-32">
                        <div className="flex items-center gap-3">
                            <div className="size-10 bg-industrial-900 flex items-center justify-center text-accent-premium">
                                <ShieldAlert className="size-6" />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-industrial-950">Como Quebrar Objeções</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {objections.map((obj, idx) => (
                                <div key={idx} className="group h-full">
                                    <div className="bg-white border border-industrial-200 p-6 h-full transition-all group-hover:border-accent-premium shadow-sm">
                                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-100 text-red-700 text-[9px] font-black uppercase mb-3">
                                            Objeção: {obj.q}
                                        </div>
                                        <p className="text-industrial-900 font-bold block mb-4">
                                            "{obj.q}"
                                        </p>
                                        <div className="pt-4 border-t border-industrial-100">
                                            <p className="text-xs font-black uppercase text-industrial-400 mb-2">Resposta da B&B:</p>
                                            <p className="text-industrial-700 text-sm leading-relaxed">
                                                {obj.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Meta Final */}
                    <div className="bg-accent-premium p-10 text-center space-y-6">
                        <h2 className="text-2xl font-black uppercase text-industrial-950">A Meta do Representante</h2>
                        <p className="text-description text-industrial-900 font-medium max-w-xl mx-auto">
                            Sua meta não é fechar a venda agora. É sair da conversa com os dados da obra para gerarmos um orçamento qualificado.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-black uppercase tracking-widest">
                            <span className="px-4 py-2 bg-industrial-950 text-white">Nome da Obra</span>
                            <span className="px-4 py-2 bg-industrial-950 text-white">Tipo de Projeto</span>
                            <span className="px-4 py-2 bg-industrial-950 text-white">Prazo</span>
                            <span className="px-4 py-2 bg-industrial-950 text-white">Contato Técnico</span>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
