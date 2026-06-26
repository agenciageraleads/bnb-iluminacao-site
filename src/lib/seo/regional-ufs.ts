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
        stateName: "Sao Paulo",
        stateSlug: "sao-paulo",
        regionName: "Sudeste",
        path: "/postes-metalicos-sao-paulo",
        title: "Postes Metalicos em Sao Paulo | Atendimento B&B",
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
        title: "Postes Metalicos em Minas Gerais | Atendimento B&B",
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
        title: "Postes Metalicos no Rio de Janeiro | Atendimento B&B",
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
    parana: {
        uf: "PR",
        stateName: "Parana",
        stateSlug: "parana",
        regionName: "Sul",
        path: "/postes-metalicos-parana",
        title: "Postes Metalicos no Parana | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Parana com fabricacao em Goiania, atendimento tecnico nacional e cotacao por modelo, acabamento, volume e cidade de entrega.",
        heroImageKey: "viaUrbanaIluminadaAvenida",
        heroAlt: "Avenida urbana iluminada usada como referencia visual para postes metalicos no Parana",
        commercialContext:
            "O Parana combina demanda industrial, logistica, urbana e imobiliaria. A pagina orienta compradores que precisam comparar postes por aplicacao, acabamento, quantidade e condicao de entrega antes da proposta.",
        prioritySegments: [
            "areas industriais e patios logisticos",
            "loteamentos e vias internas",
            "condominios e areas comuns",
            "estacionamentos externos",
            "pracas e acessos urbanos",
            "compras por memorial tecnico",
        ],
        logisticsNotes: [
            "Frete e prazo sao avaliados conforme cidade de entrega, volume, acabamento e janela de descarga.",
            "A origem fabril em Goiania sustenta a compra direta, mas a proposta para o Parana segue fluxo de atendimento nacional.",
            "Listas de postes, plantas, fotos e memoriais reduzem retrabalho na escolha de modelo, fixacao e acabamento.",
        ],
        galleryKeys: [
            "viaUrbanaIluminadaAvenida",
            "estacionamentoIndustrialPostesRetos",
            "postesRetosIluminacaoExterna",
            "posteRetoAvenidaNoite",
        ],
    },
    santaCatarina: {
        uf: "SC",
        stateName: "Santa Catarina",
        stateSlug: "santa-catarina",
        regionName: "Sul",
        path: "/postes-metalicos-santa-catarina",
        title: "Postes Metalicos em Santa Catarina | Atendimento B&B",
        description:
            "Postes metalicos para projetos em Santa Catarina com fabricacao em Goiania, atendimento nacional e orcamento tecnico por aplicacao, fixacao e acabamento.",
        heroImageKey: "panoramaCidadeIluminadaPostes",
        heroAlt: "Panorama urbano iluminado usado como referencia visual para postes metalicos em Santa Catarina",
        commercialContext:
            "Santa Catarina tem demanda relevante em condominios, industrias, loteamentos, acessos e areas externas. A pagina organiza o briefing para cotacoes com clareza tecnica e sem promessa regional artificial.",
        prioritySegments: [
            "condominios horizontais e verticais",
            "areas industriais e galpoes",
            "loteamentos e ruas internas",
            "estacionamentos e acessos comerciais",
            "pracas e areas paisagisticas",
            "fornecimento por etapa de obra",
        ],
        logisticsNotes: [
            "A cidade de entrega, quantidade e tipo de descarga influenciam frete, embalagem e prazo.",
            "O acabamento deve ser definido conforme ambiente externo, padrao visual e manutencao esperada.",
            "A cotacao fica mais precisa quando o comprador envia memorial, planta, altura desejada e quantidade por modelo.",
        ],
        galleryKeys: [
            "panoramaCidadeIluminadaPostes",
            "condominioEstacionamentoPosteMetalico",
            "pracaIluminadaPostesJardim",
            "viaIluminadaPosteTeleconicoCurvo",
        ],
    },
    rioGrandeDoSul: {
        uf: "RS",
        stateName: "Rio Grande do Sul",
        stateSlug: "rio-grande-do-sul",
        regionName: "Sul",
        path: "/postes-metalicos-rio-grande-do-sul",
        title: "Postes Metalicos no Rio Grande do Sul | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Rio Grande do Sul com atendimento nacional, origem fabril em Goiania e cotacao por modelo, altura, fixacao e acabamento.",
        heroImageKey: "cidadeIluminadaPostesNoturnos",
        heroAlt: "Cidade iluminada a noite usada como referencia visual para postes metalicos no Rio Grande do Sul",
        commercialContext:
            "O Rio Grande do Sul exige cotacao bem estruturada para obras urbanas, condominios, industrias, estacionamentos e areas externas. A pagina ajuda a transformar a busca por fornecedor em briefing tecnico de compra.",
        prioritySegments: [
            "vias urbanas e acessos internos",
            "condominios e estacionamentos",
            "areas industriais e operacionais",
            "loteamentos e obras por etapa",
            "pracas e areas publicas",
            "compras com desenho ou memorial",
        ],
        logisticsNotes: [
            "Frete e prazo dependem de volume, cidade, rota, acabamento e cronograma da obra.",
            "Projetos no Rio Grande do Sul devem informar altura, fixacao, quantidade e aplicacao para comparacao correta.",
            "A B&B usa a fabrica em Goiania como prova de producao propria e organiza o atendimento comercial por demanda nacional.",
        ],
        galleryKeys: [
            "cidadeIluminadaPostesNoturnos",
            "viaPublicaPostesRetosDoisLados",
            "estacionamentoExternoPostesMetalicos",
            "posteCurvoSimplesAvenidaNoite",
        ],
    },
    bahia: {
        uf: "BA",
        stateName: "Bahia",
        stateSlug: "bahia",
        regionName: "Nordeste",
        path: "/postes-metalicos-bahia",
        title: "Postes Metalicos na Bahia | Atendimento B&B",
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
        title: "Postes Metalicos em Pernambuco | Atendimento B&B",
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
        stateName: "Ceara",
        stateSlug: "ceara",
        regionName: "Nordeste",
        path: "/postes-metalicos-ceara",
        title: "Postes Metalicos no Ceara | Atendimento B&B",
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
    paraState: {
        uf: "PA",
        stateName: "Para",
        stateSlug: "para",
        regionName: "Norte",
        path: "/postes-metalicos-para",
        title: "Postes Metalicos no Para | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Para com fabricacao em Goiania, atendimento tecnico nacional e cotacao por aplicacao, volume, acabamento e cidade de entrega.",
        heroImageKey: "areaIndustrialIluminadaPostes",
        heroAlt: "Area industrial iluminada usada como referencia visual para postes metalicos no Para",
        commercialContext:
            "O Para tem demanda relevante em areas industriais, patios, acessos, loteamentos, condominios, estacionamentos e obras externas. A pagina organiza os dados de compra para uma cotacao tecnica sem prometer presenca local artificial.",
        prioritySegments: [
            "areas industriais e patios operacionais",
            "loteamentos e vias internas",
            "condominios e estacionamentos",
            "acessos comerciais e institucionais",
            "pracas e areas externas",
            "compras com memoriais e listas tecnicas",
        ],
        logisticsNotes: [
            "Frete, prazo e embalagem dependem de cidade de entrega, volume, altura, acabamento e condicao de descarga.",
            "A origem fabril em Goiania comprova producao propria; o atendimento para o Para segue fluxo comercial nacional.",
            "Memorial, desenho, fotos e quantidade por modelo ajudam a avaliar poste reto, teleconico, curvo, flangeado ou engastado.",
        ],
        galleryKeys: [
            "areaIndustrialIluminadaPostes",
            "estacionamentoIndustrialPostesRetos",
            "patioAeroportoIluminadoPostes",
            "postesRetosIluminacaoExterna",
        ],
    },
    matoGrosso: {
        uf: "MT",
        stateName: "Mato Grosso",
        stateSlug: "mato-grosso",
        regionName: "Centro-Oeste",
        path: "/postes-metalicos-mato-grosso",
        title: "Postes Metalicos no Mato Grosso | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Mato Grosso com origem fabril em Goiania, atendimento nacional e orcamento tecnico por modelo, altura, fixacao e acabamento.",
        heroImageKey: "estacionamentoIndustrialPostesRetos",
        heroAlt: "Area externa industrial com postes retos usada como referencia visual para postes metalicos no Mato Grosso",
        commercialContext:
            "Mato Grosso combina demanda de areas industriais, patios, acessos, condominios, loteamentos e estacionamentos. A pagina ajuda compradores tecnicos a enviar um briefing completo para proposta comercial.",
        prioritySegments: [
            "patios industriais e logisticos",
            "loteamentos e vias internas",
            "condominios e areas comuns",
            "estacionamentos e acessos",
            "areas rurais operacionais e externas",
            "projetos por etapa de obra",
        ],
        logisticsNotes: [
            "A cidade de entrega, quantidade, altura e acabamento influenciam frete, rota e prazo comercial.",
            "A B&B nao publica prazo fixo para Mato Grosso sem avaliar volume e cronograma da obra.",
            "Enviar lista de postes, aplicacao e fixacao desejada reduz retrabalho na comparacao entre modelos.",
        ],
        galleryKeys: [
            "estacionamentoIndustrialPostesRetos",
            "postesRetosIluminacaoExterna",
            "viaPublicaPostesRetosDoisLados",
            "posteRetoAvenidaDia",
        ],
    },
    matoGrossoDoSul: {
        uf: "MS",
        stateName: "Mato Grosso do Sul",
        stateSlug: "mato-grosso-do-sul",
        regionName: "Centro-Oeste",
        path: "/postes-metalicos-mato-grosso-do-sul",
        title: "Postes Metalicos no Mato Grosso do Sul | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Mato Grosso do Sul com fabricacao em Goiania, atendimento nacional e cotacao por aplicacao, quantidade, fixacao e acabamento.",
        heroImageKey: "viaUrbanaIluminadaAvenida",
        heroAlt: "Avenida urbana iluminada usada como referencia visual para postes metalicos no Mato Grosso do Sul",
        commercialContext:
            "Mato Grosso do Sul demanda postes metalicos para loteamentos, condominios, industrias, vias internas, estacionamentos e areas externas. A pagina organiza a compra por especificacao, logistica e dados de entrega.",
        prioritySegments: [
            "loteamentos e acessos urbanos",
            "condominios e estacionamentos",
            "areas industriais e operacionais",
            "vias internas e avenidas",
            "pracas e areas institucionais",
            "compras com desenho ou memorial",
        ],
        logisticsNotes: [
            "Frete e prazo sao confirmados conforme cidade de entrega, volume, acabamento, rota e cronograma comercial.",
            "A fabricacao em Goiania funciona como prova operacional para atendimento nacional, sem limitar o mercado a Goias.",
            "Fotos, plantas, memoriais e altura desejada ajudam a definir modelo, fixacao, acabamento e quantidade por etapa.",
        ],
        galleryKeys: [
            "viaUrbanaIluminadaAvenida",
            "condominioEstacionamentoPosteMetalico",
            "estacionamentoExternoPostesMetalicos",
            "viaIluminadaPosteTeleconicoReto",
        ],
    },
    goias: {
        uf: "GO",
        stateName: "Goias",
        stateSlug: "goias",
        regionName: "Centro-Oeste",
        path: "/postes-metalicos-goias",
        title: "Postes Metalicos em Goias | Atendimento B&B",
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
        title: "Postes Metalicos no Distrito Federal | Atendimento B&B",
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
    tocantins: {
        uf: "TO",
        stateName: "Tocantins",
        stateSlug: "tocantins",
        regionName: "Norte",
        path: "/postes-metalicos-tocantins",
        title: "Postes Metalicos no Tocantins | Atendimento B&B",
        description:
            "Postes metalicos para projetos no Tocantins com fabricacao em Goiania, atendimento nacional e cotacao por aplicacao, cidade de entrega, volume e acabamento.",
        heroImageKey: "viaPublicaPostesRetosDoisLados",
        heroAlt: "Via publica com postes metalicos usada como referencia visual para projetos no Tocantins",
        commercialContext:
            "Tocantins combina demanda de loteamentos, vias internas, areas comerciais, condominios, patios e obras publicas. A pagina orienta compradores a enviar dados suficientes para proposta tecnica e logistica.",
        prioritySegments: [
            "loteamentos e ruas internas",
            "areas comerciais e acessos",
            "condominios e estacionamentos",
            "patios industriais e operacionais",
            "pracas e vias urbanas",
            "compras por projeto ou memorial",
        ],
        logisticsNotes: [
            "Frete, embalagem, descarga e prazo sao avaliados conforme cidade de entrega, volume e acabamento.",
            "A origem fabril em Goiania serve como prova de producao propria para atendimento nacional, inclusive Tocantins.",
            "Enviar memorial, quantidade por modelo, altura, fixacao e fotos da area acelera a cotacao.",
        ],
        galleryKeys: [
            "viaPublicaPostesRetosDoisLados",
            "areaIndustrialIluminadaPostes",
            "viaUrbanaIluminadaAvenida",
            "posteRetoAvenidaDia",
        ],
    },
} as const satisfies Record<string, RegionalUfPageData>

export const regionalUfPageList = Object.values(regionalUfPages)
