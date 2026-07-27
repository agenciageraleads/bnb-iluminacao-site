'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, FileText, Ruler, ChevronDown, AlertTriangle } from 'lucide-react'

import { DownloadGrid } from './DownloadGrid'
import type { Catalog } from '@/lib/data'
import { URBAN_FAMILIES, desenhoTecnicoHref } from '@/lib/urban-downloads'
import { VERSA_FAMILIES, VERSA_LUMINARIA, desenhoVersaHref, labelAlturaVersa } from '@/lib/versa-downloads'
import { NEXO_DATASHEETS } from '@/lib/nexo-downloads'
import { CIVIS_FAMILIES, desenhoMastroHref } from '@/lib/civis-downloads'

type TabKey = 'comerciais' | 'tecnicos'
type Mount = 'E' | 'F'

/**
 * Âncoras da página e a aba onde cada uma vive.
 *
 * IMPORTANTE: `#linha-*` são alvo de QR code IMPRESSO no catálogo — uma âncora que
 * deixe de existir vira 404 numa peça de gráfica que não dá para corrigir depois.
 * Por isso os dois painéis ficam SEMPRE no DOM (o inativo apenas com `hidden`), e o
 * efeito abaixo troca de aba antes de rolar até o alvo.
 */
const TAB_BY_ANCHOR: Record<string, TabKey> = {
    guias: 'comerciais',
    'guia-durabilidade': 'comerciais',
    'linha-urban': 'tecnicos',
    'linha-versa': 'tecnicos',
    'linha-nexo': 'tecnicos',
    'linha-civis': 'tecnicos',
    'linha-orna': 'tecnicos',
    'linha-forza': 'tecnicos',
    'linha-vigia': 'tecnicos',
}

const TABS: Array<{ key: TabKey; label: string; hint: string }> = [
    { key: 'comerciais', label: 'Catálogos & Guias', hint: 'Material comercial para enviar ao cliente' },
    { key: 'tecnicos', label: 'Datasheets & Desenhos', hint: 'Documentação técnica por linha e altura' },
]

const DEV_LINES = [
    { slug: 'orna', nome: 'Orna', desc: 'Postes ornamentais que trazem identidade ao ambiente.' },
    { slug: 'forza', nome: 'Forza', desc: 'Projetos especiais e estruturas reforçadas.' },
    { slug: 'vigia', nome: 'Vigia', desc: 'Postes para segurança e monitoramento (CFTV).' },
] as const

/* -------------------------------------------------------------------------- */
/*  Card de família técnica — datasheet + desenho por altura                   */
/* -------------------------------------------------------------------------- */

type FamilyLike = {
    sigla: string
    nome: string
    datasheet: string
    alturasEng: number[]
    alturasFla: number[]
}

