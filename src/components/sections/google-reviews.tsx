import { Star, Quote } from "lucide-react"

const REVIEWS = [
    {
        name: "Eng. Marcos Vinícius",
        role: "Gestor de Obras",
        content: "Excelente atendimento. Postes de alta qualidade e entrega super rápida. Recomendo fortemente para grandes obras e licitações.",
        rating: 5,
        date: "há 2 meses"
    },
    {
        name: "Roberto Dias",
        role: "Engenheiro Civil",
        content: "Material com acabamento impecável. A galvanização a fogo é de primeira linha. Com certeza é o melhor fornecedor da região.",
        rating: 5,
        date: "há 1 mês"
    },
    {
        name: "Construtora Rocha & Filhos",
        role: "Cliente Corporativo",
        content: "Equipe técnica muito atenciosa e material rigorosamente dentro das normas ABNT. O melhor custo-benefício que encontramos.",
        rating: 5,
        date: "há 3 meses"
    },
    {
        name: "Ana Paula Santos",
        role: "Arquiteta Urbanista",
        content: "Atendimento nota 10. Tiraram todas as dúvidas técnicas e entregaram os mastros perfeitamente no prazo combinado. Muito confiáveis.",
        rating: 5,
        date: "há 2 semanas"
    }
]

export function GoogleReviews() {
    return (
        <section className="py-20 bg-industrial-50 border-y border-industrial-100 overflow-hidden" aria-labelledby="reviews-heading">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <div className="text-center md:text-left">
                        <span className="text-accent-dark font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Prova Social</span>
                        <h2 id="reviews-heading" className="text-3xl md:text-5xl font-black text-industrial-950 uppercase tracking-tight">
                            O que dizem nossos <br />
                            <span className="text-accent-premium">clientes no google</span>
                        </h2>
                    </div>

                    {/* Google Badge */}
                    <div className="bg-white p-6 border border-industrial-200 shadow-xl flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="size-6" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="font-black text-industrial-950 uppercase tracking-widest text-xs">Google Business</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-black text-industrial-950">4.9</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="size-4 fill-accent-premium text-accent-premium" />
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-industrial-400 uppercase tracking-widest">Baseado em +50 avaliações</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {REVIEWS.map((review, i) => (
                        <div 
                            key={i} 
                            className="bg-white p-8 border border-industrial-200 relative group hover:border-accent-premium transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl"
                        >
                            <Quote className="absolute top-4 right-4 size-8 text-industrial-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="size-3 fill-accent-premium text-accent-premium" />
                                ))}
                            </div>

                            <p className="text-industrial-700 text-sm leading-relaxed mb-6 italic">
                                "{review.content}"
                            </p>

                            <div className="mt-auto">
                                <h4 className="font-black text-industrial-950 uppercase text-xs tracking-wider">{review.name}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-industrial-400 text-[10px] font-bold uppercase">{review.role}</span>
                                    <span className="text-industrial-300 text-[9px] font-medium">{review.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a 
                        href="https://www.google.com/maps?cid=YOUR_CID_HERE" // Idealmente substituir pelo link real do Maps
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-industrial-950 hover:text-accent-dark font-black uppercase tracking-[0.2em] text-[11px] transition-colors group"
                    >
                        Ver todas as avaliações no Google
                        <div className="size-6 bg-industrial-950 text-white rounded-full flex items-center justify-center group-hover:bg-accent-premium group-hover:text-black transition-colors">
                            <Star className="size-3 fill-current" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
