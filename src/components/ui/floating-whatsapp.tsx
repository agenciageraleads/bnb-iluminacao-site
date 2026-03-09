import { MessageCircle } from "lucide-react"

interface FloatingWhatsAppProps {
    phoneNumber?: string
    message?: string
}

export function FloatingWhatsApp({
    phoneNumber = "556232887711",
    message = "Olá! Gostaria de solicitar um orçamento de postes metálicos.",
}: FloatingWhatsAppProps) {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
            {/* Tooltip/Label Desktop */}
            <div className="hidden md:flex bg-white text-industrial-950 px-4 py-2 rounded-lg shadow-xl border border-industrial-100 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 pointer-events-none items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">
                    Precisa de ajuda? <span className="text-accent-premium">Fale conosco</span>
                </span>
            </div>

            {/* Botão Principal */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                    flex items-center gap-3
                    bg-[#25D366] text-white
                    font-black uppercase tracking-widest text-[11px]
                    h-14 md:h-16 px-5 md:px-6
                    rounded-full md:rounded-xl
                    shadow-2xl shadow-green-600/20
                    hover:scale-105 active:scale-95 transition-all duration-200
                    touch-action:manipulation
                "
                style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
                aria-label="Fale conosco pelo WhatsApp"
            >
                <MessageCircle className="size-6 shrink-0 fill-white" aria-hidden="true" />
                <span className="hidden xs:block md:hidden">WhatsApp</span>
                <span className="hidden md:block">SOLICITAR ORÇAMENTO</span>
            </a>
        </div>
    )
}
