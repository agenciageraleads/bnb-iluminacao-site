"use client";

import { BrazilMap } from "../../../components/ui/brazil-map"
import { Phone, Mail, MapPin, Lock } from "lucide-react"
import { useState, useEffect } from "react"
import type { Representative, RepresentativeTerritory } from "../../../lib/data"
import { LeadCaptureDialog } from "./LeadCaptureDialog";

// Mapeamento de canais/mercados de atuação para exibição no frontend (comentários em pt-br)
const MARKET_LABELS: Record<string, string> = {
    revenda: 'Revenda / Lojistas',
    construtoras: 'Construtoras',
    material_construcao: 'Material de Construção',
    consumidor_final: 'Consumidor Final',
    atacado_distribuidor: 'Atacado / Distribuidor',
    industria: 'Indústria / Corporativo',
};

const MAX_VISIBLE_MARKETS = 3;

type TerritoryRepresentative = {
    rep: Representative
    territory: RepresentativeTerritory
}

function getRepresentativeStates(rep: Representative) {
    return [
        ...rep.states,
        ...(rep.territories ?? []).map((territory) => territory.uf),
    ].filter(Boolean);
}

function getTerritoriesForState(rep: Representative, selectedState: string): RepresentativeTerritory[] {
    const territories = (rep.territories ?? [])
        .filter((territory) => territory.uf === selectedState);

    if (territories.length > 0) {
        return territories;
    }

    if (rep.region?.trim()) {
        return [{
            key: `${selectedState}-${rep.region}`,
            uf: selectedState,
            macroRegion: rep.region,
            cities: [],
            status: 'needs_review',
        }];
    }

    return [{
        key: `${selectedState}-statewide`,
        uf: selectedState,
        macroRegion: 'Todo o estado',
        cities: [],
        status: 'statewide',
    }];
}

function buildTerritoryGroups(representatives: Representative[], selectedState: string) {
    const groups = new Map<string, { label: string; priority: number; rank: number; rows: TerritoryRepresentative[] }>();

    representatives.forEach((rep) => {
        getTerritoriesForState(rep, selectedState).forEach((territory) => {
            const label = territory.macroRegion || 'Todo o estado';
            const key = `${selectedState}:${label}`;
            const current = groups.get(key) ?? {
                label,
                priority: territory.priority ?? 999,
                rank: groups.size,
                rows: [],
            };

            current.priority = Math.min(current.priority, territory.priority ?? 999);
            current.rows.push({ rep, territory });
            groups.set(key, current);
        });
    });

    return [...groups.entries()]
        .map(([key, group]) => ({ key, ...group }))
        .sort((a, b) => {
            const hasExplicitPriority = a.priority !== 999 || b.priority !== 999;

            if (hasExplicitPriority && a.priority !== b.priority) {
                return a.priority - b.priority;
            }

            return a.rank - b.rank;
        });
}

export function RepresentativesClient({ representatives }: { representatives: Representative[] }) {
    // Estado selecionado (UF)
    const [selectedState, setSelectedState] = useState<string | null>(null);
    
    // Gated Contact States
    const [isContactRevealed, setIsContactRevealed] = useState(false);
    const [dialogRepName, setDialogRepName] = useState<string | null>(null);

    // Verificar se já revelou anteriormente
    useEffect(() => {
        const hasRevealed = localStorage.getItem("hasRevealedReps");
        if (hasRevealed === "true") {
            setIsContactRevealed(true);
        }
    }, []);

    // Array de UFs que possuem pelo menos um representante (para acender no mapa)
    const activeStates = Array.from(new Set(representatives.flatMap(getRepresentativeStates)));

    // Representantes filtrados pelo estado selecionado
    const filteredReps = selectedState 
        ? representatives.filter(r => getRepresentativeStates(r).includes(selectedState))
        : [];
    const territoryGroups = selectedState ? buildTerritoryGroups(filteredReps, selectedState) : [];

    const handleSuccessReveal = () => {
        setIsContactRevealed(true);
        setDialogRepName(null);
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
                                    Selecione um estado no mapa do Brasil ao lado para visualizar representantes autorizados e macro-regiões comerciais daquela região.
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

                                <div className="space-y-6">
                                    {territoryGroups.map((group) => (
                                        <div key={group.key} className="space-y-3">
                                            <div className="flex items-center justify-between gap-3 border-b border-industrial-200 pb-2">
                                                <h4 className="text-sm font-black uppercase tracking-[0.16em] text-industrial-500">
                                                    {group.label}
                                                </h4>
                                                <span className="text-xs font-bold uppercase tracking-wider text-industrial-400">
                                                    {group.rows.length} {group.rows.length === 1 ? 'contato' : 'contatos'}
                                                </span>
                                            </div>

                                            <div className="space-y-4">
                                                {group.rows.map(({ rep, territory }) => (
                                                    <div key={`${rep.id}-${territory.key ?? territory.macroRegion}`} className="bg-white p-6 md:p-8 border border-industrial-200 hover:border-accent-premium transition-colors group relative overflow-hidden shadow-sm hover:shadow-md">
                                                        <div className="absolute top-0 left-0 h-full w-1.5 bg-industrial-200 group-hover:bg-accent-premium transition-colors" />

                                                        <div className="pl-4">
                                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                                <div>
                                                                    <h5 className="text-2xl font-bold text-industrial-950 uppercase leading-none mb-1">{rep.name}</h5>
                                                                    {rep.company && (
                                                                        <div className="text-sm font-medium text-industrial-500 uppercase tracking-wide">
                                                                            {rep.company}
                                                                        </div>
                                                                    )}

                                                                    <div className="mt-3 space-y-1.5">
                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase bg-industrial-100 text-industrial-600 border border-industrial-200 tracking-wider">
                                                                            {territory.uf} - {territory.macroRegion}
                                                                        </span>
                                                                        {territory.cities.length > 0 && (
                                                                            <p className="max-w-xl text-sm text-industrial-500">
                                                                                Polos: {territory.cities.slice(0, 6).join(', ')}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {rep.markets && rep.markets.length > 0 && (
                                                                        <div className="mt-4 flex max-w-xs flex-wrap gap-1.5 md:max-w-md">
                                                                            {rep.markets.slice(0, MAX_VISIBLE_MARKETS).map((marketValue) => {
                                                                                const label = MARKET_LABELS[marketValue] || marketValue;
                                                                                return (
                                                                                    <span
                                                                                        key={marketValue}
                                                                                        className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase bg-accent-premium/15 text-accent-dark border border-accent-premium/25 tracking-wider"
                                                                                    >
                                                                                        {label}
                                                                                    </span>
                                                                                );
                                                                            })}
                                                                            {rep.markets.length > MAX_VISIBLE_MARKETS && (
                                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase bg-industrial-100 text-industrial-500 border border-industrial-200 tracking-wider">
                                                                                    +{rep.markets.length - MAX_VISIBLE_MARKETS}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="flex flex-col gap-3 shrink-0 bg-industrial-50 p-4 border border-industrial-100 min-w-[240px]">
                                                                    {!isContactRevealed ? (
                                                                        <button
                                                                            onClick={() => setDialogRepName(rep.name)}
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
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <LeadCaptureDialog 
                isOpen={!!dialogRepName} 
                onClose={() => setDialogRepName(null)} 
                onSuccess={handleSuccessReveal}
                representativeState={selectedState || "Brasil"}
                representativeName={dialogRepName || "Múltiplos (Estado Completo)"}
            />
        </section>
    )
}
