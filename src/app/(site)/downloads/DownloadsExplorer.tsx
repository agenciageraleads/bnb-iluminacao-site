'use client'

import { useState } from 'react'
import { FileText, Download, AlertTriangle } from 'lucide-react'
import { DownloadGrid } from './DownloadGrid'
import type { Catalog } from '@/lib/data'
import { URBAN_FAMILIES, desenhoTecnicoHref } from '@/lib/urban-downloads'
import { TrackedContactLink } from '@/lib/lead-tracking'

type Familia = (typeof URBAN_FAMILIES)[number]

const TRUST = [
    { title: 'Sempre atualizado', desc: 'A versão mais recente de cada material, em PDF.' },
    { title: 'Pronto para enviar', desc: 'Otimizado para e-mail e WhatsApp.' },
    { title: 'Visão de linhas', desc: 'Panorama comercial das 7 linhas B&B.' },
]

const DEV_LINES = [
    { nome: 'Orna', desc: 'Postes ornamentais que trazem identidade ao ambiente.' },
    { nome: 'Versa', desc: 'Postes decorativos — girafa LED e rebatedor.' },
    { nome: 'Forza', desc: 'Projetos especiais e estruturas reforçadas.' },
    { nome: 'Vigia', desc: 'Postes para segurança e monitoramento (CFTV).' },
    { nome: 'Nexo', desc: 'Acessórios: braços, suportes e chumbadores.' },
    { nome: 'Civis', desc: 'Mastros para bandeiras.' },
]

function BlockLabel({ children, hint }: { children: React.ReactNode; hint: string }) {
    return (
        <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-industrial-950 border-l-4 border-accent-premium pl-2">
            {children}
            <span className="font-medium normal-case tracking-normal text-industrial-400 text-[10px]">{hint}</span>
        </span>
    )
}

