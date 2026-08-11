// Downloads técnicos da Linha Forza — projetos especiais.
// Os PDFs vivem em public/downloads/ e são gerados em Projetos/B&B/datasheet-assets
// (`gerar_datasheets_forza.py`).

export type ForzaDatasheet = {
    codigo: string
    nome: string
    descricao: string
    datasheet: string
    /** Formatos de corpo cobertos pela ficha, com a faixa de altura de cada um. */
    formatos: { nome: string; codigo: string; alturas: string }[]
}

export const FORZA_DATASHEETS: ForzaDatasheet[] = [
    {
        codigo: 'BB-FRZ-AT',
        nome: 'Poste Telecônico Articulado',
        descricao:
            'Base articulada sobre chumbadores: soltando as quatro porcas, o poste desce girando sobre dois gonzos e a luminária chega ao nível do solo — manutenção sem caminhão munck nem cesto aéreo.',
        datasheet: '/downloads/datasheets/DATASHEET-BB-POSTE-ARTICULADO.pdf',
        formatos: [
            { nome: 'Reto', codigo: 'BB-FRZ-ATR', alturas: '3 a 12 m' },
            { nome: 'Curvo Simples', codigo: 'BB-FRZ-ATC', alturas: '4 a 12 m' },
            { nome: 'Curvo Duplo', codigo: 'BB-FRZ-ATD', alturas: '4 a 12 m' },
        ],
    },
]
