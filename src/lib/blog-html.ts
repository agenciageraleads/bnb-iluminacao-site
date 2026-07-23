import sanitizeHtml from 'sanitize-html'

const BLOG_HTML_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        'p', 'br', 'h2', 'h3', 'h4', 'strong', 'em', 'blockquote',
        'ul', 'ol', 'li', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'figure', 'figcaption', 'img', 'code', 'pre', 'hr',
    ],
    allowedAttributes: {
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
        th: ['scope', 'colspan', 'rowspan'],
        td: ['colspan', 'rowspan'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    transformTags: {
        a: (_tagName, attribs) => ({
            tagName: 'a',
            attribs: attribs.target === '_blank'
                ? { ...attribs, rel: 'noopener noreferrer' }
                : attribs,
        }),
    },
}

export function sanitizeBlogHtml(value: unknown): string {
    if (typeof value !== 'string') return ''
    return sanitizeHtml(value, BLOG_HTML_OPTIONS)
}

export function serializeJsonLd(value: unknown): string {
    return JSON.stringify(value)
        .replace(/</g, '\\u003c')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
}