function FamilyCard({ familia }: { familia: Familia }) {
    const [mount, setMount] = useState<'E' | 'F'>('E')
    const alturas = mount === 'E' ? familia.alturasEng : familia.alturasFla
    const [altura, setAltura] = useState<number>(alturas[0])

    function changeMount(m: 'E' | 'F') {
        const lista = m === 'E' ? familia.alturasEng : familia.alturasFla
        setMount(m)
        setAltura(lista[0])
    }

    return (
        <div className="flex flex-col bg-white border border-industrial-200 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-industrial-100">
                <span className="inline-block bg-industrial-950 text-accent-premium text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-2.5">
                    BB-URB-{familia.sigla}
                </span>
                <h3 className="font-display font-black uppercase text-industrial-950 text-base leading-tight">{familia.nome}</h3>
            </div>

            <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Ficha Técnica */}
                <div className="flex flex-col gap-2.5">
                    <BlockLabel hint="— datasheet do modelo">Ficha Técnica</BlockLabel>
                    <TrackedContactLink
                        href={familia.datasheet}
                        download
                        channel="download"
                        eventSource="downloads_explorer"
                        eventLabel={`${familia.nome} - Datasheet`}
                        extraPayload={{ lead_cluster: familia.sigla, download_type: "datasheet" }}
                        className="w-full flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-[11px] tracking-widest py-3 rounded-lg hover:bg-industrial-800 transition-colors"
                    >
                        <Download className="size-4" /> Baixar Datasheet
                    </TrackedContactLink>
                </div>

                {/* Desenho Técnico (cotado por altura) */}
                <div className="flex flex-col gap-3 bg-industrial-50 border border-industrial-200 rounded-lg p-4 flex-1">
                    <BlockLabel hint="— cotado por altura">Desenho Técnico</BlockLabel>

                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-industrial-400 mb-2">Fixação</label>
                        <div className="grid grid-cols-2 border border-industrial-200 rounded-lg overflow-hidden">
                            {([['E', 'Engastado'], ['F', 'Flangeado']] as const).map(([m, label]) => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => changeMount(m)}
                                    className={`py-2.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${mount === m ? 'bg-industrial-950 text-white' : 'bg-white text-industrial-500 hover:text-industrial-950'} ${m === 'F' ? 'border-l border-industrial-200' : ''}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-end gap-2.5">
                        <div className="flex-1">
                            <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-industrial-400 mb-2">Altura do poste</label>
                            <select
                                value={altura}
                                onChange={(e) => setAltura(Number(e.target.value))}
                                className="w-full font-bold text-sm px-3 py-2.5 border border-industrial-300 rounded-lg bg-white text-industrial-950 focus:outline-none focus:border-industrial-950"
                            >
                                {alturas.map((a) => (
                                    <option key={a} value={a}>{a} metros</option>
                                ))}
                            </select>
                        </div>
                        <TrackedContactLink
                            href={desenhoTecnicoHref(familia.sigla, altura, mount)}
                            download
                            channel="download"
                            eventSource="downloads_explorer"
                            eventLabel={`${familia.nome} - Desenho ${altura}m ${mount}`}
                            extraPayload={{ lead_cluster: familia.sigla, download_type: "desenho_tecnico" }}
                            className="shrink-0 flex items-center gap-2 bg-white border border-industrial-300 text-industrial-700 font-black uppercase text-[11px] tracking-widest px-4 py-2.5 rounded-lg hover:border-industrial-950 hover:text-industrial-950 transition-colors"
                        >
                            <Download className="size-4" /> Baixar
                        </TrackedContactLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LineHead({ tag, title, dev = false }: { tag: string; title: string; dev?: boolean }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <span className={`font-display font-black uppercase text-[13px] tracking-wide px-3 py-1.5 rounded-md ${dev ? 'bg-industrial-100 text-industrial-500' : 'bg-accent-premium text-black'}`}>
                {tag}
            </span>
            <h2 className="font-display font-black uppercase text-industrial-950 text-lg sm:text-2xl tracking-tight">{title}</h2>
            <span className="flex-1 h-px bg-industrial-200" />
        </div>
    )
}

export function DownloadsExplorer({ catalogs }: { catalogs: Catalog[] }) {
    const [tab, setTab] = useState<'comerciais' | 'tecnicos'>('comerciais')

    return (
        <div className="max-w-6xl mx-auto">
            {/* Abas */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex border border-industrial-200 rounded-lg overflow-hidden bg-white">
                    {([['comerciais', 'Catálogos & Guias Comerciais'], ['tecnicos', 'Datasheets & Desenhos Técnicos']] as const).map(([id, label], i) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setTab(id)}
                            className={`px-5 sm:px-7 py-3.5 text-[12px] font-black uppercase tracking-wider transition-colors ${tab === id ? 'bg-industrial-950 text-white' : 'bg-white text-industrial-500 hover:text-industrial-950'} ${i === 1 ? 'border-l border-industrial-200' : ''}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Painel: Comerciais */}
            {tab === 'comerciais' && (
                <div className="animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                        {TRUST.map((t) => (
                            <div key={t.title} className="bg-white border border-industrial-200 rounded-2xl p-5">
                                <b className="block font-display font-black uppercase text-xs tracking-widest text-industrial-950 mb-1.5">{t.title}</b>
                                <span className="text-sm text-industrial-500">{t.desc}</span>
                            </div>
                        ))}
                    </div>

                    {catalogs.length > 0 ? (
                        <DownloadGrid catalogs={catalogs} />
                    ) : (
                        <div className="text-center py-20 bg-white border-2 border-dashed border-industrial-300 rounded-2xl">
                            <FileText className="size-16 text-industrial-300 mx-auto mb-4" />
                            <h2 className="text-xl font-black text-industrial-400 uppercase tracking-widest">Nenhum catálogo disponível no momento</h2>
                            <p className="text-industrial-400 text-sm mt-2">Estamos atualizando nossos materiais técnicos.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Painel: Técnicos */}
            {tab === 'tecnicos' && (
                <div className="animate-in fade-in duration-200">
                    <LineHead tag="Linha Urban" title="Datasheets & desenhos técnicos" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {URBAN_FAMILIES.map((f) => (
                            <FamilyCard key={f.sigla} familia={f} />
                        ))}
                    </div>

                    <div className="flex items-start gap-2.5 bg-white border border-dashed border-industrial-300 rounded-2xl p-4 text-sm text-industrial-600 mb-12">
                        <AlertTriangle className="size-4 shrink-0 mt-0.5 text-accent-dark" />
                        <p>
                            <b className="text-industrial-950 font-bold">Engastado vs. Flangeado:</b> selecione a fixação e a altura para baixar o desenho cotado correspondente. Curvos (TCS/TCD) não têm 3 m flangeado; o curvo duplo também não tem 3 m engastado.
                        </p>
                    </div>

                    <LineHead tag="Demais Linhas" title="Em desenvolvimento" dev />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {DEV_LINES.map((d) => (
                            <div key={d.nome} className="flex flex-col bg-white border border-industrial-200 rounded-2xl overflow-hidden">
                                <div className="p-5 border-b border-industrial-100">
                                    <span className="inline-block bg-industrial-100 text-industrial-500 text-[9.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mb-2.5">Em Desenvolvimento</span>
                                    <h3 className="font-display font-black uppercase text-industrial-950 text-base">Linha {d.nome}</h3>
                                </div>
                                <div className="p-5 flex flex-col gap-4 flex-1">
                                    <p className="text-sm text-industrial-500 flex-1">{d.desc}</p>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-industrial-400">Datasheet e desenhos em breve</span>
                                    <a
                                        href="/contato"
                                        className="w-full flex items-center justify-center gap-2 bg-white border border-industrial-300 text-industrial-700 font-black uppercase text-[11px] tracking-widest py-2.5 rounded-lg hover:border-industrial-950 hover:text-industrial-950 transition-colors"
                                    >
                                        Solicitar à engenharia
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
