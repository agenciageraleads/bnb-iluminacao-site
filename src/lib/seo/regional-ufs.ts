import type { SeoImageKey } from "@/lib/seo/images"

export interface RegionalUfPageData {
    uf: string
    stateName: string
    stateSlug: string
    regionName: string
    path: string
    title: string
    description: string
    heroImageKey: SeoImageKey
    heroAlt: string
    commercialContext: string
    prioritySegments: string[]
    logisticsNotes: string[]
    galleryKeys: SeoImageKey[]
}

export const regionalUfPages = {
    saoPaulo: {
        uf: "SP",
        stateName: "São Paulo",
        stateSlug: "sao-paulo",
        regionName: "Sudeste",
        path: "/postes-metalicos-sao-paulo",
        title: "Postes Metálicos em São Paulo | Atendimento B&B",
        description:
            "Postes metalicos para projetos em Sao Paulo com fabricacao em Goiania, atendimento tecnico nacional e orcamento por modelo, altura, quantidade e acabamento.",
        heroImageKey: "avenidaCidadeIluminadaPostes",
        heroAlt: "Avenida urbana iluminada usada como referencia visual para postes metalicos em Sao Paulo",
        commercialContext:
            "Sao Paulo concentra compras tecnicas para construtoras, condominios, loteamentos, industrias, varejo e projetos publicos. A pagina deve ajudar o comprador a sair da busca generica e enviar dados suficientes para uma cotacao comparavel.",
        prioritySegments: [
            "condominios residenciais e comerciais",
            "estacionamentos e areas de acesso",
            "loteamentos e vias internas",
            "areas industriais e patios logisticos",
            "pracas, parques e areas urbanas",
            "compras sob memorial tecnico",
        ],
        logisticsNotes: [
            "Frete e prazo sao confirmados no orcamento conforme volume, rota e cidade de entrega.",
            "A fabricacao em Goiania funciona como prova operacional; a compra para Sao Paulo deve ser tratada como atendimento nacional.",
            "Quando houver memorial, desenho ou lista de postes, o time comercial consegue comparar modelos, acabamento e fixacao com mais precisao.",
        ],
        galleryKeys: [
            "avenidaCidadeIluminadaPostes",
            "estacionamentoExternoPostesMetalicos",
            "condominioEstacionamentoPosteMetalico",
            "viaIluminadaPosteTeleconicoReto",
        ],
    },
    minasGerais: {
        uf: "MG",
        stateName: "Minas Gerais",
        stateSlug: "minas-gerais",
        regionName: "Sudeste",
        path: "/postes-metalicos-minas-gerais",
        title: "Postes Metálicos em Minas Gerais | Atendimento B&B",
        description:
            "Postes metalicos para projetos em Minas Gerais com origem fabril em Goiania, atendimento nacional e cotacao tecnica por aplicacao.",
        heroImageKey: "areaIndustrialIluminadaPostes",
        heroAlt: "Area industrial iluminada usada como referencia visual para postes metalicos em Minas Gerais",
        commercialContext:
            "Minas Gerais combina demanda urbana, industrial, logistica e de loteamentos. A pagina deve priorizar especificacao, compra sob projeto e clareza sobre frete e prazo sob orcamento.",
        prioritySegments: [
            "industrias, galpoes e patios",
            "loteamentos e acessos urbanos",
            "condominios e estacionamentos",
            "pracas e areas de convivencia",
            "vias internas e avenidas de acesso",
            "fornecimento por etapa de obra",
        ],
        logisticsNotes: [
            "A rota de entrega e avaliada conforme cidade, quantidade, acabamento e restricoes de descarga.",
            "A B&B nao publica prazo fixo para Minas Gerais sem validar volume e cronograma comercial.",
            "Fotos, plantas e memoriais ajudam a separar postes retos, teleconicos, curvos, flangeados ou engastados.",
        ],
        galleryKeys: [
            "areaIndustrialIluminadaPostes",
            "postesRetosIluminacaoExterna",
            "estacionamentoCobertoPostesRetos",
            "pracaPublicaPostesIluminacaoDia",
        ],
    },
    rioDeJaneiro: {
        uf: "RJ",
        stateName: "Rio de Janeiro",
        stateSlug: "rio-de-janeiro",
        regionName: "Sudeste",
        path: "/postes-metalicos-rio-de-janeiro",
        title: "Postes Metálicos no Rio de Janeiro | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Rio de Janeiro com fabricacao em Goiania, atendimento nacional e orcamento tecnico por ambiente, acabamento e volume.",
        heroImageKey: "avenidaDuasPistasIluminadaPostes",
        heroAlt: "Avenida de duas pistas iluminada usada como referencia visual para postes metalicos no Rio de Janeiro",
        commercialContext:
            "O Rio de Janeiro demanda especificacao cuidadosa para condominios, areas comerciais, estacionamentos, vias urbanas e ambientes externos. A pagina deve orientar acabamento e dados de cotacao sem prometer prazo ou presenca local.",
        prioritySegments: [
            "condominios e areas comuns",
            "estacionamentos comerciais",
            "vias urbanas e acessos",
            "pracas, parques e areas de lazer",
            "areas industriais e operacionais",
            "projetos com acabamento definido em memorial",
        ],
        logisticsNotes: [
            "Frete, prazo e embalagem dependem de cidade de entrega, quantidade, altura e acabamento.",
            "Ambientes externos devem ser discutidos com base no projeto, no acabamento desejado e na manutencao prevista.",
            "A pagina nao substitui analise tecnica; ela organiza os dados minimos para uma proposta comercial.",
        ],
        galleryKeys: [
            "avenidaDuasPistasIluminadaPostes",
            "patioAeroportoIluminadoPostes",
            "viaUrbanaPostesCurvos",
            "estacionamentoNoturnoPosteReto",
        ],
    },
    bahia: {
        uf: "BA",
        stateName: "Bahia",
        stateSlug: "bahia",
        regionName: "Nordeste",
        path: "/postes-metalicos-bahia",
        title: "Postes Metálicos na Bahia | Atendimento B&B",
        description:
            "Postes metalicos para projetos na Bahia com fabricacao em Goiania, atendimento tecnico nacional e cotacao por aplicacao, quantidade, acabamento e cidade de entrega.",
        heroImageKey: "viaPublicaPostesRetosDoisLados",
        heroAlt: "Via publica com postes metalicos usada como referencia visual para projetos na Bahia",
        commercialContext:
            "A Bahia concentra demanda em expansao urbana, loteamentos, industrias, condominios, estacionamentos e areas externas. A pagina organiza a cotacao para compras tecnicas sem criar promessa de presenca local artificial.",
        prioritySegments: [
            "loteamentos e vias internas",
            "areas industriais e patios",
            "condominios e estacionamentos",
            "pracas e areas urbanas",
            "acessos comerciais e institucionais",
            "fornecimento conforme memorial",
        ],
        logisticsNotes: [
            "Frete e prazo dependem de cidade de entrega, volume, acabamento, rota e condicao de descarga.",
            "A origem fabril em Goiania comprova producao propria; o atendimento para a Bahia segue criterio nacional.",
            "Fotos, memoriais, lista de postes e altura desejada ajudam o time comercial a separar modelo, fixacao e acabamento.",
        ],
        galleryKeys: [
            "viaPublicaPostesRetosDoisLados",
            "areaIndustrialIluminadaPostes",
            "estacionamentoExternoPostesMetalicos",
            "pracaPublicaPostesIluminacaoDia",
        ],
    },
    pernambuco: {
        uf: "PE",
        stateName: "Pernambuco",
        stateSlug: "pernambuco",
        regionName: "Nordeste",
        path: "/postes-metalicos-pernambuco",
        title: "Postes Metálicos em Pernambuco | Atendimento B&B",
        description:
            "Postes metalicos para projetos em Pernambuco com atendimento nacional, origem fabril em Goiania e orcamento tecnico por modelo, altura, fixacao e acabamento.",
        heroImageKey: "viaUrbanaIluminadaPostes",
        heroAlt: "Via urbana iluminada usada como referencia visual para postes metalicos em Pernambuco",
        commercialContext:
            "Pernambuco tem demanda tecnica em condominios, vias internas, areas industriais, estacionamentos, pracas e acessos. A pagina ajuda o comprador a enviar um briefing objetivo para cotar postes metalicos com comparacao correta.",
        prioritySegments: [
            "condominios e areas comuns",
            "estacionamentos e acessos",
            "loteamentos e vias internas",
            "areas industriais e operacionais",
            "pracas e areas de convivencia",
            "compras por projeto ou memorial",
        ],
        logisticsNotes: [
            "A proposta considera cidade de entrega, quantidade, dimensoes, acabamento e necessidade de descarga.",
            "Nao ha prazo fixo publicado para Pernambuco sem avaliacao de rota, volume e cronograma comercial.",
            "O envio de planta, desenho ou fotos acelera a definicao entre poste reto, teleconico, curvo, flangeado ou engastado.",
        ],
        galleryKeys: [
            "viaUrbanaIluminadaPostes",
            "condominioEstacionamentoPosteMetalico",
            "estacionamentoNoturnoPosteReto",
            "viaIluminadaPosteTeleconicoReto",
        ],
    },
    ceara: {
        uf: "CE",
        stateName: "Ceará",
        stateSlug: "ceara",
        regionName: "Nordeste",
        path: "/postes-metalicos-ceara",
        title: "Postes Metálicos no Ceará | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Ceara com fabricacao em Goiania, atendimento nacional e cotacao tecnica por aplicacao, acabamento, fixacao e volume.",
        heroImageKey: "ruaIluminadaPosteCurvo",
        heroAlt: "Rua iluminada com poste curvo usada como referencia visual para postes metalicos no Ceara",
        commercialContext:
            "O Ceara combina demanda de vias, loteamentos, areas comerciais, condominios, estacionamentos e projetos publicos. A pagina transforma a busca por fornecedor em dados praticos para uma cotacao tecnica.",
        prioritySegments: [
            "vias urbanas e acessos",
            "loteamentos e condominios",
            "estacionamentos externos",
            "areas comerciais e institucionais",
            "pracas e areas de lazer",
            "projetos com padrao visual definido",
        ],
        logisticsNotes: [
            "Frete, prazo e embalagem sao avaliados por cidade, volume, altura, acabamento e rota.",
            "A compra para o Ceara deve informar aplicacao, quantidade, fixacao e acabamento para reduzir idas e vindas comerciais.",
            "A B&B usa a fabricacao em Goiania como prova operacional e atende a demanda nacional por cotacao tecnica.",
        ],
        galleryKeys: [
            "ruaIluminadaPosteCurvo",
            "viaUrbanaPostesCurvos",
            "pracaIluminadaLuminariaRedonda",
            "posteCurvoDuploAvenidaNoite",
        ],
    },
    goias: {
        uf: "GO",
        stateName: "Goiás",
        stateSlug: "goias",
        regionName: "Centro-Oeste",
        path: "/postes-metalicos-goias",
        title: "Postes Metálicos em Goiás | Atendimento B&B",
        description:
            "Postes metalicos para projetos em Goias com fabricacao em Goiania, atendimento tecnico nacional e cotacao por modelo, altura, fixacao, acabamento e volume.",
        heroImageKey: "posteMetalicoGalvanizadoInstaladoAreaExterna",
        heroAlt: "Poste metalico instalado em area externa usado como referencia visual para projetos em Goias",
        commercialContext:
            "Goias e a prova operacional da B&B: origem fabril real, producao propria e conversa tecnica para obras publicas e privadas. A pagina deve capturar demanda estadual sem reduzir a estrategia comercial ao mercado local.",
        prioritySegments: [
            "condominios e loteamentos",
            "estacionamentos e acessos comerciais",
            "areas industriais e patios",
            "pracas, vias internas e avenidas",
            "obras publicas e institucionais",
            "compras com retirada ou entrega sob orcamento",
        ],
        logisticsNotes: [
            "Mesmo em Goias, frete, retirada, prazo e descarga devem ser confirmados conforme quantidade, acabamento e cronograma da obra.",
            "A fabrica em Goiania comprova origem produtiva, mas a pagina segue a mesma regra nacional de cotacao tecnica.",
            "Memorial, lista de postes, foto da area e altura desejada ajudam a definir modelo, fixacao, acabamento e volume.",
        ],
        galleryKeys: [
            "posteMetalicoGalvanizadoInstaladoAreaExterna",
            "posteCurvoSimplesAvenidaNoite",
            "estacionamentoExternoPostesMetalicos",
            "condominioEstacionamentoPosteMetalico",
        ],
    },
    distritoFederal: {
        uf: "DF",
        stateName: "Distrito Federal",
        stateSlug: "distrito-federal",
        regionName: "Centro-Oeste",
        path: "/postes-metalicos-distrito-federal",
        title: "Postes Metálicos no Distrito Federal | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Distrito Federal com origem fabril em Goiania, atendimento nacional e orcamento tecnico por aplicacao, fixacao e acabamento.",
        heroImageKey: "avenidaCidadeIluminadaPostes",
        heroAlt: "Avenida iluminada usada como referencia visual para postes metalicos no Distrito Federal",
        commercialContext:
            "O Distrito Federal demanda postes metalicos para condominios, estacionamentos, acessos institucionais, areas comerciais, vias internas e obras sob memorial. A pagina organiza a compra sem indicar presenca local artificial.",
        prioritySegments: [
            "condominios residenciais e comerciais",
            "estacionamentos e acessos institucionais",
            "vias internas e areas urbanas",
            "areas comerciais e corporativas",
            "pracas e espacos publicos",
            "compras tecnicas com memorial",
        ],
        logisticsNotes: [
            "A proposta considera cidade de entrega, quantidade, altura, acabamento, fixacao e condicao de descarga.",
            "A proximidade com Goiania pode facilitar avaliacao comercial, mas prazo e frete nao devem ser prometidos sem orcamento.",
            "Plantas, fotos, memorial e lista de postes reduzem retrabalho na comparacao entre modelos retos, teleconicos e curvos.",
        ],
        galleryKeys: [
            "avenidaCidadeIluminadaPostes",
            "estacionamentoCobertoPostesRetos",
            "viaUrbanaPostesCurvos",
            "postesRetosIluminacaoExterna",
        ],
    },
} as const satisfies Record<string, RegionalUfPageData>

export const regionalUfPageList = Object.values(regionalUfPages)