function FamilyCard({
    familia,
    codigo,
    hrefBuilder,
    labelAltura = (a: number) => `${a}m`,
}: {
    familia: FamilyLike
    codigo: string
    hrefBuilder: (sigla: string, altura: number, mount: Mount) => string
    labelAltura?: (altura: number) => string
}) {
    const [mount, setMount] = React.useState<Mount>('E')
    const alturas = mount === 'E' ? familia.alturasEng : familia.alturasFla
    const [altura, setAltura] = React.useState<number>(familia.alturasEng[0])

    function handleMount(next: Mount) {
        setMount(next)
        const disponiveis = next === 'E' ? familia.alturasEng : familia.alturasFla
        if (!disponiveis.includes(altura)) setAltura(disponiveis[0])
    }

    const selectId = `altura-${codigo}`

    return (
        <div className="bg-white border border-industrial-200 hover:border-accent-premium transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col rounded-2xl">
            <div className="p-6 border-b border-industrial-100">
                <div className="bg-accent-premium text-black inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                    {codigo}
                </div>
                <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight">{familia.nome}</h3>
            </div>

            <div className="p-6 space-y-5 flex flex-col flex-1">
                <a
                    href={familia.datasheet}
                    download
                    className="w-full flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors rounded-lg"
                >
                    <Download className="size-4" />
                    Baixar Datasheet
                </a>

                <div className="bg-industrial-50 border border-industrial-200 rounded-lg p-4 space-y-4 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-industrial-400">
                        Desenho técnico cotado por altura
                    </p>

                    <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-industrial-400 mb-2">
                            Fixação
                        </span>
                        <div className="flex border border-industrial-200 rounded-lg overflow-hidden bg-white">
                            {([
                                { key: 'E' as const, label: 'Engastado' },
                                { key: 'F' as const, label: 'Flangeado' },
                            ]).map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => handleMount(opt.key)}
                                    aria-pressed={mount === opt.key}
                                    className={`flex-1 font-black text-[11px] uppercase tracking-wide py-2.5 transition-colors border-industrial-200 [&+&]:border-l ${
                                        mount === opt.key
                                            ? 'bg-industrial-950 text-white'
                                            : 'bg-white text-industrial-500 hover:text-industrial-900'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2.5 items-end">
                        <div className="flex-1">
                            <label
                                htmlFor={selectId}
                                className="block text-[10px] font-black uppercase tracking-widest text-industrial-400 mb-2"
                            >
                                Altura
                            </label>
                            <div className="relative">
                                <select
                                    id={selectId}
                                    value={altura}
                                    onChange={(e) => setAltura(Number(e.target.value))}
                                    className="w-full font-bold text-sm py-2.5 pl-3 pr-9 border border-industrial-300 rounded-lg bg-white text-industrial-950 cursor-pointer appearance-none"
                                >
                                    {alturas.map((a) => (
                                        <option key={a} value={a}>
                                            {labelAltura(a)}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    className="size-4 text-industrial-950 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                                    strokeWidth={3}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                        <a
                            href={hrefBuilder(familia.sigla, altura, mount)}
                            download
                            className="shrink-0 flex items-center justify-center gap-2 bg-white text-industrial-700 border border-industrial-300 font-black uppercase text-[11px] tracking-widest py-2.5 px-4 rounded-lg hover:border-industrial-900 hover:text-industrial-950 transition-colors"
                        >
                            <Download className="size-4" />
                            Baixar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* Cabeçalho de seção de linha */
function LineHead({ tag, titulo, destaque, descricao }: { tag: string; titulo: string; destaque: string; descricao: string }) {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-industrial-200 text-industrial-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-6 rounded-full">
                <Ruler className="size-4 text-accent-dark" />
                {tag}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tighter leading-none mb-4">
                {titulo} <span className="text-accent-premium">{destaque}</span>
            </h2>
            <p className="text-industrial-500 text-base md:text-lg font-medium max-w-2xl mx-auto">{descricao}</p>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*  Painel comercial                                                           */
/* -------------------------------------------------------------------------- */

function CommercialPanel({ catalogs }: { catalogs: Catalog[] }) {
    return (
        <>
            {catalogs.length > 0 ? (
                <DownloadGrid catalogs={catalogs} />
            ) : (
                <div className="text-center py-20 bg-white border-2 border-dashed border-industrial-300 max-w-3xl mx-auto rounded-2xl">
                    <FileText className="size-16 text-industrial-300 mx-auto mb-4" />
                    <h2 className="text-xl font-black text-industrial-400 uppercase tracking-widest">
                        Nenhum catálogo disponível no momento
                    </h2>
                    <p className="text-industrial-400 text-sm mt-2">Estamos atualizando nossos materiais técnicos.</p>
                </div>
            )}

            <div id="guias" className="max-w-6xl mx-auto mt-24 scroll-mt-32">
                <LineHead
                    tag="Guias Técnicos"
                    titulo="Guia da"
                    destaque="Durabilidade"
                    descricao="E-book técnico sobre a vida útil dos postes metálicos: corrosão, preparo de superfície, pintura eletrostática, galvanização e como escolher o acabamento certo por ambiente."
                />

                <div
                    id="guia-durabilidade"
                    className="scroll-mt-32 max-w-4xl mx-auto bg-white border border-industrial-200 shadow-sm overflow-hidden grid md:grid-cols-[280px_1fr] rounded-2xl"
                >
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
                            Por que dois postes iguais duram tempos diferentes? Comparativo de acabamentos, o segredo da
                            preparação de superfície, galvanização, manutenção e como escolher. Material de referência para
                            engenharia, arquitetura e compras.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <a
                                href="/downloads/guia-bb-durabilidade-postes-metalicos.pdf"
                                download="B&B - Guia de Durabilidade dos Postes Metálicos.pdf"
                                className="flex-1 flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors rounded-lg"
                            >
                                <Download className="size-4" />
                                Baixar o Guia
                            </a>
                            <Link
                                href="/blog/durabilidade-dos-postes-metalicos"
                                className="flex-1 flex items-center justify-center gap-2 border border-industrial-300 text-industrial-700 font-black uppercase text-xs tracking-widest py-4 hover:border-industrial-900 hover:text-industrial-950 transition-colors rounded-lg"
                            >
                                Ler o artigo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

/* -------------------------------------------------------------------------- */
/*  Painel técnico                                                             */
/* -------------------------------------------------------------------------- */

function TechnicalPanel() {
    return (
        <>
            <section id="linha-urban" className="max-w-6xl mx-auto scroll-mt-32">
                <LineHead
                    tag="Linha Urban"
                    titulo="Datasheets"
                    destaque="& Desenhos Técnicos"
                    descricao="Ficha técnica completa de cada modelo e desenho técnico dimensional por altura, em PDF."
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {URBAN_FAMILIES.map((familia) => (
                        <FamilyCard
                            key={familia.sigla}
                            familia={familia}
                            codigo={`BB-URB-${familia.sigla}`}
                            hrefBuilder={desenhoTecnicoHref}
                        />
                    ))}
                </div>
                <div className="flex items-start gap-2 bg-white border border-dashed border-industrial-300 rounded-2xl px-4 py-3.5 mt-7 text-[12.5px] text-industrial-500 max-w-3xl mx-auto">
                    <AlertTriangle className="size-4 shrink-0 mt-0.5 text-accent-dark" />
                    <p>
                        <b className="text-industrial-950">Engastado vs. Flangeado:</b> escolha a fixação e a altura para
                        baixar o desenho cotado correspondente. A lista de alturas muda conforme a fixação — nem todo modelo
                        existe nas duas.
                    </p>
                </div>
            </section>

            <section id="linha-versa" className="max-w-6xl mx-auto mt-24 scroll-mt-32">
                <LineHead
                    tag="Linha Versa"
                    titulo="Datasheets"
                    destaque="& Desenhos Técnicos"
                    descricao="Ficha técnica completa e desenho técnico dimensional por altura dos postes decorativos Girafa LED e Éos (globo), em PDF."
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {VERSA_FAMILIES.map((familia) => (
                        <FamilyCard
                            key={familia.sigla}
                            familia={familia}
                            codigo={`BB-VRS-${familia.sigla}`}
                            hrefBuilder={desenhoVersaHref}
                            labelAltura={labelAlturaVersa}
                        />
                    ))}

                    <div className="bg-white border border-industrial-200 hover:border-accent-premium transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col rounded-2xl">
                        <div className="p-6 border-b border-industrial-100">
                            <div className="bg-accent-premium text-black inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                                {VERSA_LUMINARIA.codigo}
                            </div>
                            <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight">
                                {VERSA_LUMINARIA.nome}
                            </h3>
                        </div>
                        <div className="p-6 flex flex-col flex-1 justify-end">
                            <a
                                href={VERSA_LUMINARIA.desenho}
                                download
                                className="w-full flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors rounded-lg"
                            >
                                <Download className="size-4" />
                                Baixar Desenho Técnico
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="linha-nexo" className="max-w-6xl mx-auto mt-24 scroll-mt-32">
                <LineHead
                    tag="Linha Nexo"
                    titulo="Datasheets"
                    destaque="por Produto"
                    descricao="Ficha técnica completa dos acessórios que conectam o poste ao projeto."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {NEXO_DATASHEETS.map((item) => (
                        <div
                            key={item.codigo}
                            className="bg-white border border-industrial-200 hover:border-accent-premium transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col rounded-2xl"
                        >
                            <div className="p-6 border-b border-industrial-100">
                                <div className="bg-accent-premium text-black inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                                    {item.codigo}
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight">{item.nome}</h3>
                            </div>
                            <div className="p-6 flex flex-col flex-1 justify-end">
                                <a
                                    href={item.datasheet}
                                    download
                                    className="w-full flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors rounded-lg"
                                >
                                    <Download className="size-4" />
                                    Baixar Datasheet
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section id="linha-civis" className="max-w-6xl mx-auto mt-24 scroll-mt-32">
                <LineHead
                    tag="Linha Civis"
                    titulo="Mastros"
                    destaque="para Bandeira"
                    descricao="Mastros telecônicos em aço galvanizado a fogo, de 6 a 12 metros, com roldana, arruela-guia e cleat de amarração. Datasheet com guia bandeira × mastro e desenho técnico por altura."
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {CIVIS_FAMILIES.map((familia) => (
                        <FamilyCard
                            key={familia.sigla}
                            familia={familia}
                            codigo={`BB-${familia.sigla}`}
                            hrefBuilder={(_sigla, altura, mount) => desenhoMastroHref(altura, mount)}
                        />
                    ))}
                </div>
            </section>

            <section className="max-w-6xl mx-auto mt-24">
                <LineHead
                    tag="Demais Linhas"
                    titulo="Materiais Técnicos"
                    destaque="por Linha"
                    descricao="Datasheets e desenhos técnicos das demais linhas estão em desenvolvimento. Precisa de uma especificação agora? Fale com a nossa engenharia."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DEV_LINES.map((linha) => (
                        <div
                            key={linha.slug}
                            id={`linha-${linha.slug}`}
                            className="scroll-mt-32 bg-white border border-industrial-200 flex flex-col rounded-2xl"
                        >
                            <div className="p-6 border-b border-industrial-100">
                                <div className="bg-industrial-100 text-industrial-500 inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-3">
                                    Em Desenvolvimento
                                </div>
                                <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight">
                                    Linha {linha.nome}
                                </h3>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="text-industrial-500 text-sm font-medium leading-relaxed flex-1">{linha.desc}</p>
                                <p className="text-[11px] font-black uppercase tracking-widest text-industrial-400 mt-6">
                                    Datasheet e desenhos técnicos em breve
                                </p>
                                <a
                                    href="/contato"
                                    className="mt-4 w-full flex items-center justify-center gap-2 border border-industrial-300 text-industrial-700 font-black uppercase text-xs tracking-widest py-3 hover:border-industrial-900 hover:text-industrial-950 transition-colors rounded-lg"
                                >
                                    Solicitar à engenharia
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

/* -------------------------------------------------------------------------- */

export function DownloadsTabs({ catalogs }: { catalogs: Catalog[] }) {
    const [tab, setTab] = React.useState<TabKey>('comerciais')

    // Abre a aba correta quando a URL chega com âncora (QR do catálogo impresso),
    // e só então rola até o alvo — um elemento em painel `hidden` não é rolável.
    React.useEffect(() => {
        function syncFromHash() {
            const id = window.location.hash.replace('#', '')
            if (!id) return
            const alvo = TAB_BY_ANCHOR[id]
            if (!alvo) return
            setTab(alvo)
            requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            })
        }

        syncFromHash()
        window.addEventListener('hashchange', syncFromHash)
        return () => window.removeEventListener('hashchange', syncFromHash)
    }, [])

    return (
        <>
            <div className="max-w-3xl mx-auto mb-14" role="tablist" aria-label="Tipo de material">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TABS.map((t) => {
                        const ativo = tab === t.key
                        return (
                            <button
                                key={t.key}
                                type="button"
                                role="tab"
                                id={`tab-${t.key}`}
                                aria-selected={ativo}
                                aria-controls={`panel-${t.key}`}
                                onClick={() => setTab(t.key)}
                                className={`text-left px-5 py-4 rounded-2xl border transition-all ${
                                    ativo
                                        ? 'bg-industrial-950 border-industrial-950 text-white shadow-lg'
                                        : 'bg-white border-industrial-200 text-industrial-500 hover:border-industrial-900 hover:text-industrial-950'
                                }`}
                            >
                                <span className="block font-black uppercase text-sm tracking-widest">{t.label}</span>
                                <span
                                    className={`block text-[12px] font-medium mt-1 ${
                                        ativo ? 'text-industrial-300' : 'text-industrial-400'
                                    }`}
                                >
                                    {t.hint}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/*
              Os dois painéis ficam no DOM sempre: o inativo apenas recebe `hidden`.
              Isso mantém as âncoras `#linha-*` e `#guias` presentes no HTML entregue,
              que é o que os QR codes impressos e os crawlers precisam encontrar.
            */}
            <div role="tabpanel" id="panel-comerciais" aria-labelledby="tab-comerciais" hidden={tab !== 'comerciais'}>
                <CommercialPanel catalogs={catalogs} />
            </div>
            <div role="tabpanel" id="panel-tecnicos" aria-labelledby="tab-tecnicos" hidden={tab !== 'tecnicos'}>
                <TechnicalPanel />
            </div>
        </>
    )
}
