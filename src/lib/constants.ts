export interface Product {
    id: string
    name: string
    category: string
    model: string
    image: string
    description: string
    specs?: string[]
    applications?: string[]
    datasheet?: string
    leadTime?: string
    badges?: string[]
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
        title: "Postes Metálicos",
        slug: "postes-metalicos",
        image: "https://picsum.photos/seed/poste/1200/800",
        description: "Postes telecônicos, curvos e retos com galvanização a fogo.",
        featured: true
    },
    {
        title: "Braços e Suportes",
        slug: "bracos-suportes",
        image: "https://picsum.photos/seed/braco/1200/800",
        description: "Suportes robustos para fixação de luminárias e refletores.",
        featured: true
    },
    {
        title: "Linha Garden",
        slug: "garden",
        image: "https://picsum.photos/seed/garden/1200/800",
        description: "Iluminação decorativa e funcional para áreas externas e jardins.",
        featured: true
    },
    {
        title: "Linha Sport",
        slug: "sport",
        image: "https://picsum.photos/seed/sport/1200/800",
        description: "Estruturas de alta performance para quadras e arenas esportivas.",
        featured: true
    },
    {
        title: "Linha Agro",
        slug: "agro",
        image: "https://picsum.photos/seed/agro/1200/800",
        description: "Soluções em iluminação para agronegócio e áreas rurais.",
        featured: true
    },
    {
        title: "Pintura Eletrostática",
        slug: "pintura-eletrostatica",
        image: "https://picsum.photos/seed/pintura/1200/800",
        description: "Serviço de pintura eletrostática a pó com alta resistência e acabamento premium.",
        featured: true
    },
    {
        title: "Postes Decorativos",
        slug: "postes-decorativos",
        image: "https://picsum.photos/seed/decorativo/1200/800",
        description: "Linha exclusiva de postes decorativos para valorização de patrimônios e praças.",
        featured: true
    },
    {
        title: "Luminárias e Refletores",
        slug: "luminarias-refletores",
        image: "https://picsum.photos/seed/luminaria/1200/800",
        description: "Luminárias LED e refletores de alta potência para máxima eficiência luminosa.",
        featured: true
    },
    {
        title: "Mastros para Bandeiras",
        slug: "mastros-para-bandeiras",
        image: "https://picsum.photos/seed/mastro/1200/800",
        description: "Mastros metálicos telecônicos para bandeiras, seguindo padrões oficiais.",
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
        image: "/portfolio/pracas-centralina.png",
    },
    {
        title: "Praça do Lago",
        category: "Público e Praças",
        location: "Araporã, MG",
        image: "/portfolio/praca-lago.png",
    },
    {
        title: "Quadras de Esportes",
        category: "Esportivo",
        location: "Araporã, GO",
        image: "/portfolio/quadras-arapora.png",
    },
    {
        title: "Burger King",
        category: "Comercial / Fast Food",
        location: "Rio Verde, GO",
        image: "/portfolio/burger-king-rv.png",
    },
    {
        title: "Centro de Esportes UFG",
        category: "Esportivo / Público",
        location: "Goiânia, GO",
        image: "/portfolio/centro-esportes-ufg.png",
    },
    {
        title: "Portal do Sol Mendanha",
        category: "Condomínio Residencial",
        location: "Goiânia, GO",
        image: "/portfolio/portal-do-sol.png",
    },
    {
        title: "Maternidade Célia Câmara",
        category: "Saúde e Hospitalar",
        location: "Goiânia, GO",
        image: "/portfolio/maternidade-celia.png",
    },
    {
        title: "Sistema FIEAC SENAI",
        category: "Educação / Institucional",
        location: "Rio Branco, AC",
        image: "/portfolio/senai-ac.png",
    },
    {
        title: "Reserva do Parque",
        category: "Condomínio Residencial",
        location: "Rio Verde, GO",
        image: "/portfolio/reserva-parque.png",
    },
]
