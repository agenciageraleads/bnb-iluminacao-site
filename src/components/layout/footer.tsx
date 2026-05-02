import Link from "next/link"
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-industrial-950 text-white pt-20 pb-10 border-t border-industrial-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

                    {/* Coluna 1: Logo e Redes */}
                    <div className="space-y-8 text-center md:text-left">
                        <Link href="/" className="inline-block">
                            <img src="/logo.png" alt="B&B Iluminação" className="h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-industrial-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
                            Especialista em soluções de iluminação pública e industrial desde 2011. Qualidade, durabilidade e engenharia de precisão.
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
                            <li><Link href="/produtos/linha-urban" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Urban (Telecônicos)</Link></li>
                            <li><Link href="/produtos/linha-versa" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Versa (Decorativos)</Link></li>
                            <li><Link href="/produtos/linha-forza" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Forza (Especiais)</Link></li>
                            <li><Link href="/produtos/linha-civis" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Civis (Mastros)</Link></li>
                            <li><Link href="/produtos/linha-vigia" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Vigia (Monitoramento)</Link></li>
                            <li><Link href="/produtos/linha-nexo" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Nexo (Acessórios)</Link></li>
                            <li><Link href="/produtos/linha-orna" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Linha Orna (Ornamentais)</Link></li>
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
                            <li><Link href="/obras" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Nosso Portfólio</Link></li>
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
                                    Rua CV 10, 324, Qd 10 Lt 17 <br /> Res. Center Ville - Goiânia - GO
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
                        <span>CNPJ: 14.401.288/0001-10</span>
                        <span className="hidden sm:inline">GOIÂNIA / GO</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
