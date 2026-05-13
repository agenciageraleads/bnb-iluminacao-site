"use client";

import { useState } from "react";
import { X, LockOpen, Phone, User, Loader2 } from "lucide-react";

interface LeadCaptureDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    representativeState: string;
}

export function LeadCaptureDialog({ isOpen, onClose, onSuccess, representativeState }: LeadCaptureDialogProps) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim() || !phone.trim()) {
            setError("Por favor, preencha nome e telefone/WhatsApp.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/leads/representative", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    phone,
                    representativeState,
                    representativeName: "Múltiplos (Estado Completo)" // Contexto geral
                }),
            });

            if (!res.ok) {
                throw new Error("Erro ao enviar dados");
            }

            // Sucesso!
            onSuccess();
        } catch (err) {
            console.error(err);
            setError("Ocorreu um erro. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-industrial-950/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
                aria-hidden="true"
            />
            
            {/* Modal / Drawer Content */}
            <div 
                className="relative bg-white w-full max-w-md sm:rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
                style={{ 
                    borderTopLeftRadius: "1.5rem", 
                    borderTopRightRadius: "1.5rem",
                    borderBottomLeftRadius: "0",
                    borderBottomRightRadius: "0" 
                }}
            >
                {/* Ajuste de raio para Desktop (sm+) via global css ou estilo embutido override */}
                <style dangerouslySetInnerHTML={{__html: `
                    @media (min-width: 640px) {
                        .sm\\:rounded-xl { border-radius: 0.75rem !important; }
                    }
                `}} />

                {/* Handle for mobile swipe indicator */}
                <div className="w-full flex justify-center pt-3 sm:hidden">
                    <div className="w-12 h-1.5 bg-industrial-200 rounded-full" />
                </div>

                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xl font-black text-industrial-950 tracking-tight flex items-center gap-2">
                                <LockOpen className="size-5 text-accent-dark" />
                                Liberar Contatos
                            </h3>
                            <p className="text-sm text-industrial-500 mt-1">
                                Informe seus dados para visualizar os representantes em {representativeState}.
                            </p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-2 -mr-2 text-industrial-400 hover:text-industrial-600 transition-colors rounded-full hover:bg-industrial-100"
                        >
                            <X className="size-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="lead-name" className="text-xs font-bold uppercase tracking-wider text-industrial-600">
                                Seu Nome
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-4 text-industrial-400" />
                                </div>
                                <input
                                    id="lead-name"
                                    type="text"
                                    placeholder="Ex: João Silva"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-industrial-200 rounded-lg focus:ring-2 focus:ring-accent-premium focus:border-accent-premium sm:text-sm bg-industrial-50 focus:bg-white transition-colors outline-none"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="lead-phone" className="text-xs font-bold uppercase tracking-wider text-industrial-600">
                                WhatsApp / Telefone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="size-4 text-industrial-400" />
                                </div>
                                <input
                                    id="lead-phone"
                                    type="tel"
                                    placeholder="(11) 99999-9999"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-industrial-200 rounded-lg focus:ring-2 focus:ring-accent-premium focus:border-accent-premium sm:text-sm bg-industrial-50 focus:bg-white transition-colors outline-none"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-industrial-950 bg-accent-premium hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-premium transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-6 uppercase tracking-wide"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Liberando...
                                </>
                            ) : (
                                "Mostrar Contatos"
                            )}
                        </button>
                        
                        <p className="text-center text-[10px] text-industrial-400 mt-4 uppercase font-medium">
                            Seus dados estão seguros. Não enviamos spam.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
