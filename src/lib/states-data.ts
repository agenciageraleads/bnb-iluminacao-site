// Dados estáticos dos estados brasileiros para LPs regionais
export interface FaqItem {
  question: string
  answer: string
}

export interface StateData {
  slug: string
  name: string
  uf: string
  capital: string
  region: string
  estimatedDelivery: string
  metaDescription: string
  faq: FaqItem[]
}

// FAQ padrão adaptável por região
const faqSudeste: FaqItem[] = [
  { question: "Qual o prazo de entrega para o Sudeste?", answer: "Os postes são fabricados sob encomenda: fabricação de 10 a 20 dias úteis + transporte informado na proposta." },
  { question: "Vocês atendem licitações públicas?", answer: "Sim. Nossos produtos seguem rigorosamente as normas NBR 14744 e NBR 6323, atendendo todas as exigências de editais públicos." },
  { question: "É possível visitar a fábrica?", answer: "Claro! Nossa fábrica fica em Goiânia-GO e recebemos visitas técnicas de clientes de todo o Brasil com agendamento prévio." },
]

const faqSul: FaqItem[] = [
  { question: "Qual o prazo de entrega para o Sul?", answer: "Os postes são fabricados sob encomenda: fabricação de 10 a 20 dias úteis + transporte informado na proposta." },
  { question: "Os postes resistem ao frio intenso do Sul?", answer: "Sim. O aço galvanizado a fogo garante resistência extrema a variações térmicas, geada e umidade intensa, comuns na região Sul." },
  { question: "Vocês atendem licitações públicas?", answer: "Sim. Nossos produtos seguem as normas NBR 14744 e NBR 6323, ideais para editais públicos municipais e estaduais." },
]

const faqNordeste: FaqItem[] = [
  { question: "Qual o prazo de entrega para o Nordeste?", answer: "Os postes são fabricados sob encomenda: fabricação de 10 a 20 dias úteis + transporte informado na proposta." },
  { question: "Os postes resistem à maresia?", answer: "Absolutamente. A galvanização a fogo conforme NBR 6323 cria uma camada protetora que resiste à corrosão por maresia, ideal para cidades litorâneas." },
  { question: "Vocês enviam para cidades do interior?", answer: "Sim! Atendemos todas as cidades do Brasil, capitais e interior, com logística própria e parceiros de transporte." },
]

const faqNorte: FaqItem[] = [
  { question: "Qual o prazo de entrega para o Norte?", answer: "Os postes são fabricados sob encomenda: fabricação de 10 a 20 dias úteis + transporte informado na proposta." },
  { question: "Os postes resistem ao clima tropical úmido?", answer: "Sim. A galvanização a fogo e a pintura eletrostática garantem proteção contra umidade extrema, chuvas intensas e calor tropical." },
  { question: "Vocês fazem projetos para áreas rurais e ribeirinhas?", answer: "Sim! Temos experiência em projetos de iluminação para áreas rurais, agronegócio e comunidades ribeirinhas em toda a região Norte." },
]

const faqCentroOeste: FaqItem[] = [
  { question: "Qual o prazo de entrega para o Centro-Oeste?", answer: "Os postes são fabricados sob encomenda: fabricação de 10 a 20 dias úteis + transporte informado na proposta." },
  { question: "Vocês atendem o agronegócio?", answer: "Sim! Temos a Linha Agro, desenvolvida especialmente para iluminação de propriedades rurais, silos, armazéns e confinamentos." },
  { question: "Posso retirar na fábrica?", answer: "Sim! Clientes do Centro-Oeste podem retirar diretamente em nossa fábrica em Goiânia, economizando no frete." },
]

