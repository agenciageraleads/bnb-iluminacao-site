import { CollectionConfig } from 'payload'

const Blog: CollectionConfig = {
    slug: 'blog',
    admin: {
        useAsTitle: 'title',
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
            name: 'content',
            type: 'richText',
            required: true,
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
        }
    ],
}

export default Blog
