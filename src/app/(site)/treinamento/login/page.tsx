"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Lock, ArrowRight, ShieldCheck } from "lucide-react"

export default function TrainingLoginPage() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Verifica se já está logado
    useEffect(() => {
        const isAuth = sessionStorage.getItem("bb_rep_auth")
        if (isAuth === "true") {
            router.push("/treinamento")
        }
    }, [router])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(false)

        // Senha temporária conforme sugerido no plano
        if (password.toUpperCase() === "BB2024REP") {
            sessionStorage.setItem("bb_rep_auth", "true")
            router.push("/treinamento")
        } else {
            setTimeout(() => {
                setError(true)
                setIsLoading(false)
            }, 600)
        }
    }

    return (
        <main className="min-h-screen bg-industrial-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-premium rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-industrial-800 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo e Cabeçalho */}
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-white rounded-2xl mb-6 shadow-2xl">
                        <Image 
                            src="/logo.svg" 
                            alt="B&B Iluminação" 
                            width={120} 
                            height={40} 
                            className="h-auto"
                        />
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-premium/10 border border-accent-premium/20 text-accent-premium text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                        <ShieldCheck className="size-3" />
                        Acesso Restrito: Parceiro Técnico
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-2">
                        Portal do <br />
                        <span className="text-accent-premium">Representante</span>
                    </h1>
                    <p className="text-industrial-400 text-sm font-medium">
                        Insira sua chave de acesso para entrar no treinamento.
                    </p>
                </div>

                {/* Formulário de Login */}
                <div className="bg-industrial-900/50 backdrop-blur-xl border border-industrial-800 p-8 rounded-3xl shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="access-key" className="text-[11px] font-bold text-industrial-500 uppercase tracking-widest ml-1">
                                Chave de Acesso
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-industrial-600 group-focus-within:text-accent-premium transition-colors">
                                    <Lock className="size-5" />
                                </span>
                                <input
                                    id="access-key"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className={`w-full bg-industrial-950 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-industrial-800 focus:border-accent-premium'} h-14 pl-12 pr-4 text-white placeholder-industrial-700 outline-none transition-all rounded-xl font-mono tracking-widest`}
                                    required
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-xs font-bold animate-shake mt-2 ml-1">
                                    Chave de acesso incorreta. Verifique e tente novamente.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-accent-premium hover:bg-yellow-400 active:scale-[0.98] text-black font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-accent-premium/10"
                        >
                            {isLoading ? (
                                <div className="size-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            ) : (
                                <>
                                    Entrar no Portal
                                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Rodapé do Login */}
                <p className="mt-8 text-center text-industrial-600 text-xs font-medium">
                    &copy; {new Date().getFullYear()} B&B Iluminação Industrial. <br />
                    Protegido por criptografia industrial.
                </p>
            </div>

            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}</style>
        </main>
    )
}
