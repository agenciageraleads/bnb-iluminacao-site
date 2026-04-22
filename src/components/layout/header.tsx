"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"

const navigation = [
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Produtos", href: "/produtos" },
    { name: "Blog", href: "/blog" },
    { name: "Serviços", href: "/produtos/servicos" },
    { name: "Representantes", href: "/representantes" },
    { name: "Contato", href: "/contato" },
]

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)

    /* Bloqueia o scroll do body quando o menu mobile está aberto */
    React.useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [isOpen])

    return (
        <>
            <header className="fixed top-0 z-50 w-full bg-white border-b border-industrial-200 shadow-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex h-16 md:h-20 items-center justify-between">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group" aria-label="B&B Iluminação - Página Inicial">
                            <img src="/logo.png" alt="B&B Iluminação" className="h-10 md:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-[12px] font-bold uppercase tracking-widest text-industrial-600 transition-colors hover:text-industrial-900 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-premium hover:after:w-full after:transition-all after:duration-300"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <a
                                href="https://wa.me/556235761988"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-industrial-900 text-white hover:bg-accent-premium hover:text-black font-black tracking-widest uppercase text-[11px] px-5 h-10 transition-all"
                                aria-label="Fale conosco pelo WhatsApp"
                            >
                                <Phone className="size-4" aria-hidden="true" />
                                Fale Conosco
                            </a>
                        </nav>

                        {/* Botão hambúrguer com touch target ≥ 44px (p-3 + ícone 24px = 48px) */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex md:hidden items-center justify-center p-3 -mr-2 text-industrial-700 hover:text-industrial-900 active:bg-industrial-100 transition-colors"
                            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                        >
                            {isOpen
                                ? <X className="size-6" aria-hidden="true" />
                                : <Menu className="size-6" aria-hidden="true" />
                            }
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Mobile — animado via opacity + transform (GPU-friendly) */}
            <div
                id="mobile-menu"
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                aria-hidden={!isOpen}
            >
                {/* Overlay escurecido por baixo */}
                <div
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />

                {/* Drawer lateral da direita */}
                <nav
                    className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white flex flex-col pt-20 pb-safe shadow-2xl transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    aria-label="Menu de navegação mobile"
                >
                    <div className="flex-1 overflow-y-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                /* min-height 52px garante touch target ≥ 44px */
                                className="flex items-center justify-between px-6 min-h-[52px] text-sm font-bold uppercase tracking-widest text-industrial-700 hover:text-industrial-900 hover:bg-industrial-50 border-b border-industrial-100 transition-colors active:bg-industrial-100"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                                <span className="text-accent-dark text-lg" aria-hidden="true">›</span>
                            </Link>
                        ))}
                    </div>

                    {/* CTA WhatsApp no fundo do menu — thumb zone */}
                    <div className="p-5 border-t border-industrial-100 pb-safe">
                        <a
                            href="https://wa.me/556235761988"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full h-14 bg-industrial-900 text-white font-black uppercase tracking-widest text-sm active:bg-industrial-700 transition-colors"
                            onClick={() => setIsOpen(false)}
                            aria-label="Solicitar orçamento pelo WhatsApp"
                        >
                            <Phone className="size-5" aria-hidden="true" />
                            SOLICITAR ORÇAMENTO
                        </a>
                    </div>
                </nav>
            </div>
        </>
    )
}
