"use client"

import * as React from "react"
import Link from "next/link"
import {
    FileText,
    Download,
    RefreshCw,
    Send,
    Mail,
    LayoutGrid,
    AlertTriangle,
    ChevronDown,
} from "lucide-react"
import {
    URBAN_FAMILIES,
    desenhoTecnicoHref,
    type UrbanFamily,
    type UrbanMount,
} from "@/lib/urban-downloads"

type TabKey = "comerciais" | "tecnicos"

/* -------------------------------------------------------------------------- */
/*  Catálogos & Guias Comerciais — lista de arquivos (sem foto de preview)     */
/* -------------------------------------------------------------------------- */

const COMMERCIAL_FILES = [
    {
        titulo: "Guia Comercial de Produtos",
        descricao:
            "As 7 linhas (Urban, Orna, Versa, Forza, Vigia, Nexo, Civis) com altura, acabamento e fixação. Vitrine para o primeiro contato.",
        meta: "PDF · 11 páginas · 2026",
        href: "/downloads/guia-comercial-bb.pdf",
    },
    {
        titulo: "Catálogo Institucional",
        descricao:
            "Catálogo institucional com a apresentação da fábrica, processos e portfólio.",
        meta: "PDF · Institucional",
        href: "/downloads/catalogo-bb-iluminacao.pdf",
    },
]

