// Downloads técnicos da Linha Nexo (datasheets por produto).
// Os PDFs vivem em public/downloads/ e são gerados em Documentos/B&B/datasheet-assets.

export type NexoDatasheet = {
    codigo: string
    nome: string
    datasheet: string
}

export const NEXO_DATASHEETS: NexoDatasheet[] = [
    {
        codigo: 'BB-NEX-BRL',
        nome: 'Braço Reto p/ Luminária',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-BRACO-RETO-LUMINARIA.pdf',
    },
    {
        codigo: 'BB-NEX-BCL',
        nome: 'Braço Curvo p/ Luminária',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-BRACO-CURVO-LUMINARIA.pdf',
    },
    {
        codigo: 'BB-NEX-BRC',
        nome: 'Braço Reto p/ Câmera',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-BRACO-RETO-CAMERA.pdf',
    },
    {
        codigo: 'BB-NEX-BCC',
        nome: 'Braço Curvo p/ Câmera',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-BRACO-CURVO-CAMERA.pdf',
    },
    {
        codigo: 'BB-NEX-S1–S4',
        nome: 'Suportes Multi-Luminárias',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-SUPORTE-LUMINARIAS.pdf',
    },
    {
        codigo: 'BB-NEX-CRZ',
        nome: 'Cruzeta p/ Refletores',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-CRUZETA-REFLETORES.pdf',
    },
    {
        codigo: 'BB-NEX-CH',
        nome: 'Conjunto Chumbador',
        datasheet: '/downloads/datasheets/DATASHEET-BB-NEXO-CHUMBADOR.pdf',
    },
]
