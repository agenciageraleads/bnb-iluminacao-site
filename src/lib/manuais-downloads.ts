// Manuais de instalação B&B (BB-MI-001..004). Documentos transversais: valem para
// qualquer linha de poste, por isso não ficam sob uma âncora `#linha-*`.
// Os PDFs vivem em public/downloads/manuais/ e são gerados por
// `datasheet-assets/gerar_manuais_instalacao.py` no workspace da B&B.

export type ManualInstalacao = {
    codigo: string
    nome: string
    descricao: string
    arquivo: string
    /** Nome amigável usado no atributo download. */
    nomeArquivo: string
}

export const MANUAIS_INSTALACAO: ManualInstalacao[] = [
    {
        codigo: 'BB-MI-001',
        nome: 'Postes Engastados',
        descricao:
            'Escavação, lastro, concretagem e prumo. Profundidade de engaste conforme NBR 14744 e altura do furo de passagem dos cabos.',
        arquivo: '/downloads/manuais/MANUAL-INSTALACAO-BB-POSTES-ENGASTADOS.pdf',
        nomeArquivo: 'B&B - Manual de Instalação - Postes Engastados.pdf',
    },
    {
        codigo: 'BB-MI-002',
        nome: 'Postes Flangeados',
        descricao:
            'Nivelamento pelas porcas inferiores, içamento, aperto em “X” e ajuste de orientação em campo pelos furos oblongos da sapata.',
        arquivo: '/downloads/manuais/MANUAL-INSTALACAO-BB-POSTES-FLANGEADOS.pdf',
        nomeArquivo: 'B&B - Manual de Instalação - Postes Flangeados.pdf',
    },
    {
        codigo: 'BB-MI-003',
        nome: 'Chumbadores',
        descricao:
            'Escavação, traço do concreto, posicionamento contra o gabarito da sapata e tempo de cura antes de receber o poste.',
        arquivo: '/downloads/manuais/MANUAL-INSTALACAO-BB-CHUMBADORES.pdf',
        nomeArquivo: 'B&B - Manual de Instalação - Chumbadores.pdf',
    },
    {
        codigo: 'BB-MI-004',
        nome: 'Elétrica de Luminárias',
        descricao:
            'Passagem dos cabos, conexões, isolação e fixação do suporte. Instalação conforme NBR 5410, por profissional habilitado (NR-10).',
        arquivo: '/downloads/manuais/MANUAL-INSTALACAO-BB-ELETRICA-LUMINARIAS.pdf',
        nomeArquivo: 'B&B - Manual de Instalação - Elétrica de Luminárias.pdf',
    },
]
