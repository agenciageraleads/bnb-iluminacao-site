/**
 * Dados das cidades prioritárias para SEO Local (Geo-Targeting)
 */

export interface CityData {
  slug: string;
  name: string;
  uf: string;
  region: string;
  deliveryTime: string;
  description: string;
  isMainBase?: boolean;
}

export const citiesData: CityData[] = [
  // GOIÁS (Região Metropolitana e Principais)
  {
    slug: "goiania",
    name: "Goiânia",
    uf: "GO",
    region: "Centro-Oeste",
    deliveryTime: "3 a 5 dias úteis",
    description: "Sediada em Goiânia, a B&B Iluminação é referência na fabricação de postes metálicos para construtoras, condomínios e indústrias em toda a capital.",
    isMainBase: true,
  },
  {
    slug: "aparecida-de-goiania",
    name: "Aparecida de Goiânia",
    uf: "GO",
    region: "Centro-Oeste",
    deliveryTime: "3 a 5 dias úteis",
    description: "Atendemos o polo industrial de Aparecida de Goiânia com postes metálicos de alta resistência e entrega rápida.",
  },
  {
    slug: "anapolis",
    name: "Anápolis",
    uf: "GO",
    region: "Centro-Oeste",
    deliveryTime: "5 a 7 dias úteis",
    description: "Soluções em iluminação industrial e postes metálicos certificados para o polo logístico de Anápolis.",
  },
  {
    slug: "senador-canedo",
    name: "Senador Canedo",
    uf: "GO",
    region: "Centro-Oeste",
    deliveryTime: "5 a 7 dias úteis",
    description: "Postes metálicos robustos para loteamentos e indústrias em Senador Canedo.",
  },
  {
    slug: "trindade",
    name: "Trindade",
    uf: "GO",
    region: "Centro-Oeste",
    deliveryTime: "5 a 7 dias úteis",
    description: "Fornecimento de postes e mastros para projetos urbanos e comerciais em Trindade.",
  },
  {
    slug: "rio-verde",
    name: "Rio Verde",
    uf: "GO",
    region: "Centro-Oeste",
    deliveryTime: "7 a 10 dias úteis",
    description: "Atendemos o agronegócio de Rio Verde com postes galvanizados a fogo de alta durabilidade.",
  },

  // DISTRITO FEDERAL
  {
    slug: "brasilia",
    name: "Brasília",
    uf: "DF",
    region: "Centro-Oeste",
    deliveryTime: "5 a 8 dias úteis",
    description: "Postes metálicos dentro das normas da ABNT para Brasília e região administrativa. Atendimento especializado para licitações e obras públicas.",
  },

  // CAPITAIS E POLOS ESTRATÉGICOS
  {
    slug: "sao-paulo",
    name: "São Paulo",
    uf: "SP",
    region: "Sudeste",
    deliveryTime: "7 a 12 dias úteis",
    description: "Fabricamos e entregamos postes metálicos em São Paulo para grandes construtoras e empreendimentos logísticos.",
  },
  {
    slug: "belo-horizonte",
    name: "Belo Horizonte",
    uf: "MG",
    region: "Sudeste",
    deliveryTime: "7 a 10 dias úteis",
    description: "Postes metálicos certificados para Belo Horizonte e região metropolitana. Qualidade industrial direto da fábrica.",
  },
  {
    slug: "cuiaba",
    name: "Cuiabá",
    uf: "MT",
    region: "Centro-Oeste",
    deliveryTime: "7 a 10 dias úteis",
    description: "Liderança em postes metálicos para Cuiabá. Estruturas resistentes para iluminação pública e privada.",
  },
  {
    slug: "palmas",
    name: "Palmas",
    uf: "TO",
    region: "Norte",
    deliveryTime: "7 a 10 dias úteis",
    description: "Entrega ágil de postes metálicos para Palmas. Soluções ideais para o clima da região Norte.",
  }
];

export const getCityBySlug = (slug: string) => citiesData.find(c => c.slug === slug);
export const getAllCitySlugs = () => citiesData.map(c => c.slug);
