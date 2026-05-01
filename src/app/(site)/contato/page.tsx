"use client";

import { Header } from "../../../components/layout/header"
import { FloatingWhatsApp } from "../../../components/ui/floating-whatsapp"
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { useState } from "react"
import { sendContactEmail } from "../../actions/contact"

export default function ContatoPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const infos = [
        {
            icon: <Phone className="size-5" aria-hidden="true" />,
            label: "Telefone / WhatsApp",
            value: "(62) 3576-1988",
            href: "tel:+556235761988",
        },
        {
            icon: <Mail className="size-5" aria-hidden="true" />,
            label: "E-mail Comercial",
            value: "contato@bebiluminacao.com",
            href: "mailto:contato@bebiluminacao.com",
        },
        {
            icon: <MapPin className="size-5" aria-hidden="true" />,
            label: "Endereço",
            value: "Goiânia, GO — Brasil",
            href: "https://maps.google.com/?q=Goiânia,GO",
        },
        {
            icon: <Clock className="size-5" aria-hidden="true" />,
            label: "Horário de Atendimento",
            value: "Seg–Sex, 8h às 18h",
            href: null,
        },
    ]

    async function handleSubmit(formData: FormData) {
        setStatus('loading');
        const result = await sendContactEmail(formData);
        
        if (result.success) {
            setStatus('success');
            setMessage(result.message || '');
            // Limpa o formulário após 2 segundos
            setTimeout(() => setStatus('idle'), 5000);
        } else {
            setStatus('error');
            setMessage(result.error || 'Ocorreu um erro inesperado.');
        }
    }

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <FloatingWhatsApp />

            {/* Hero da página */}
            <section className="pt-24 md:pt-28 pb-10 bg-white border-b border-industrial-200">
                <div className="container mx-auto px-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-industrial-500 mb-3">Fale Conosco</p>
                    <h1 className="text-3xl md:text-5xl font-black text-industrial-950 uppercase leading-none mb-3">
                        CONTATO<span className="text-accent-dark">.</span>
                    </h1>
                    <p className="text-industrial-500 text-base leading-relaxed">
                        Nossa equipe técnica está pronta para ajudar no seu projeto.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-10 md:py-14">
                <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

                    {/* Formulário de contato */}
                    <div>
                        <h2 className="text-lg font-black text-industrial-950 uppercase tracking-tight mb-6">Envie sua Mensagem</h2>
                        
                        {status === 'success' ? (
                            <div className="bg-green-50 border border-green-200 p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 className="size-12 text-green-600 mx-auto" />
                                <h3 className="text-xl font-black text-green-900 uppercase">Mensagem Enviada!</h3>
                                <p className="text-green-700 text-sm">Recebemos seu contato. Nossa equipe retornará em breve no e-mail informado.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="text-green-800 font-bold uppercase text-[11px] tracking-widest hover:underline"
                                >
                                    Enviar outra mensagem
                                </button>
                            </div>
                        ) : (
                            <form
                                action={handleSubmit}
                                className="space-y-4"
                                noValidate
                                aria-label="Formulário de contato"
                            >
                                {status === 'error' && (
                                    <div className="bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-red-700 text-sm font-medium">
                                        <AlertCircle className="size-5 shrink-0" />
                                        {message}
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label htmlFor="nome" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
                                        Nome Completo <span className="text-red-600" aria-label="campo obrigatório">*</span>
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        name="nome"
                                        required
                                        autoComplete="name"
                                        className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-14 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
                                        placeholder="Ex: João da Silva"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
                                            E-mail <span className="text-red-600" aria-label="campo obrigatório">*</span>
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoComplete="email"
                                            spellCheck={false}
                                            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-14 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
                                            placeholder="seu@email.com"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="telefone" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
                                            Telefone / WhatsApp
                                        </label>
                                        <input
                                            id="telefone"
                                            type="tel"
                                            name="telefone"
                                            autoComplete="tel"
                                            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-14 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
                                            placeholder="(62) 90000-0000"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="assunto" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
                                        Assunto <span className="text-red-600" aria-label="campo obrigatório">*</span>
                                    </label>
                                    <select
                                        id="assunto"
                                        name="assunto"
                                        required
                                        className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-14 text-sm text-industrial-900 outline-none transition-colors appearance-none"
                                    >
                                        <option value="">Selecione um assunto…</option>
                                        <option value="orcamento">Solicitação de Orçamento</option>
                                        <option value="catalogo">Catálogos e Especificações</option>
                                        <option value="suporte">Suporte Técnico</option>
                                        <option value="parceria">Parceria Comercial</option>
                                        <option value="outro">Outro</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="mensagem" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
                                        Mensagem <span className="text-red-600" aria-label="campo obrigatório">*</span>
                                    </label>
                                    <textarea
                                        id="mensagem"
                                        name="mensagem"
                                        required
                                        rows={5}
                                        className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 py-4 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors resize-vertical min-h-[140px]"
                                        placeholder="Descreva seu projeto, quantidade estimada, prazo…"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="flex items-center justify-center gap-2 w-full h-14 bg-industrial-950 text-white hover:bg-industrial-800 disabled:bg-industrial-400 active:bg-industrial-700 font-black uppercase tracking-widest text-sm transition-colors"
                                    aria-label={status === 'loading' ? "Enviando..." : "Enviar mensagem"}
                                >
                                    {status === 'loading' ? (
                                        <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Send className="size-5" aria-hidden="true" />
                                    )}
                                    {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR MENSAGEM'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Informações de contato */}
                    <div className="space-y-8">
                        <h2 className="text-lg font-black text-industrial-950 uppercase tracking-tight">Informações de Contato</h2>
                        <div className="space-y-4">
                            {infos.map((info, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-industrial-50 border border-industrial-200">
                                    <div className="size-10 bg-industrial-950 flex items-center justify-center text-white shrink-0">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-industrial-500 mb-0.5">{info.label}</div>
                                        {info.href ? (
                                            <a href={info.href} className="text-industrial-900 font-bold text-sm hover:underline active:opacity-80 transition-opacity">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-industrial-900 font-bold text-sm">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Atalho para WhatsApp */}
                        <a
                            href="https://wa.me/556235761988"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 w-full p-5 bg-industrial-950 text-white hover:bg-industrial-800 active:bg-industrial-700 transition-colors group"
                            aria-label="Atendimento via WhatsApp — abre em nova aba"
                        >
                            <MessageCircle className="size-7 shrink-0" aria-hidden="true" />
                            <div>
                                <div className="font-black uppercase tracking-widest text-sm">WHATSAPP RÁPIDO</div>
                                <div className="text-industrial-400 text-[11px]">Resposta em até 2 horas úteis</div>
                            </div>
                            <span className="ml-auto text-industrial-400 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
