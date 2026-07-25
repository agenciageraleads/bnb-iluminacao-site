// Downloads técnicos da Linha Civis — Mastros para Bandeira (datasheet + desenhos por fixação).
// Os PDFs vivem em public/downloads/ e são gerados em Projetos/B&B/datasheet-assets.

// Linha fabricada em série: 6 a 12 metros, engastado (E) ou flangeado (F).
// Alturas fora dessa faixa (ex.: 4m e 5m) são projetos especiais, sob consulta.
export const MASTRO_HEIGHTS = [6, 7, 8, 9, 10, 11, 12]

export type CivisMount = 'E' | 'F'

export type CivisFamily = {
    sigla: 'MST'
    nome: string
    datasheet: string
    alturasEng: number[]   // engastado
    alturasFla: number[]   // flangeado
}

export const CIVIS_FAMILIES: CivisFamily[] = [
    {
        sigla: 'MST',
        nome: 'Mastro para Bandeira',
        datasheet: '/downloads/datasheets/DATASHEET-BB-MST-MASTRO-BANDEIRA.pdf',
        alturasEng: MASTRO_HEIGHTS,
        alturasFla: MASTRO_HEIGHTS,
    },
]

// Ex.: 9m + E -> DESENHO-TECNICO-BB-MST-09-E.pdf
export function desenhoMastroHref(alturaM: number, mount: CivisMount = 'E') {
    const altura = String(alturaM).padStart(2, '0')
    return `/downloads/desenhos-tecnicos/DESENHO-TECNICO-BB-MST-${altura}-${mount}.pdf`
}
