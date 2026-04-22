"use client"

import Image from "next/image"
import type { ClientLogo } from "@/lib/data"

export function ClientsMarquee({ clients = [] }: { clients?: ClientLogo[] }) {
    // Se não vier nada do CMS, não mostramos a seção para não ficar vazia
    if (!clients || clients.length === 0) return null;

    // Duplicamos a lista para garantir o efeito de loop infinito
    const allClients = [...clients, ...clients]

    return (
        <section className="py-16 bg-industrial-950 overflow-hidden border-y border-industrial-900">
            <div className="container mx-auto px-4 mb-8 text-center md:text-left">
                <h2 className="text-accent-premium font-black uppercase tracking-[0.3em] text-[10px]">
                    Grandes empresas confiam na B&B
                </h2>
            </div>

            <div className="relative flex">
                {/* Container da animação marquee */}
                <div className="flex animate-marquee whitespace-nowrap items-center hover:pause gap-16 md:gap-24 px-8">
                    {allClients.map((client, index) => (
                        <div
                            key={index}
                            className="relative flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500 w-32 md:w-48 h-16 md:h-24 shrink-0"
                            title={client.name}
                        >
                            {client.logoUrl ? (
                                <Image
                                    src={client.logoUrl}
                                    alt={`Logo ${client.name}`}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <span className="text-xl md:text-3xl font-black text-industrial-800 uppercase tracking-tighter">
                                    {client.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Gradientes laterais para esconder o corte */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-industrial-950 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-industrial-950 to-transparent z-10" />
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .hover\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    )
}
