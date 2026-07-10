// Downloads técnicos da Linha Versa (datasheets + desenhos técnicos por fixação).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.

export const VERSA_HEIGHTS = [3, 4, 5, 6]

export type VersaMount = 'E' | 'F'

export type VersaFamily = {
    sigla: 'GF1' | 'GF2'
    nome: string
    datasheet: string
    alturasEng: number[]
    alturasFla: number[]
}

export const VERSA_FAMILIES: VersaFamily[] = [
    {
        sigla: 'GF1',
        nome: 'Poste Girafa LED 1×50W',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-GIRAFA-SIMPLES.pdf',
        alturasEng: VERSA_HEIGHTS,
        alturasFla: VERSA_HEIGHTS,
    },
    {
        sigla: 'GF2',
        nome: 'Poste Girafa LED 2×50W',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-GIRAFA-DUPLA.pdf',
        alturasEng: VERSA_HEIGHTS,
        alturasFla: VERSA_HEIGHTS,
    },
]

// Ex.: GF1 + 3m + E -> DESENHO-TECNICO-BB-VRS-GF103-E.pdf
export function desenhoVersaHref(sigla: string, alturaM: number, mount: VersaMount = 'E') {
    return `/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-VRS-${sigla}${String(alturaM).padStart(2, '0')}-${mount}.pdf`
}

// Luminária Girafa LED 50W (componente derivado, desenho único sem variação de altura)
export const VERSA_LUMINARIA = {
    codigo: 'BB-VRS-LG50',
    nome: 'Luminária Girafa LED 50W',
    desenho: '/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-VRS-LG50.pdf',
}
