"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function TrainingGuard({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Ignora a própria página de login para evitar loop
        if (pathname === "/treinamento/login") {
            setIsAuthorized(true)
            return
        }

        const auth = sessionStorage.getItem("bb_rep_auth")
        if (auth === "true") {
            setIsAuthorized(true)
        } else {
            setIsAuthorized(false)
            router.push("/treinamento/login")
        }
    }, [pathname, router])

    if (isAuthorized === null) {
        return (
            <div className="min-h-screen bg-industrial-950 flex items-center justify-center">
                <div className="size-10 border-4 border-accent-premium/20 border-t-accent-premium rounded-full animate-spin" />
            </div>
        )
    }

    if (!isAuthorized && pathname !== "/treinamento/login") {
        return null // Evita flash de conteúdo antes do redirect
    }

    return <>{children}</>
}
