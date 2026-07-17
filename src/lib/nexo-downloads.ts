// Downloads técnicos da Linha Nexo (datasheets por produto).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.
//
// Publicados por enquanto: Suporte para Luminárias e Conjunto Chumbador.
// Os demais itens da linha (braços curvo/reto p/ luminária e câmera, cruzeta
// p/ refletores) seguem em validação e entram numa próxima atualização.

export type NexoDatasheet = {
    codigo: string
    nome: string
    datasheet: string
}

export const NEXO_DATASHEETS: NexoDatasheet[] = [
    {
        codigo: 'BB-NEX-S1 a S4',
        nome: 'Suporte para Luminárias',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-SUPORTE-LUMINARIAS.pdf',
    },
    {
        codigo: 'BB-NEX-CH',
        nome: 'Conjunto Chumbador',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-CHUMBADOR.pdf',
    },
]
