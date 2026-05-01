'use client'

import { useState, useActionState } from 'react'
import Image from 'next/image'
import { Catalog } from '../../../lib/data'
import { createCatalogLead } from '../../actions/leads'
import { Download, FileText, X, CheckCircle2, Loader2, Building2, User, Mail, Phone, Hash } from 'lucide-react'

interface DownloadGridProps {
    catalogs: Catalog[]
}

export function DownloadGrid({ catalogs }: DownloadGridProps) {
    const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [state, action] = useActionState(createCatalogLead, { status: 'idle' } as any)

    const handleDownloadClick = (catalog: Catalog) => {
        // Se já tivemos sucesso, podemos liberar o download direto futuramente se quisermos
        // Mas por regra de negócio, pedimos os dados
        setSelectedCatalog(catalog)
    }

    const isSuccess = state.status === 'success'

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {catalogs.map((catalog) => (
                    <div key={catalog.id} className="group bg-white border border-industrial-200 overflow-hidden hover:border-accent-premium transition-all duration-300 shadow-sm hover:shadow-xl">
                        <div className="relative aspect-[3/4] bg-industrial-100 overflow-hidden">
                            {catalog.thumbnail ? (
                                <Image 
                                    src={catalog.thumbnail} 
                                    alt={catalog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-industrial-300 font-bold uppercase tracking-widest text-xs">Sem Capa</div>
                            )}
                            <div className="absolute inset-0 bg-industrial-950/20 group-hover:bg-industrial-950/0 transition-colors" />
                            <div className="absolute top-4 left-4 bg-accent-premium text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                {catalog.category}
                            </div>
                        </div>
                        
                        <div className="p-6">
                            <h3 className="font-black text-industrial-950 uppercase text-lg leading-tight mb-2">{catalog.title}</h3>
                            <p className="text-industrial-500 text-sm line-clamp-2 h-10 mb-6">{catalog.description || 'Especificações técnicas completas para seu projeto de iluminação.'}</p>
                            
                            <button
                                onClick={() => handleDownloadClick(catalog)}
                                className="w-full flex items-center justify-center gap-2 bg-industrial-950 text-white font-black uppercase text-xs tracking-widest py-4 hover:bg-industrial-800 transition-colors"
                            >
                                <Download className="size-4" />
                                Baixar Catálogo
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Captação de Leads */}
            {selectedCatalog && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-industrial-950/80 backdrop-blur-sm"
                        onClick={() => setSelectedCatalog(null)}
                    />
                    
                    <div className="relative w-full max-w-lg bg-white border border-industrial-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <button 
                            onClick={() => setSelectedCatalog(null)}
                            className="absolute top-4 right-4 text-industrial-400 hover:text-industrial-950 transition-colors"
                        >
                            <X className="size-6" />
                        </button>

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="size-10 bg-accent-premium flex items-center justify-center">
                                    <FileText className="size-5 text-black" />
                                </div>
                                <div>
                                    <h3 className="font-black text-industrial-950 uppercase tracking-tight">Liberar Acesso Técnico</h3>
                                    <p className="text-industrial-500 text-xs font-bold uppercase tracking-wider">{selectedCatalog.title}</p>
                                </div>
                            </div>

                            {!isSuccess ? (
                                <form action={action} className="space-y-4">
                                    <input type="hidden" name="catalogId" value={selectedCatalog.id} />
                                    
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 ml-1">Nome Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-industrial-400" />
                                            <input 
                                                required 
                                                name="name"
                                                type="text" 
                                                placeholder="Seu nome"
                                                className="w-full h-12 bg-industrial-50 border border-industrial-200 pl-11 pr-4 focus:outline-none focus:border-accent-premium font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 ml-1">E-mail Corporativo</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-industrial-400" />
                                                <input 
                                                    required 
                                                    name="email"
                                                    type="email" 
                                                    placeholder="empresa@exemplo.com"
                                                    className="w-full h-12 bg-industrial-50 border border-industrial-200 pl-11 pr-4 focus:outline-none focus:border-accent-premium font-medium text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 ml-1">WhatsApp/Telefone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-industrial-400" />
                                                <input 
                                                    required 
                                                    name="phone"
                                                    type="tel" 
                                                    placeholder="(00) 00000-0000"
                                                    className="w-full h-12 bg-industrial-50 border border-industrial-200 pl-11 pr-4 focus:outline-none focus:border-accent-premium font-medium text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 ml-1">Nome da Empresa</label>
                                            <div className="relative">
                                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-industrial-400" />
                                                <input 
                                                    required 
                                                    name="company"
                                                    type="text" 
                                                    placeholder="Razão Social ou Fantasia"
                                                    className="w-full h-12 bg-industrial-50 border border-industrial-200 pl-11 pr-4 focus:outline-none focus:border-accent-premium font-medium text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-industrial-500 ml-1">CNPJ</label>
                                            <div className="relative">
                                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-industrial-400" />
                                                <input 
                                                    required 
                                                    name="companyCnpj"
                                                    type="text" 
                                                    placeholder="00.000.000/0000-00"
                                                    className="w-full h-12 bg-industrial-50 border border-industrial-200 pl-11 pr-4 focus:outline-none focus:border-accent-premium font-medium text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {state.status === 'error' && (
                                        <p className="text-red-500 text-xs font-bold text-center">{state.message}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 bg-industrial-950 text-white font-black uppercase tracking-widest hover:bg-industrial-800 transition-all flex items-center justify-center gap-3 mt-4"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="size-5 animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircle2 className="size-5 text-accent-premium" />
                                                Ver Catálogo Agora
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-industrial-400 text-center uppercase tracking-widest leading-relaxed">
                                        Ao prosseguir, você concorda com nossos termos de privacidade industrial.
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center py-10 space-y-6 animate-in slide-in-from-bottom-5 duration-700">
                                    <div className="size-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="size-10" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-industrial-950 uppercase">Acesso Liberado!</h3>
                                        <p className="text-industrial-500 font-medium">O download do arquivo PDF começará em instantes.</p>
                                    </div>
                                    
                                    <a 
                                        href={selectedCatalog.fileUrl} 
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-14 px-10 bg-industrial-950 text-white font-black uppercase tracking-widest hover:bg-industrial-800 transition-all items-center gap-3"
                                        onClick={() => {
                                            // Fecha o modal após o clique no download final
                                            setTimeout(() => setSelectedCatalog(null), 2000)
                                        }}
                                    >
                                        <Download className="size-5 text-accent-premium" />
                                        Baixar Agora
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