function CommercialPanel() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Trust strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-11">
                {[
                    {
                        icon: <RefreshCw className="size-5" />,
                        title: "Sempre atualizado",
                        desc: "A versão mais recente de cada material, em PDF.",
                    },
                    {
                        icon: <Send className="size-5" />,
                        title: "Pronto para enviar",
                        desc: "Otimizado para e-mail e WhatsApp.",
                    },
                    {
                        icon: <LayoutGrid className="size-5" />,
                        title: "Visão de linhas",
                        desc: "Panorama comercial das 7 linhas B&B.",
                    },
                ].map((item) => (
                    <div
                        key={item.title}
                        className="flex items-start gap-3 p-5 bg-white border border-industrial-200 rounded-2xl"
                    >
                        <span className="text-accent-dark shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                            <b className="block font-display font-black text-industrial-950 uppercase text-xs tracking-widest">
                                {item.title}
                            </b>
                            <span className="text-industrial-500 text-[13px] font-medium">
                                {item.desc}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* File list */}
            <div className="flex flex-col gap-3.5 max-w-5xl mx-auto">
                {COMMERCIAL_FILES.map((file) => (
                    <div
                        key={file.titulo}
                        className="flex flex-col sm:flex-row sm:items-center gap-5 bg-white border border-industrial-200 rounded-2xl p-6 transition-all hover:border-industrial-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                    >
                        <div className="size-[54px] shrink-0 bg-industrial-950 text-accent-premium flex items-center justify-center rounded-lg">
                            <FileText className="size-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-display font-black text-industrial-950 uppercase text-lg leading-tight tracking-tight">
                                {file.titulo}
                            </h3>
                            <p className="text-industrial-500 text-[13px] font-medium mt-1">
                                {file.descricao}
                            </p>
                            <div className="mt-2 inline-flex items-center gap-2">
                                <span className="inline-flex items-center bg-industrial-100 text-industrial-600 rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest font-display">
                                    PDF
                                </span>
                                <span className="text-industrial-400 text-[10.5px] font-bold uppercase tracking-widest font-display">
                                    {file.meta}
                                </span>
                            </div>
                        </div>
                        <a
                            href={file.href}
                            download
                            className="shrink-0 inline-flex items-center justify-center gap-2 bg-industrial-950 text-white font-display font-black uppercase text-[11.5px] tracking-widest px-5 py-3.5 rounded-lg hover:bg-industrial-800 transition-colors"
                        >
                            <Download className="size-4" />
                            Baixar
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*  Urban family card — datasheet + desenho técnico (toggle + dropdown)         */
/* -------------------------------------------------------------------------- */

function UrbanFamilyCard({ familia }: { familia: UrbanFamily }) {
    const [mount, setMount] = React.useState<UrbanMount>("E")
    const alturas = mount === "E" ? familia.alturasEng : familia.alturasFla
    const [altura, setAltura] = React.useState<number>(alturas[0])

    function handleMount(next: UrbanMount) {
        setMount(next)
        const disponiveis = next === "E" ? familia.alturasEng : familia.alturasFla
        if (!disponiveis.includes(altura)) setAltura(disponiveis[0])
    }

    const href = desenhoTecnicoHref(familia.sigla, altura, mount)

    return (
        <div className="bg-white border border-industrial-200 rounded-2xl flex flex-col">
            <div className="p-5 border-b border-industrial-100">
                <span className="inline-block bg-industrial-950 text-accent-premium font-display font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md mb-2.5">
                    BB-URB-{familia.sigla}
                </span>
                <h3 className="font-display font-black text-industrial-950 uppercase text-base leading-tight tracking-tight">
                    {familia.nome}
                </h3>
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Bloco: Ficha Técnica */}
                <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2 font-display font-black text-[11px] tracking-widest uppercase text-industrial-950">
                        <span className="w-1 h-3.5 bg-accent-premium rounded-xs inline-block" />
                        Ficha Técnica
                        <small className="font-sans font-bold text-[10px] tracking-normal normal-case text-industrial-400">
                            — datasheet do modelo
                        </small>
                    </span>
                    <a
                        href={familia.datasheet}
                        download
                        className="w-full inline-flex items-center justify-center gap-2 bg-industrial-950 text-white font-display font-black uppercase text-[11.5px] tracking-widest py-3.5 rounded-lg hover:bg-industrial-800 transition-colors"
                    >
                        <Download className="size-4" />
                        Baixar Datasheet
                    </a>
                </div>

                {/* Bloco: Desenho Técnico */}
                <div className="flex flex-col gap-3 bg-industrial-50 border border-industrial-200 rounded-lg p-4">
                    <span className="flex items-center gap-2 font-display font-black text-[11px] tracking-widest uppercase text-industrial-950">
                        <span className="w-1 h-3.5 bg-accent-premium rounded-xs inline-block" />
                        Desenho Técnico
                        <small className="font-sans font-bold text-[10px] tracking-normal normal-case text-industrial-400">
                            — cotado por altura
                        </small>
                    </span>

                    {/* Fixação */}
                    <div>
                        <label className="block font-display font-black text-[10px] tracking-widest uppercase text-industrial-400 mb-2">
                            Fixação
                        </label>
                        <div className="flex border border-industrial-200 rounded-lg overflow-hidden">
                            {([
                                { key: "E" as const, label: "Engastado" },
                                { key: "F" as const, label: "Flangeado" },
                            ]).map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => handleMount(opt.key)}
                                    aria-pressed={mount === opt.key}
                                    className={`flex-1 font-display font-bold text-[11px] uppercase tracking-wide py-2.5 transition-colors border-industrial-200 [&+&]:border-l ${
                                        mount === opt.key
                                            ? "bg-industrial-950 text-white"
                                            : "bg-white text-industrial-500 hover:text-industrial-900"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Altura + botão */}
                    <div className="flex gap-2.5 items-end">
                        <div className="flex-1">
                            <label
                                htmlFor={`altura-${familia.sigla}`}
                                className="block font-display font-black text-[10px] tracking-widest uppercase text-industrial-400 mb-2"
                            >
                                Altura do poste
                            </label>
                            <div className="relative">
                                <select
                                    id={`altura-${familia.sigla}`}
                                    value={altura}
                                    onChange={(e) => setAltura(Number(e.target.value))}
                                    className="w-full font-sans font-bold text-sm py-2.5 pl-3 pr-9 border border-industrial-300 rounded-lg bg-white text-industrial-950 cursor-pointer appearance-none"
                                >
                                    {alturas.map((a) => (
                                        <option key={a} value={a}>
                                            {a} metros
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
                            href={href}
                            download
                            className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-industrial-700 border border-industrial-300 font-display font-black uppercase text-[11.5px] tracking-widest py-2.5 px-4 rounded-lg hover:border-industrial-900 hover:text-industrial-950 transition-colors"
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

/* -------------------------------------------------------------------------- */
/*  Linhas em desenvolvimento                                                  */
/* -------------------------------------------------------------------------- */

const DEV_LINES = [
    { slug: "orna", nome: "Orna", desc: "Postes ornamentais que trazem identidade ao ambiente." },
    { slug: "versa", nome: "Versa", desc: "Postes decorativos — girafa LED e rebatedor." },
    { slug: "forza", nome: "Forza", desc: "Projetos especiais e estruturas reforçadas." },
    { slug: "vigia", nome: "Vigia", desc: "Postes para segurança e monitoramento (CFTV)." },
    { slug: "nexo", nome: "Nexo", desc: "Acessórios: braços, suportes e chumbadores." },
    { slug: "civis", nome: "Civis", desc: "Mastros para bandeiras." },
] as const

function TechnicalPanel() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* URBAN */}
            <section id="linha-urban" className="scroll-mt-32 max-w-6xl mx-auto">
                <div className="flex items-center gap-3.5 mb-5">
                    <span className="font-display font-black text-[13px] tracking-tight uppercase bg-accent-premium text-black px-3 py-1.5 rounded-xs">
                        Linha Urban
                    </span>
                    <h2 className="font-display font-black text-industrial-950 uppercase text-xl md:text-2xl tracking-tight">
                        Datasheets &amp; desenhos técnicos
                    </h2>
                    <span className="flex-1 h-px bg-industrial-200" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {URBAN_FAMILIES.map((familia) => (
                        <UrbanFamilyCard key={familia.sigla} familia={familia} />
                    ))}
                </div>

                <div className="flex items-start gap-2 bg-white border border-dashed border-industrial-300 rounded-2xl px-4 py-3.5 mt-7 text-[12.5px] text-industrial-500">
                    <AlertTriangle className="size-4 shrink-0 mt-0.5 text-accent-dark" />
                    <p>
                        <b className="text-industrial-950">Engastado vs. Flangeado:</b> selecione a
                        fixação e a altura para baixar o desenho cotado correspondente. Curvos
                        (TCS/TCD) não têm 3 m flangeado; o curvo duplo também não tem 3 m engastado.
                    </p>
                </div>
            </section>

            {/* DEMAIS LINHAS */}
            <section className="max-w-6xl mx-auto mt-14">
                <div className="flex items-center gap-3.5 mb-5">
                    <span className="font-display font-black text-[13px] tracking-tight uppercase bg-industrial-100 text-industrial-500 px-3 py-1.5 rounded-xs">
                        Demais Linhas
                    </span>
                    <h2 className="font-display font-black text-industrial-950 uppercase text-xl md:text-2xl tracking-tight">
                        Em desenvolvimento
                    </h2>
                    <span className="flex-1 h-px bg-industrial-200" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {DEV_LINES.map((linha) => (
                        <div
                            key={linha.slug}
                            id={`linha-${linha.slug}`}
                            className="scroll-mt-32 bg-white border border-industrial-200 rounded-2xl flex flex-col"
                        >
                            <div className="p-5 border-b border-industrial-100">
                                <span className="inline-block bg-industrial-100 text-industrial-500 font-display font-black text-[9.5px] tracking-widest uppercase px-2.5 py-1 rounded-md mb-2.5">
                                    Em Desenvolvimento
                                </span>
                                <h3 className="font-display font-black text-industrial-950 uppercase text-[15px] leading-tight tracking-tight">
                                    Linha {linha.nome}
                                </h3>
                            </div>
                            <div className="p-5 flex flex-col gap-3.5 flex-1">
                                <p className="text-industrial-500 text-[13px] font-medium flex-1">
                                    {linha.desc}
                                </p>
                                <span className="font-display font-black text-[10px] tracking-widest uppercase text-industrial-400">
                                    Datasheet e desenhos em breve
                                </span>
                                <Link
                                    href="/contato"
                                    className="w-full inline-flex items-center justify-center gap-2 border border-industrial-300 text-industrial-700 font-display font-black uppercase text-[11.5px] tracking-widest py-3 rounded-lg hover:border-industrial-900 hover:text-industrial-950 transition-colors"
                                >
                                    <Mail className="size-4" />
                                    Solicitar à engenharia
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

/* -------------------------------------------------------------------------- */
/*  Shell com abas                                                             */
/* -------------------------------------------------------------------------- */

export function DownloadsTabs() {
    const [tab, setTab] = React.useState<TabKey>("comerciais")
    const pendingHash = React.useRef<string | null>(null)

    // Deep-links dos QR codes impressos (/downloads#linha-<slug>) vivem na aba técnica.
    React.useEffect(() => {
        const hash = window.location.hash
        if (hash.startsWith("#linha-")) {
            pendingHash.current = hash.slice(1)
            setTab("tecnicos")
        }
    }, [])

    React.useEffect(() => {
        if (tab === "tecnicos" && pendingHash.current) {
            const id = pendingHash.current
            pendingHash.current = null
            requestAnimationFrame(() => {
                document.getElementById(id)?.scrollIntoView({ block: "start" })
            })
        }
    }, [tab])

    return (
        <>
            {/* Tabs */}
            <div className="flex justify-center mb-10">
                <div
                    role="tablist"
                    aria-label="Categorias de downloads"
                    className="inline-flex border border-industrial-200 bg-white rounded-lg overflow-hidden"
                >
                    {([
                        { key: "comerciais" as const, label: "Catálogos & Guias Comerciais" },
                        { key: "tecnicos" as const, label: "Datasheets & Desenhos Técnicos" },
                    ]).map((t) => (
                        <button
                            key={t.key}
                            role="tab"
                            type="button"
                            aria-selected={tab === t.key}
                            onClick={() => setTab(t.key)}
                            className={`font-display font-black uppercase tracking-wide text-[12.5px] px-5 sm:px-6 py-3.5 transition-colors border-industrial-200 [&+&]:border-l ${
                                tab === t.key
                                    ? "bg-industrial-950 text-white"
                                    : "bg-white text-industrial-500 hover:text-industrial-900"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {tab === "comerciais" ? <CommercialPanel /> : <TechnicalPanel />}
        </>
    )
}
