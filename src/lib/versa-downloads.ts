// Downloads técnicos da Linha Versa (datasheets + desenhos técnicos por fixação).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.

export const VERSA_HEIGHTS = [3, 4, 5, 6]
export const EOS_HEIGHTS = [2, 2.5, 3]

export type VersaMount = 'E' | 'F'

export type VersaFamily = {
    sigla: 'GF1' | 'GF2' | 'ES' | 'ED'
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
    {
        sigla: 'ES',
        nome: 'Poste Éos Simples 1×E27 (globo)',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-EOS-SIMPLES.pdf',
        alturasEng: EOS_HEIGHTS,
        alturasFla: EOS_HEIGHTS,
    },
    {
        sigla: 'ED',
        nome: 'Poste Éos Duplo 2×E27 (globos)',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-EOS-DUPLO.pdf',
        alturasEng: EOS_HEIGHTS,
        alturasFla: EOS_HEIGHTS,
    },
]

// Código de altura no nome do arquivo:
// Girafa usa metros inteiros (GF1 + 3m -> "03"); Éos usa decímetros (ES + 2,5m -> "25").
function codigoAltura(sigla: string, alturaM: number) {
    if (sigla === 'ES' || sigla === 'ED') return String(Math.round(alturaM * 10))
    return String(alturaM).padStart(2, '0')
}

// Rótulo exibido no chip de altura: "3m" (inteiro) ou "2,5m" (fracionário).
export function labelAlturaVersa(alturaM: number) {
    return Number.isInteger(alturaM) ? `${alturaM}m` : `${alturaM.toFixed(1).replace('.', ',')}m`
}

// Ex.: GF1 + 3m + E -> DESENHO-TECNICO-BB-VRS-GF103-E.pdf
//      ED + 2,5m + F -> DESENHO-TECNICO-BB-VRS-ED25-F.pdf
export function desenhoVersaHref(sigla: string, alturaM: number, mount: VersaMount = 'E') {
    return `/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-VRS-${sigla}${codigoAltura(sigla, alturaM)}-${mount}.pdf`
}

// Luminária Girafa LED 50W (componente derivado, desenho único sem variação de altura)
export const VERSA_LUMINARIA = {
    codigo: 'BB-VRS-LG50',
    nome: 'Luminária Girafa LED 50W',
    desenho: '/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-VRS-LG50.pdf',
}
