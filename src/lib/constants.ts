export interface Product {
    id: string
    name: string
    category: string
    model: string
    image: string
    gallery?: string[]
    description: string
    specs?: string[]
    applications?: string[]
    datasheet?: string
    leadTime?: string
    badges?: string[]
    optionals?: string[]
}

export interface Category {
    title: string
    slug: string
    image: string
    description: string
    featured?: boolean
}

export const categories: Category[] = [
    {
        title: "Linha Urban",
        slug: "linha-urban",
        image: "/images/categorias/urban.jpg",
        description: "Postes telecônicos circulares para iluminação pública e industrial.",
        featured: true
    },
    {
        title: "Linha Versa",
        slug: "linha-versa",
        image: "/images/categorias/versa.jpg",
        description: "Postes decorativos que unem design moderno e eficiência luminosa.",
        featured: true
    },
    {
        title: "Linha Forza",
        slug: "linha-forza",
        image: "/images/categorias/forza.jpg",
        description: "Postes especiais para grandes alturas e projetos de alta complexidade.",
        featured: true
    },
    {
        title: "Linha Civis",
        slug: "linha-civis",
        image: "/images/categorias/civis.jpg",
        description: "Mastros metálicos telecônicos para bandeiras seguindo padrões oficiais.",
        featured: true
    },
    {
        title: "Linha Vigia",
        slug: "linha-vigia",
        image: "/images/categorias/vigia.jpg",
        description: "Postes exclusivos para sistemas de vídeo monitoramento e segurança.",
        featured: true
    },
    {
        title: "Linha Nexo",
        slug: "linha-nexo",
        image: "/images/categorias/nexo.jpg",
        description: "Braços, suportes e acessórios metálicos de alta resistência.",
        featured: true
    },
    {
        title: "Linha Orna",
        slug: "linha-orna",
        image: "/images/categorias/orna.jpg",
        description: "Postes ornamentais para valorização de áreas históricas e urbanas.",
        featured: true
    }
]

// Dados estáticos que ainda não foram para o CMS (Benefícios e Clientes)
export const benefits = [
    {
        title: "MÁXIMA DURABILIDADE",
        description: "Postes galvanizados a fogo conforme NBR 6323, garantindo resistência extrema contra corrosão em qualquer ambiente.",
    },
    {
        title: "EFICIÊNCIA ENERGÉTICA",
        description: "Projetados para integração perfeita com luminárias LED de alta performance, otimizando o consumo de energia.",
    },
    {
        title: "CERTIFICAÇÃO TOTAL",
        description: "Atendimento rigoroso às normas ABNT e certificações exigidas para licitações e grandes projetos industriais.",
    },
    {
        title: "SUSTENTABILIDADE",
        description: "Aço 100% reciclável e processos de fabricação com baixo impacto ambiental, alinhados às práticas ESG.",
    },
]

export const clients = [
    { name: "Transol", logoUrl: "/logos/transol.png" },
    { name: "Ajel", logoUrl: "/logos/ajel.png" },
    { name: "Dolp", logoUrl: "/logos/dolp.png" },
    { name: "Porto Belo", logoUrl: "/logos/porto_belo.png" },
    { name: "Makro Service", logoUrl: "/logos/makro_service.png" },
    { name: "TSE", logoUrl: "/logos/tse.png" },
    { name: "Zagonel", logoUrl: "/logos/zagonel.png" },
    { name: "Leroy Merlin", logoUrl: "/logos/leroy_merlin.png" },
    { name: "Controle & Serviços", logoUrl: "/logos/controle_servicos.png" },
]

export const portfolioItems = [
    {
        title: "Praças Municipais",
        category: "Público e Praças",
        location: "Centralina, MG",
        image: "/portfolio/pracas-centralina.webp",
    },
    {
        title: "Praça do Lago",
        category: "Público e Praças",
        location: "Araporã, MG",
        image: "/portfolio/praca-lago.webp",
    },
    {
        title: "Quadras de Esportes",
        category: "Esportivo",
        location: "Araporã, GO",
        image: "/portfolio/quadras-arapora.webp",
    },
    {
        title: "Burger King",
        category: "Comercial / Fast Food",
        location: "Rio Verde, GO",
        image: "/portfolio/burger-king-rv.webp",
    },
    {
        title: "Centro de Esportes UFG",
        category: "Esportivo / Público",
        location: "Goiânia, GO",
        image: "/portfolio/centro-esportes-ufg.webp",
    },
    {
        title: "Portal do Sol Mendanha",
        category: "Condomínio Residencial",
        location: "Goiânia, GO",
        image: "/portfolio/portal-do-sol.webp",
    },
    {
        title: "Maternidade Célia Câmara",
        category: "Saúde e Hospitalar",
        location: "Goiânia, GO",
        image: "/portfolio/maternidade-celia.webp",
    },
    {
        title: "Sistema FIEAC SENAI",
        category: "Educação / Institucional",
        location: "Rio Branco, AC",
        image: "/portfolio/senai-ac.webp",
    },
    {
        title: "Reserva do Parque",
        category: "Condomínio Residencial",
        location: "Rio Verde, GO",
        image: "/portfolio/reserva-parque.webp",
    },
]

export const catalogs: Catalog[] = [
    {
        id: "catalogo-geral-bb",
        title: "Catálogo Geral B&B Iluminação",
        description: "Especificações completas de postes telecônicos, decorativos e braços metálicos com padrão de engenharia.",
        thumbnail: "/portfolio/reserva-parque.webp", 
        fileUrl: "/downloads/catalogo-bb-iluminacao.pdf",
        category: "Postes e Estruturas"
    }
]
