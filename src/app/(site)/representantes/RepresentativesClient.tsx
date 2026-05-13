"use client";

import { BrazilMap } from "../../../components/ui/brazil-map"
import { Phone, Mail, MapPin, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import type { Representative } from "../../../lib/data"
import { LeadCaptureDialog } from "./LeadCaptureDialog";

export function RepresentativesClient({ representatives }: { representatives: Representative[] }) {
    // Estado selecionado (UF)
    const [selectedState, setSelectedState] = useState<string | null>(null);
    
    // Gated Contact States
    const [isContactRevealed, setIsContactRevealed] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Verificar se já revelou anteriormente
    useEffect(() => {
        const hasRevealed = localStorage.getItem("hasRevealedReps");
        if (hasRevealed === "true") {
            setIsContactRevealed(true);
        }
    }, []);

    // Array de UFs que possuem pelo menos um representante (para acender no mapa)
    const activeStates = Array.from(new Set(representatives.flatMap(r => r.states)));

    // Representantes filtrados pelo estado selecionado
    const filteredReps = selectedState 
        ? representatives.filter(r => r.states.includes(selectedState))
        : [];

    const handleSuccessReveal = () => {
        setIsContactRevealed(true);
        setIsDialogOpen(false);
        localStorage.setItem("hasRevealedReps", "true");
    };

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
                                                        {rep.company && (
                                                            <div className="text-sm font-medium text-industrial-500 uppercase tracking-wide">
                                                                {rep.company}
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex flex-col gap-3 shrink-0 bg-industrial-50 p-4 border border-industrial-100 min-w-[240px]">
                                                        {!isContactRevealed ? (
                                                            <button 
                                                                onClick={() => setIsDialogOpen(true)}
                                                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-industrial-950 text-white rounded-md text-sm font-bold uppercase tracking-wide hover:bg-accent-dark transition-colors"
                                                            >
                                                                <Lock className="size-4 text-accent-premium" />
                                                                Mostrar Contatos
                                                            </button>
                                                        ) : (
                                                            <>
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
                                                                <a 
                                                                    href={`https://api.whatsapp.com/send?phone=55${rep.phone.replace(/[^0-9]/g, '')}&text=Ol%C3%A1%2C%20encontrei%20seu%20contato%20no%20site%20da%20B%26B%20Ilumina%C3%A7%C3%A3o.`} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#25D366] text-white rounded-md text-sm font-bold uppercase tracking-wide hover:bg-[#1DA851] transition-colors"
                                                                >
                                                                    WhatsApp
                                                                </a>
                                                            </>
                                                        )}
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

            <LeadCaptureDialog 
                isOpen={isDialogOpen} 
                onClose={() => setIsDialogOpen(false)} 
                onSuccess={handleSuccessReveal}
                representativeState={selectedState || "Brasil"}
            />
        </section>
    )
}