export const statesData: StateData[] = [
  // CENTRO-OESTE
  {
    slug: "goias", name: "Goiás", uf: "GO", capital: "Goiânia", region: "Centro-Oeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes metálicos em Goiás. Direto da fábrica em Goiânia com entrega expressa para todo o estado.",
    faq: faqCentroOeste,
  },
  {
    slug: "distrito-federal", name: "Distrito Federal", uf: "DF", capital: "Brasília", region: "Centro-Oeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos certificados para Brasília e região. Atendemos licitações federais com entrega ágil.",
    faq: faqCentroOeste,
  },
  {
    slug: "mato-grosso", name: "Mato Grosso", uf: "MT", capital: "Cuiabá", region: "Centro-Oeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Mato Grosso. Linha Agro e iluminação industrial para o coração do agronegócio.",
    faq: faqCentroOeste,
  },
  {
    slug: "mato-grosso-do-sul", name: "Mato Grosso do Sul", uf: "MS", capital: "Campo Grande", region: "Centro-Oeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes metálicos para Mato Grosso do Sul. Iluminação pública e industrial com entrega em todo o estado.",
    faq: faqCentroOeste,
  },
  // SUDESTE
  {
    slug: "sao-paulo", name: "São Paulo", uf: "SP", capital: "São Paulo", region: "Sudeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos certificados para São Paulo. Atendemos construtoras, prefeituras e indústrias com entrega ágil.",
    faq: faqSudeste,
  },
  {
    slug: "minas-gerais", name: "Minas Gerais", uf: "MG", capital: "Belo Horizonte", region: "Sudeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes para Minas Gerais. Estruturas galvanizadas com entrega rápida para BH e interior.",
    faq: faqSudeste,
  },
  {
    slug: "rio-de-janeiro", name: "Rio de Janeiro", uf: "RJ", capital: "Rio de Janeiro", region: "Sudeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Rio de Janeiro. Galvanização a fogo resistente à maresia litorânea.",
    faq: faqSudeste,
  },
  {
    slug: "espirito-santo", name: "Espírito Santo", uf: "ES", capital: "Vitória", region: "Sudeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Espírito Santo. Estruturas com proteção anticorrosiva para clima litorâneo.",
    faq: faqSudeste,
  },
  // SUL
  {
    slug: "parana", name: "Paraná", uf: "PR", capital: "Curitiba", region: "Sul",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes metálicos para Paraná. Estruturas resistentes ao frio e geada com certificação ABNT.",
    faq: faqSul,
  },
  {
    slug: "santa-catarina", name: "Santa Catarina", uf: "SC", capital: "Florianópolis", region: "Sul",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Santa Catarina. Galvanização premium contra maresia e variações climáticas.",
    faq: faqSul,
  },
  {
    slug: "rio-grande-do-sul", name: "Rio Grande do Sul", uf: "RS", capital: "Porto Alegre", region: "Sul",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Rio Grande do Sul. Engenharia de alta performance para o clima mais rigoroso do Brasil.",
    faq: faqSul,
  },
  // NORDESTE
  {
    slug: "bahia", name: "Bahia", uf: "BA", capital: "Salvador", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Bahia. Estruturas galvanizadas com proteção contra maresia para todo o estado.",
    faq: faqNordeste,
  },
  {
    slug: "pernambuco", name: "Pernambuco", uf: "PE", capital: "Recife", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes para Pernambuco. Iluminação pública e industrial com entrega em Recife e interior.",
    faq: faqNordeste,
  },
  {
    slug: "ceara", name: "Ceará", uf: "CE", capital: "Fortaleza", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Ceará. Proteção anticorrosiva premium para o clima litorâneo nordestino.",
    faq: faqNordeste,
  },
  {
    slug: "maranhao", name: "Maranhão", uf: "MA", capital: "São Luís", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Maranhão. Entrega em São Luís e interior com qualidade certificada ABNT.",
    faq: faqNordeste,
  },
  {
    slug: "paraiba", name: "Paraíba", uf: "PB", capital: "João Pessoa", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes para Paraíba. Soluções em iluminação pública para João Pessoa e cidades do interior.",
    faq: faqNordeste,
  },
  {
    slug: "rio-grande-do-norte", name: "Rio Grande do Norte", uf: "RN", capital: "Natal", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Rio Grande do Norte. Estruturas resistentes à maresia com entrega em todo o estado.",
    faq: faqNordeste,
  },
  {
    slug: "alagoas", name: "Alagoas", uf: "AL", capital: "Maceió", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Alagoas. Galvanização a fogo para máxima durabilidade no litoral alagoano.",
    faq: faqNordeste,
  },
  {
    slug: "sergipe", name: "Sergipe", uf: "SE", capital: "Aracaju", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes para Sergipe. Iluminação pública e industrial com entrega ágil em Aracaju.",
    faq: faqNordeste,
  },
  {
    slug: "piaui", name: "Piauí", uf: "PI", capital: "Teresina", region: "Nordeste",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Piauí. Soluções robustas para iluminação pública em Teresina e interior.",
    faq: faqNordeste,
  },
  // NORTE
  {
    slug: "para", name: "Pará", uf: "PA", capital: "Belém", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Pará. Estruturas galvanizadas resistentes ao clima tropical amazônico.",
    faq: faqNorte,
  },
  {
    slug: "amazonas", name: "Amazonas", uf: "AM", capital: "Manaus", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes para Amazonas. Entrega em Manaus e região com logística especializada.",
    faq: faqNorte,
  },
  {
    slug: "tocantins", name: "Tocantins", uf: "TO", capital: "Palmas", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Tocantins. Entrega rápida de Goiânia para Palmas e cidades do interior.",
    faq: faqNorte,
  },
  {
    slug: "rondonia", name: "Rondônia", uf: "RO", capital: "Porto Velho", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Rondônia. Iluminação para áreas urbanas e rurais de Porto Velho e interior.",
    faq: faqNorte,
  },
  {
    slug: "acre", name: "Acre", uf: "AC", capital: "Rio Branco", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Fabricante de postes para Acre. Cases de sucesso com SENAI/FIEAC em Rio Branco.",
    faq: faqNorte,
  },
  {
    slug: "roraima", name: "Roraima", uf: "RR", capital: "Boa Vista", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes metálicos para Roraima. Entrega em Boa Vista com logística especializada para região Norte.",
    faq: faqNorte,
  },
  {
    slug: "amapa", name: "Amapá", uf: "AP", capital: "Macapá", region: "Norte",
    estimatedDelivery: "Fabricação de 10 a 20 dias úteis + transporte informado na proposta.",
    metaDescription: "Postes e mastros para Amapá. Estruturas resistentes ao clima equatorial com entrega em Macapá.",
    faq: faqNorte,
  },
]

// Helper: buscar dados de um estado pelo slug
export const getStateBySlug = (slug: string): StateData | undefined => {
  return statesData.find(s => s.slug === slug)
}

// Helper: gerar todos os slugs (para generateStaticParams)
export const getAllStateSlugs = (): string[] => {
  return statesData.map(s => s.slug)
}
