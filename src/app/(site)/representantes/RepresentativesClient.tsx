"use client";

import { BrazilMap } from "@/components/ui/brazil-map"
import { Phone, Mail, MapPin } from "lucide-react"
import { useState } from "react"
import type { Representative } from "@/lib/data"

export function RepresentativesClient({ representatives }: { representatives: Representative[] }) {
    // Estado selecionado (UF)
    const [selectedState, setSelectedState] = useState<string | null>(null);

    // Array de UFs que possuem pelo menos um representante (para acender no mapa)
    const activeStates = Array.from(new Set(representatives.flatMap(r => r.states)));

    // Representantes filtrados pelo estado selecionado
    const filteredReps = selectedState 
        ? representatives.filter(r => r.states.includes(selectedState))
        : [];

    return (
        <section className="py-16 md:py-24 bg-industrial-50 relative" aria-labelledby="reps-map-heading">
            <div className="container mx-auto px-4">
                <h2 id="reps-map-heading" className="sr-only">Busca Interativa de Representantes no Mapa</h2>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Mapa Geográfico na Esquerda */}
                    <div className="sticky top-28 bg-white p-6 md:p-10 border border-industrial-200">
                        <div className="mb-6 border-b-2 border-industrial-200 pb-3 flex items-center justify-between">
                            <h3 className="text-xl font-black text-industrial-950 uppercase tracking-tight">
                                Selecione seu <span className="text-accent-dark">Estado</span>
                            </h3>
                            <MapPin className="size-5 text-industrial-400" />
                        </div>
                        <BrazilMap 
                            selectedState={selectedState} 
                            onStateSelect={(uf) => setSelectedState(uf)}
                            activeStates={activeStates}
                        />
                    </div>

                    {/* Resultados à Direita */}
                    <div className="space-y-8 min-h-[400px]">
                        {!selectedState ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-industrial-200 bg-white/50 space-y-4">
                                <div className="size-16 rounded-full bg-industrial-100 flex items-center justify-center">
                                    <MapPin className="size-8 text-industrial-400" />
                                </div>
                                <h3 className="text-2xl font-black text-industrial-950 uppercase tracking-tight">
                                    Clique no mapa
                                </h3>
                                <p className="text-industrial-500 max-w-sm">
                                    Selecione um estado no mapa do Brasil ao lado para visualizar os representantes autorizados e distribuidores exclusivos daquela região.
                                </p>
                            </div>
                        ) : filteredReps.length === 0 ? (
                            <div className="p-8 border border-industrial-200 bg-white">
                                <p className="text-xl font-bold text-industrial-950 uppercase mb-2">
                                    Nenhum representante encontrado em {selectedState}.
                                </p>
                                <p className="text-industrial-500">
                                    Por favor, entre em contato diretamente com nossa central para atendimento nesta região.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="border-b-2 border-accent-premium pb-3">
                                    <h3 className="text-2xl font-black text-industrial-950 uppercase tracking-tight">
                                        Atendimento em <span className="text-accent-dark">{selectedState}</span>
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {filteredReps.map((rep, idx) => (
                                        <div key={idx} className="bg-white p-6 md:p-8 border border-industrial-200 hover:border-accent-premium transition-colors group relative overflow-hidden shadow-sm hover:shadow-md">
                                            {/* Accent line left */}
                                            <div className="absolute top-0 left-0 h-full w-1.5 bg-industrial-200 group-hover:bg-accent-premium transition-colors" />
                                            
                                            <div className="pl-4">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                    <div>
                                                        {rep.region && (
                                                            <span className="inline-block px-2 py-1 bg-industrial-100 text-industrial-600 text-[10px] font-bold uppercase tracking-wider mb-3">
                                                                Região: {rep.region}
                                                            </span>
                                                        )}
                                                        <h4 className="text-2xl font-bold text-industrial-950 uppercase leading-none mb-1">{rep.name}</h4>
                                                    </div>
                                                    
                                                    <div className="flex flex-col gap-3 shrink-0 bg-industrial-50 p-4 border border-industrial-100 min-w-[240px]">
                                                        <a href={`tel:${rep.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-3 text-industrial-600 hover:text-industrial-950 transition-colors text-sm font-medium">
                                                            <div className="size-8 bg-white flex items-center justify-center rounded-sm border border-industrial-200">
                                                                <Phone className="size-4 text-accent-dark" />
                                                            </div>
                                                            {rep.phone}
                                                        </a>
                                                        <a href={`mailto:${rep.email}`} className="flex items-center gap-3 text-industrial-600 hover:text-industrial-950 transition-colors text-sm font-medium">
                                                            <div className="size-8 bg-white flex items-center justify-center rounded-sm border border-industrial-200">
                                                                <Mail className="size-4 text-accent-dark" />
                                                            </div>
                                                            <span className="break-all">{rep.email}</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
