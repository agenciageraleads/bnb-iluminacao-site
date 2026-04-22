import { TrainingGuard } from "@/components/layout/training-guard"

export const metadata = {
    title: "Portal do Representante | B&B Iluminação",
    description: "Área exclusiva para treinamento e suporte ao representante técnico B&B.",
    robots: "noindex, nofollow",
}

export default function TrainingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <TrainingGuard>
            {children}
        </TrainingGuard>
    )
}
