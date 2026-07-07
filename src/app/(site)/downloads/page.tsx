export const dynamic = 'force-dynamic'

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import Link from "next/link"
import { getCatalogs } from "@/lib/data"
import { DownloadGrid } from "./DownloadGrid"
import { FileText, ShieldCheck, Download, Ruler } from "lucide-react"
import { URBAN_FAMILIES, desenhoTecnicoHref } from "@/lib/urban-downloads"

export const metadata = {
    title: "Downloads de Catálogos Técnicos | B&B Iluminação",
    description: "Baixe catálogos, datasheets e desenhos técnicos da B&B. Soluções metálicas para urbanismo com documentação para especificação.",
}

export default async function DownloadsPage() {
    const catalogs = await getCatalogs()

    return (
        <div className="flex flex-col min-h-screen bg-industrial-50">
            <Header />
            
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header da Página */}
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                            <FileText className="size-4 text-accent-dark" />
                            Área Técnica e Comercial
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-6">
                            Catálogos <span className="text-accent-premium">Corporativos</span>
                        </h1>
                        <p className="text-industrial-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                            Acesse as especificações técnicas completas dos nossos produtos. 
                            Soluções certificadas para projetos de infraestrutura de alto nível.
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                        {[
                            { title: "Dados Seguros", desc: "Suas informações estão protegidas conforme LGPD.", icon: <ShieldCheck className="size-6" /> },
                            { title: "Especificações NBR", desc: "Desenhos técnicos e dimensões oficiais.", icon: <FileText className="size-6" /> },
                            { title: "Download em PDF", desc: "Versão otimizada para visualização digital.", icon: <Download className="size-6" /> },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 bg-white border border-industrial-200">
                                <div className="size-12 bg-industrial-950 text-accent-premium flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase text-xs tracking-widest mb-2">{item.title}</h3>
                                <p className="text-industrial-500 text-xs font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Catálogos Grid */}
                    {catalogs.length > 0 ? (
                        <DownloadGrid catalogs={catalogs} />
                    ) : (
                        <div className="text-center py-20 bg-white border-2 border-dashed border-industrial-300 max-w-3xl mx-auto">
                            <FileText className="size-16 text-industrial-300 mx-auto mb-4" />
                            <h2 className="text-xl font-black text-industrial-400 uppercase tracking-widest">Nenhum catálogo disponível no momento</h2>
                            <p className="text-industrial-400 text-sm mt-2">Estamos atualizando nossos materiais técnicos.</p>
                        </div>
                    )}

                    {/* Guias Técnicos */}
                    <div id="guias" className="max-w-6xl mx-auto mt-24 scroll-mt-32">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                                <FileText className="size-4 text-accent-dark" />
                                Guias Técnicos
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-4">
                                Guia da <span className="text-accent-premium">Durabilidade</span>
                            </h2>
                            <p className="text-industrial-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
                                E-book técnico sobre a vida útil dos postes metálicos: corrosão, preparo de superfície,
                                pintura eletrostática, galvanização e como escolher o acabamento certo por ambiente.
                            </p>
                        </div>

                        <div id="guia-durabilidade" className="scroll-mt-32 max-w-4xl mx-auto bg-white border border-industrial-200 shadow-sm overflow-hidden grid md:grid-cols-[280px_1fr]">
                            <div className="relative bg-industrial-950 min-h-[320px] md:min-h-0">
                                <Image
                                    src="/images/guias/guia-durabilidade-postes-capa.png"
                                    alt="Capa do Guia Técnico de Durabilidade dos Postes Metálicos"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(min-width: 768px) 280px, 100vw"
                                />
                            </div>
                            <div className="p-8 flex flex-col">
                                <div className="bg-accent-premium text-black inline-block self-start px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4">
                                    E-book · PDF · 19 páginas
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase text-xl leading-tight">
                                    Durabilidade dos Postes Metálicos
                                </h3>
                                <p className="text-industrial-500 text-sm font-medium leading-relaxed mt-3 flex-1">
                                    Por que dois postes iguais duram tempos diferentes? Comparativo de acabamentos, o segredo
                                    da preparação de superfície, galvanização, manutenção e como escolher. Material de
                                    referência para engenharia, arquitetura e compras.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <a
                                        href="/downloads/guia-bb-durabilidade-postes-metalicos.pdf"
                                        download="B&B - Guia de Durabilidade dos Postes Metálicos.pdf"
                                        className="flex-1 flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors"
                                    >
                                        <Download className="size-4" />
                                        Baixar o Guia
                                    </a>
                                    <Link
                                        href="/blog/durabilidade-dos-postes-metalicos"
                                        className="flex-1 flex items-center justify-center gap-2 border border-industrial-300 text-industrial-700 font-black uppercase text-xs tracking-widest py-4 hover:border-industrial-900 hover:text-industrial-950 transition-colors"
                                    >
                                        Ler o artigo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Datasheets e Desenhos Técnicos — Linha Urban */}
                    <div id="linha-urban" className="max-w-6xl mx-auto mt-24 scroll-mt-32">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                                <Ruler className="size-4 text-accent-dark" />
                                Linha Urban
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-4">
                                Datasheets <span className="text-accent-premium">&amp; Desenhos Técnicos</span>
                            </h2>
                            <p className="text-industrial-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
                                Ficha técnica completa de cada modelo e desenho técnico dimensional por altura, em PDF.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {URBAN_FAMILIES.map((familia) => (
                                <div key={familia.sigla} className="bg-white border border-industrial-200 hover:border-accent-premium transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col">
                                    <div className="p-6 border-b border-industrial-100">
                                        <div className="bg-accent-premium text-black inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                                            BB-URB-{familia.sigla}
                                        </div>
                                        <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight">{familia.nome}</h3>
                                    </div>
                                    <div className="p-6 space-y-5 flex flex-col flex-1">
                                        <a
                                            href={familia.datasheet}
                                            download
                                            className="w-full flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors"
                                        >
                                            <Download className="size-4" />
                                            Baixar Datasheet
                                        </a>
                                        <div className="space-y-5 flex-1">
                                            {([
                                                { label: 'engastado', alturas: familia.alturasEng, mount: 'E' as const },
                                                { label: 'flangeado', alturas: familia.alturasFla, mount: 'F' as const },
                                            ]).map((grupo) => (
                                                <div key={grupo.mount} className="space-y-3">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                                                        Desenho técnico por altura ({grupo.label})
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {grupo.alturas.map((altura) => (
                                                            <a
                                                                key={altura}
                                                                href={desenhoTecnicoHref(familia.sigla, altura, grupo.mount)}
                                                                download
                                                                className="px-3 py-1.5 bg-industrial-50 border border-industrial-200 text-[11px] font-black text-industrial-700 uppercase tracking-widest hover:border-industrial-900 hover:text-industrial-950 transition-colors"
                                                            >
                                                                {altura}m
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Materiais Técnicos — Demais Linhas (em desenvolvimento) */}
                    <div className="max-w-6xl mx-auto mt-24">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                                <Ruler className="size-4 text-accent-dark" />
                                Demais Linhas
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-4">
                                Materiais Técnicos <span className="text-accent-premium">por Linha</span>
                            </h2>
                            <p className="text-industrial-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
                                Datasheets e desenhos técnicos das demais linhas estão em desenvolvimento.
                                Precisa de uma especificação agora? Fale com a nossa engenharia.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {([
                                { slug: 'orna', nome: 'Orna', desc: 'Postes ornamentais que trazem identidade ao ambiente.' },
                                { slug: 'versa', nome: 'Versa', desc: 'Postes decorativos — girafa LED e rebatedor.' },
                                { slug: 'forza', nome: 'Forza', desc: 'Projetos especiais e estruturas reforçadas.' },
                                { slug: 'vigia', nome: 'Vigia', desc: 'Postes para segurança e monitoramento (CFTV).' },
                                { slug: 'nexo', nome: 'Nexo', desc: 'Acessórios: braços, suportes e chumbadores.' },
                                { slug: 'civis', nome: 'Civis', desc: 'Mastros para bandeiras.' },
                            ]).map((linha) => (
                                <div
                                    key={linha.slug}
                                    id={`linha-${linha.slug}`}
                                    className="scroll-mt-32 bg-white border border-industrial-200 flex flex-col"
                                >
                                    <div className="p-6 border-b border-industrial-100">
                                        <div className="bg-industrial-100 text-industrial-500 inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                                            Em Desenvolvimento
                                        </div>
                                        <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight">Linha {linha.nome}</h3>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <p className="text-industrial-500 text-sm font-medium leading-relaxed flex-1">{linha.desc}</p>
                                        <p className="text-[11px] font-black uppercase tracking-widest text-industrial-400 mt-6">
                                            Datasheet e desenhos técnicos em breve
                                        </p>
                                        <a
                                            href="/contato"
                                            className="mt-4 w-full flex items-center justify-center gap-2 border border-industrial-300 text-industrial-700 font-black uppercase text-xs tracking-widest py-3 hover:border-industrial-900 hover:text-industrial-950 transition-colors"
                                        >
                                            Solicitar à engenharia
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
