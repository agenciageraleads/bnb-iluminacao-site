import Link from "next/link"
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-industrial-950 text-white pt-20 pb-10 border-t border-industrial-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

                    {/* Coluna 1: Logo e Redes */}
                    <div className="space-y-8 text-center md:text-left">
                        <Link href="/" className="inline-block">
                            <svg viewBox="0 0 400 150" className="h-16 w-auto fill-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                                <path d="M160,105 l20,-30 h-15 c-10,0 -15,-5 -15,-15 c0,-15 15,-15 25,-15 h30 l-25,-25 h-35 c-25,0 -45,15 -45,45 c0,20 15,35 30,40 z" />
                                <path d="M220,105 l40,-40 h-20 c-15,0 -20,-5 -20,-15 c0,-10 10,-15 20,-15 h35 l15,-15 h-80 c-25,0 -40,20 -40,40 c0,25 20,35 40,45 z" />
                                <path d="M250,20 h80 c25,0 45,15 45,40 c0,15 -10,25 -20,30 c15,5 25,18 25,35 c0,25 -20,45 -50,45 h-80 v-150 z m35,30 v30 h40 c10,0 20,-5 20,-15 c0,-10 -10,-15 -20,-15 h-40 z m0,60 v30 h45 c15,0 25,-8 25,-15 c0,-10 -10,-15 -25,-15 h-45 z" />
                                <rect x="5" y="180" width="370" height="8" />
                                <text x="50" y="215" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="10" fill="#fff">ILUMINAÇÃO</text>
                            </svg>
                        </Link>
                        <p className="text-industrial-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
                            Soluções inteligentes em iluminação e estruturas metálicas desde 1992. Qualidade e durabilidade certificada.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <a href="https://instagram.com/bebiluminacao" target="_blank" className="p-3 bg-industrial-900 hover:bg-accent-premium hover:text-industrial-950 transition-all">
                                <Instagram className="size-5" />
                            </a>
                            <a href="https://facebook.com/bebiluminacao" target="_blank" className="p-3 bg-industrial-900 hover:bg-accent-premium hover:text-industrial-950 transition-all">
                                <Facebook className="size-5" />
                            </a>
                            <a href="https://linkedin.com/company/bebiluminacao" target="_blank" className="p-3 bg-industrial-900 hover:bg-accent-premium hover:text-industrial-950 transition-all">
                                <Linkedin className="size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Coluna 2: Produtos */}
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-premium">Nossos Produtos</h3>
                        <ul className="space-y-3">
                            <li><Link href="/produtos/poste-metalico" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Postes Metálicos</Link></li>
                            <li><Link href="/produtos/mastros-para-bandeiras" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Mastros</Link></li>
                            <li><Link href="/produtos/bracos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Braços e Suportes</Link></li>
                            <li><Link href="/produtos/linha-garden" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Garden</Link></li>
                            <li><Link href="/produtos/linha-sport" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Sport</Link></li>
                            <li><Link href="/produtos/linha-agro" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Agro</Link></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Empresa */}
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-premium">B&B Iluminação</h3>
                        <ul className="space-y-3">
                            <li><Link href="/quem-somos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">A Empresa</Link></li>
                            <li><Link href="/#portfolio" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Nosso Portfólio</Link></li>
                            <li><Link href="/downloads" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Catálogos</Link></li>
                            <li><Link href="/contato" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Fale Conosco</Link></li>
                            <li><Link href="/blog" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Blog</Link></li>
                            <li><Link href="/privacidade" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Privacidade</Link></li>
                        </ul>
                    </div>

                    {/* Coluna 4: Contato */}
                    <div className="space-y-8 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-premium">Atendimento</h3>
                        <div className="space-y-6">
                            <div className="flex items-start justify-center md:justify-start gap-4 group">
                                <MapPin className="size-5 text-accent-premium shrink-0" />
                                <p className="text-sm text-industrial-400 leading-tight font-medium">
                                    Rua CV 10, 324 - <br /> Goiânia - GO - 74463-310
                                </p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 group">
                                <Phone className="size-5 text-accent-premium shrink-0" />
                                <a href="tel:+556235761988" className="text-sm text-industrial-400 hover:text-white transition-colors font-bold">(62) 3576-1988</a>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 group">
                                <Mail className="size-5 text-accent-premium shrink-0" />
                                <a href="mailto:contato@bebiluminacao.com.br" className="text-sm text-industrial-400 hover:text-white transition-colors font-bold break-all">contato@bebiluminacao.com.br</a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-industrial-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] sm:text-[11px] font-bold text-industrial-600 uppercase tracking-widest">
                    <p>© {currentYear} B&B ILUMINAÇÃO. TODOS OS DIREITOS RESERVADOS.</p>
                    <div className="flex items-center gap-6">
                        <span>CNPJ: 00.000.000/0001-00</span>
                        <span className="hidden sm:inline">GOIÂNIA / GO</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
