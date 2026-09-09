// Downloads técnicos da Linha Nexo (datasheets por produto).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.
//
// Publicados por enquanto: Suporte para Luminárias, Conjunto Chumbador e
// Cruzeta para Refletores. Os braços (curvo/reto p/ luminária e p/ câmera)
// seguem em validação e entram numa próxima atualização.

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
    {
        codigo: 'BB-NEX-CRZ2 a CRZ4',
        nome: 'Cruzeta p/ Refletores',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-CRUZETA-REFLETORES.pdf',
    },
]
