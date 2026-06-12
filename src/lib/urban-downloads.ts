// Downloads técnicos da Linha Urban (datasheets + desenhos técnicos engastados).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.

export const URBAN_HEIGHTS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export type UrbanFamily = {
    sigla: 'TCS' | 'TCD' | 'TR'
    nome: string
    datasheet: string
    alturas: number[]
}

// TCD não tem 3m por enquanto (definição de fábrica pendente)
export const URBAN_FAMILIES: UrbanFamily[] = [
    {
        sigla: 'TCS',
        nome: 'Poste Telecônico Curvo Simples',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf',
        alturas: URBAN_HEIGHTS,
    },
    {
        sigla: 'TCD',
        nome: 'Poste Telecônico Curvo Duplo',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf',
        alturas: URBAN_HEIGHTS.filter(h => h >= 4),
    },
    {
        sigla: 'TR',
        nome: 'Poste Telecônico Reto',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf',
        alturas: URBAN_HEIGHTS,
    },
]

export function desenhoTecnicoHref(sigla: string, alturaM: number) {
    return `/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-URB-${sigla}${String(alturaM).padStart(2, '0')}-E.pdf`
}

/** Deriva os downloads disponíveis a partir do código do produto (ex.: BB-URB-TCSXX-E). */
export function getUrbanDownloads(model?: string) {
    const match = model?.match(/^BB-URB-(TCS|TCD|TR)XX-([EF])$/i)
    if (!match) return null
    const familia = URBAN_FAMILIES.find(f => f.sigla === match[1].toUpperCase())
    if (!familia) return null
    return {
        datasheet: familia.datasheet,
        // desenhos técnicos disponíveis apenas para os engastados (flangeados em breve)
        desenhos: match[2].toUpperCase() === 'E'
            ? familia.alturas.map(h => ({ altura: h, href: desenhoTecnicoHref(familia.sigla, h) }))
            : null,
    }
}
