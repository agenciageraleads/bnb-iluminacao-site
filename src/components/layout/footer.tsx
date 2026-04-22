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
                            <img src="/logo.png" alt="B&B Iluminação" className="h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
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

                    {/* Coluna 3: Serviços */}
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-premium">Serviços Técnicos</h3>
                        <ul className="space-y-3">
                            <li><Link href="/servicos/corte-laser" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Corte a Laser</Link></li>
                            <li><Link href="/servicos/pintura-eletrostatica" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Pintura Eletrostática</Link></li>
                            <li><Link href="/servicos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Todos os Serviços</Link></li>
                        </ul>
                    </div>

                    {/* Coluna 4: Empresa */}
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-premium">B&B Iluminação</h3>
                        <ul className="space-y-3">
                            <li><Link href="/quem-somos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">A Empresa</Link></li>
                            <li><Link href="/#portfolio" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Nosso Portfólio</Link></li>
                            <li><Link href="/downloads" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Catálogos</Link></li>
                            <li><Link href="/contato" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Fale Conosco</Link></li>
                            <li><Link href="/blog" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Blog</Link></li>
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
                                <a href="mailto:contato@bebiluminacao.com" className="text-sm text-industrial-400 hover:text-white transition-colors font-bold break-all">contato@bebiluminacao.com</a>
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
