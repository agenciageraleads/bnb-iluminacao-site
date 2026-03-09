"use client";

import { clients } from "@/lib/data"

export function ClientsMarquee() {
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
                <div className="flex animate-marquee whitespace-nowrap items-center hover:pause">
                    {allClients.map((client, index) => (
                        <div
                            key={index}
                            className="px-12 md:px-20 text-3xl md:text-5xl font-black text-industrial-800 uppercase tracking-tighter hover:text-accent-premium transition-colors cursor-default"
                        >
                            {client.name}
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
