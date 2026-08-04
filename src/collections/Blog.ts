import { CollectionConfig } from 'payload'

const Blog: CollectionConfig = {
    slug: 'blog',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeChange: [
            ({ data, originalDoc, req }) => {
                // Gate draft -> ai_review -> published: só grava reviewedBy/reviewedAt quando um
                // humano autenticado (Payload Admin) promove o post para 'published'. O motor de
                // agentes nunca chama este hook com status 'published' diretamente.
                if (data?.status === 'published' && originalDoc?.status !== 'published') {
                    data.qualityAudit = {
                        ...(data.qualityAudit ?? originalDoc?.qualityAudit ?? {}),
                        reviewedBy: req?.user?.email ?? req?.user?.id ?? 'desconhecido',
                        reviewedAt: new Date().toISOString(),
                    }
                }
                return data
            },
        ],
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Rascunho AI', value: 'draft' },
                { label: 'Em Revisão AI (Fact-Checking)', value: 'ai_review' },
                { label: 'Publicado', value: 'published' }
            ],
            defaultValue: 'draft',
            admin: {
                position: 'sidebar',
                description: 'Status controlado pelo pipeline de agentes.'
            }
        },
        {
            name: 'author',
            type: 'text',
            defaultValue: 'Eng. Lucas Borges',
            admin: {
                position: 'sidebar',
                description: 'Atrelado ao Person Schema para máxima autoridade (E-E-A-T).'
            }
        },
        {
            name: 'summary',
            type: 'textarea',
            label: 'Executive Summary / TL;DR',
            admin: {
                description: 'Resumo crítico de 50 palavras otimizado para motores de IA.',
            }
        },
        {
            name: 'bodyHtml',
            type: 'textarea',
            label: 'Conteúdo IA (HTML)',
            admin: {
                description: 'Corpo do artigo gerado automaticamente com tags HTML e Tabelas.',
            }
        },
        {
            name: 'content',
            type: 'richText',
            required: false, // Permitir que o motor use apenas bodyHtml se preferir
        },
        {
            name: 'faqs',
            type: 'array',
            label: 'Seção FAQ Otimizada (GEO)',
            fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true }
            ]
        },
        {
            name: 'cta',
            type: 'group',
            label: 'Call to Action',
            admin: {
                description: 'CTA obrigatório do gate de qualidade — deve apontar para produto/case/datasheet/orçamento (caminho interno).',
            },
            fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text' },
            ],
        },
        {
            name: 'sources',
            type: 'array',
            label: 'Fontes / Normas',
            admin: {
                description: 'Fontes aprovadas que sustentam qualquer afirmação normativa (NBR) citada no corpo do artigo.',
            },
            fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
            ],
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'meta',
            type: 'group',
            fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
            ],
        },
        {
            name: 'schemaMarkup',
            type: 'group',
            label: 'Dados Estruturados',
            admin: { position: 'sidebar' },
            fields: [
                { name: 'articleSchema', type: 'json' },
                { name: 'faqSchema', type: 'json' }
            ]
        },
        {
            name: 'qualityAudit',
            type: 'group',
            label: 'Auditoria do Gate de Qualidade',
            admin: {
                position: 'sidebar',
                description: 'Trilha de auditoria do pipeline de agentes: prompt, modelo e veredicto de cada etapa.',
                readOnly: true,
            },
            fields: [
                { name: 'model', type: 'text' },
                { name: 'revisorPrompt', type: 'textarea' },
                { name: 'revisorVeredicto', type: 'json' },
                { name: 'qualityGateErrors', type: 'json' },
                { name: 'reviewedBy', type: 'text' },
                { name: 'reviewedAt', type: 'date' },
            ],
        }
    ],
}

export default Blog
