export interface SeoImage {
    src: string
    alt: string
    title: string
}

export const seoImageAssets = {
    estacionamentoHospitalPostes: {
        src: "/images/seo/postes-metalicos/estacionamento-hospital-postes.jpg",
        alt: "Postes metalicos aplicados em estacionamento hospitalar iluminado",
        title: "Estacionamento hospitalar",
        cluster: "postes-metalicos",
    },
    estacionamentoIndustrialPostesRetos: {
        src: "/images/seo/postes-metalicos/estacionamento-industrial-postes-retos.jpg",
        alt: "Postes metalicos retos iluminando area de estacionamento e circulacao industrial",
        title: "Estacionamento industrial",
        cluster: "postes-metalicos",
    },
    pracaIluminadaLuminariaRedonda: {
        src: "/images/seo/postes-metalicos/praca-iluminada-luminaria-redonda.jpg",
        alt: "Postes ornamentais com luminaria redonda em praca iluminada",
        title: "Praca iluminada",
        cluster: "postes-metalicos",
    },
    ruaIluminadaPosteCurvo: {
        src: "/images/seo/postes-metalicos/rua-iluminada-poste-curvo.jpg",
        alt: "Poste metalico curvo iluminando rua arborizada ao anoitecer",
        title: "Rua com poste curvo",
        cluster: "postes-metalicos",
    },
    viaPublicaPostesRetosDoisLados: {
        src: "/images/seo/postes-metalicos/via-publica-postes-retos-dois-lados.jpg",
        alt: "Postes metalicos retos em via publica iluminada nos dois sentidos",
        title: "Via publica",
        cluster: "postes-metalicos",
    },
    viaUrbanaIluminadaPostes: {
        src: "/images/seo/postes-metalicos/via-urbana-iluminada-postes.jpg",
        alt: "Postes metalicos em via urbana iluminada durante a noite",
        title: "Via urbana",
        cluster: "postes-metalicos",
    },
    corteLaserIndustrial: {
        src: "/images/servicos/corte-laser.jpg",
        alt: "Processo industrial de corte metalico na B&B Iluminacao",
        title: "Processo industrial",
        cluster: "servicos-metalicos",
    },
    posteCurvoDuploAvenidaDia: {
        src: "/images/produtos/poste-curvo-duplo-avenida-dia.png",
        alt: "Poste curvo duplo para avenida com iluminacao publica",
        title: "Poste curvo duplo",
        cluster: "produtos-postes",
    },
    posteCurvoSimplesRuaNoite: {
        src: "/images/produtos/poste-curvo-simples-rua-noite.png",
        alt: "Poste curvo simples para rua iluminada a noite",
        title: "Poste curvo simples",
        cluster: "produtos-postes",
    },
    posteRetoAvenidaDia: {
        src: "/images/produtos/poste-reto-avenida-dia.png",
        alt: "Poste reto metalico para avenida e iluminacao publica",
        title: "Poste reto",
        cluster: "produtos-postes",
    },
} as const

export type SeoImageKey = keyof typeof seoImageAssets

export function createSeoImage(
    key: SeoImageKey,
    overrides: Partial<Pick<SeoImage, "alt" | "title">> = {}
): SeoImage {
    const image = seoImageAssets[key]

    return {
        src: image.src,
        alt: overrides.alt ?? image.alt,
        title: overrides.title ?? image.title,
    }
}

export function getProductImageAlt(model: string, categoryTitle?: string) {
    const normalizedModel = model.trim()
    const normalizedCategory = categoryTitle?.trim()

    if (normalizedCategory) {
        return `${normalizedModel} da B&B Iluminacao na categoria ${normalizedCategory}`
    }

    return `${normalizedModel} da B&B Iluminacao`
}
