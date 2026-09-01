import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from "lucide-react"
import { TrackedContactLink } from "@/lib/lead-tracking"
import { PreferredSourceButton } from "@/components/seo/preferred-source-button"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-industrial-950 text-white pt-20 pb-10 border-t border-industrial-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

                    {/* Coluna 1: Logo e Redes */}
                    <div className="space-y-8 text-center md:text-left">
                        <Link href="/" className="inline-block">
                            <Image src="/logo.svg" alt="B&B Iluminação" width={200} height={64} className="h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-industrial-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
                            Soluções metálicas para urbanismo. Na medida. No prazo. Na norma.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <a href="https://instagram.com/bebiluminacao" target="_blank" className="p-3 bg-industrial-900 hover:bg-accent-premium hover:text-industrial-950 transition-all rounded-lg">
                                <Instagram className="size-5" />
                            </a>
                            <a href="https://facebook.com/bebiluminacao" target="_blank" className="p-3 bg-industrial-900 hover:bg-accent-premium hover:text-industrial-950 transition-all rounded-lg">
                                <Facebook className="size-5" />
                            </a>
                            <a href="https://linkedin.com/company/bebiluminacao" target="_blank" className="p-3 bg-industrial-900 hover:bg-accent-premium hover:text-industrial-950 transition-all rounded-lg">
                                <Linkedin className="size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Coluna 2: Produtos */}
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent-premium">Nossos Produtos</h3>
                        <ul className="space-y-3">
                            <li><Link href="/postes-metalicos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Postes Metálicos</Link></li>
                            <li><Link href="/postes-para-iluminacao-publica" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Iluminação Pública</Link></li>
                            <li><Link href="/fabricante-de-postes-teleconicos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Fabricante Telecônico</Link></li>
                            <li><Link href="/produtos/poste-teleconico" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Poste Telecônico</Link></li>
                            <li><Link href="/produtos/poste-curvo-simples" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Poste Curvo Simples</Link></li>
                            <li><Link href="/produtos/poste-curvo-duplo" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Poste Curvo Duplo</Link></li>
                            <li><Link href="/produtos/poste-metalico-galvanizado" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Poste Galvanizado</Link></li>
                            <li><Link href="/produtos/braco-para-luminaria-publica" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Braços e Suportes</Link></li>
                            <li><Link href="/produtos/suporte-para-luminaria-publica" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Suporte para Luminária</Link></li>
                            <li><Link href="/produtos/chumbador-para-poste-metalico" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Chumbador para Poste</Link></li>
                            <li><Link href="/postes-para-pracas" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Postes para Praças</Link></li>
                            <li><Link href="/postes-para-estacionamentos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Postes para Estacionamentos</Link></li>
                            <li><Link href="/lp/mastros-para-bandeira" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Mastros para Bandeira</Link></li>
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
                            <li><Link href="/fabrica-de-postes-metalicos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Fábrica de Postes</Link></li>
                            <li><Link href="/fabricante-de-postes-metalicos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Fabricante</Link></li>
                            <li><Link href="/fornecedor-de-postes-metalicos" className="text-industrial-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">Fornecedor</Link></li>
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
                                    Rua CV10, Qd 26 Lt 02 <br /> Residencial Centerville - Goiania, GO
                                </p>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 group">
                                <Phone className="size-5 text-accent-premium shrink-0" />
                                <TrackedContactLink href="tel:+556235761988" channel="phone" eventSource="footer" eventLabel="Telefone footer" className="text-sm text-industrial-400 hover:text-white transition-colors font-bold">(62) 3576-1988</TrackedContactLink>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 group">
                                <Mail className="size-5 text-accent-premium shrink-0" />
                                <TrackedContactLink href="mailto:contato@bebiluminacao.com" channel="email" eventSource="footer" eventLabel="Email footer" className="text-sm text-industrial-400 hover:text-white transition-colors font-bold break-all">contato@bebiluminacao.com</TrackedContactLink>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Fonte preferida no Google */}
                <div className="pb-10 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <p className="text-industrial-400 text-sm font-medium max-w-md">
                        Acompanha nosso conteúdo técnico? Marque a B&amp;B como fonte preferida no Google.
                    </p>
                    <PreferredSourceButton theme="dark" className="shrink-0" />
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-industrial-900 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] sm:text-[11px] font-bold text-industrial-600 uppercase tracking-widest">
                    <p>© {currentYear} B&B ILUMINAÇÃO. TODOS OS DIREITOS RESERVADOS.</p>
                    <div className="flex items-center gap-6">
                        <span>CNPJ: 14.401.288/0002-00</span>
                        <span className="hidden sm:inline">GOIANIA / GO</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
