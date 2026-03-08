"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"

const navigation = [
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Produtos", href: "/produtos" },
    { name: "Sinalização Viária", href: "/produtos/sinalizacao-viaria" },
    { name: "Serviços", href: "/produtos/servicos" },
    { name: "Contato", href: "/contato" },
]

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <header className="fixed top-0 z-50 w-full border-b border-industrial-800 bg-industrial-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            {/* Logo B&B recriada baseada no Catálogo (Preto e Amarelo com estrela) */}
                            <svg viewBox="0 0 400 150" className="h-10 w-auto md:h-12 fill-white group-hover:fill-accent-premium transition-colors" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                                <path d="M160,105 l20,-30 h-15 c-10,0 -15,-5 -15,-15 c0,-15 15,-15 25,-15 h30 l-25,-25 h-35 c-25,0 -45,15 -45,45 c0,20 15,35 30,40 z" />
                                <path d="M220,105 l40,-40 h-20 c-15,0 -20,-5 -20,-15 c0,-10 10,-15 20,-15 h35 l15,-15 h-80 c-25,0 -40,20 -40,40 c0,25 20,35 40,45 z" />
                                <path d="M250,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                                <rect x="5" y="180" width="370" height="8" />
                                <text x="50" y="215" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="10" fill="white">ILUMINAÇÃO</text>
                            </svg>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[13px] font-bold uppercase tracking-widest text-industrial-300 transition-colors hover:text-accent-premium"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button className="bg-accent-premium text-black hover:bg-accent-premium/90 font-bold tracking-widest uppercase rounded-none px-6 h-10">
                            Fale Conosco
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-industrial-300 hover:text-white"
                        >
                            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-industrial-900 border-t border-industrial-800 px-4 py-6 space-y-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block text-base font-bold uppercase tracking-widest text-industrial-300 hover:text-accent-premium"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button className="w-full bg-accent-premium text-black hover:bg-accent-premium/90 font-bold uppercase tracking-widest rounded-none h-12">
                        Fale Conosco
                    </Button>
                </div>
            )}
        </header>
    )
}
