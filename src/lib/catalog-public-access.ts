import type { Access, Where } from 'payload'
import { officialOrnaSlugs, eosHubSlug } from './catalog-curation'

export const publicProductWhere: Where = {
    and: [
        { lifecycle: { equals: 'active' } },
        { 'category.slug': { in: ['urban', 'orna', 'versa', 'forza', 'vigia', 'nexo', 'civis', 'linha-urban', 'linha-orna', 'linha-versa', 'linha-forza', 'linha-vigia', 'linha-nexo', 'linha-civis'] } },
        { slug: { not_equals: eosHubSlug } },
        { or: [{ 'category.slug': { not_in: ['orna', 'linha-orna'] } }, { slug: { in: officialOrnaSlugs } }] },
    ],
}

export const readPublicProducts: Access = ({ req }) => {
    if (req.user) return true
    // Once CRM is authoritative, consumers use /api/catalog/v1, never stale CMS records.
    if (process.env.CATALOG_SOURCE === 'crm') return false
    return publicProductWhere
}
