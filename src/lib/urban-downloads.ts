// Downloads técnicos da Linha Urban (datasheets + desenhos técnicos por fixação).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.

export const URBAN_HEIGHTS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const URBAN_S_PRO_HEIGHTS = URBAN_HEIGHTS.filter(h => h <= 12)

export type UrbanMount = 'E' | 'F'

export type UrbanFamily = {
    sigla: 'TCS' | 'TCD' | 'TR' | 'S-TR' | 'PRO-TR'
    nome: string
    datasheet: string
    alturasEng: number[]   // engastado
    alturasFla: number[]   // flangeado
}

// Curvos (TCS/TCD) não têm 3m flangeado; o curvo duplo também não tem 3m engastado.
const A_PARTIR_4 = URBAN_HEIGHTS.filter(h => h >= 4)
export const URBAN_FAMILIES: UrbanFamily[] = [
    {
        sigla: 'TCS',
        nome: 'Poste Telecônico Curvo Simples',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-SIMPLES.pdf',
        alturasEng: URBAN_HEIGHTS,
        alturasFla: A_PARTIR_4,
    },
    {
        sigla: 'TCD',
        nome: 'Poste Telecônico Curvo Duplo',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-CURVO-DUPLO.pdf',
        alturasEng: A_PARTIR_4,
        alturasFla: A_PARTIR_4,
    },
    {
        sigla: 'TR',
        nome: 'Poste Telecônico Reto',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-RETO.pdf',
        alturasEng: URBAN_HEIGHTS,
        alturasFla: URBAN_HEIGHTS,
    },
    // Urban S (20 daN, topo 2.1/2") e Urban PRO (30 daN, topo 3"): 3 a 12 m, cortes aprovados em 04/11/2026
    {
        sigla: 'S-TR',
        nome: 'Poste Telecônico Reto Urban S (20 daN)',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-RETO-URBAN-S.pdf',
        alturasEng: URBAN_S_PRO_HEIGHTS,
        alturasFla: URBAN_S_PRO_HEIGHTS,
    },
    {
        sigla: 'PRO-TR',
        nome: 'Poste Telecônico Reto Urban PRO (30 daN)',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-RETO-URBAN-PRO.pdf',
        alturasEng: URBAN_S_PRO_HEIGHTS,
        alturasFla: URBAN_S_PRO_HEIGHTS,
    },
]

export function desenhoTecnicoHref(sigla: string, alturaM: number, mount: UrbanMount = 'E') {
    return `/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-URB-${sigla}${String(alturaM).padStart(2, '0')}-${mount}.pdf`
}

/** Deriva os downloads disponíveis a partir do código do produto (ex.: BB-URB-TCSXX-E). */
export function getUrbanDownloads(model?: string) {
    const match = model?.match(/^BB-URB-(TCS|TCD|TR|S-TR|PRO-TR)XX-([EF])$/i)
    if (!match) return null
    const familia = URBAN_FAMILIES.find(f => f.sigla === match[1].toUpperCase())
    if (!familia) return null
    const mount = match[2].toUpperCase() as UrbanMount
    const alturas = mount === 'E' ? familia.alturasEng : familia.alturasFla
    return {
        datasheet: familia.datasheet,
        desenhos: alturas.map(h => ({ altura: h, href: desenhoTecnicoHref(familia.sigla, h, mount) })),
    }
}
