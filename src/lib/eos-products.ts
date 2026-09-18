import type { Product } from './constants'

// Source: official commercial guide, assets/versa/eos-simples.png and eos-duplo.png.
export const eosProducts: Product[] = [
    { id: 'poste-ornamental-eos-simples', name: 'Éos Simples', model: 'BB-VRS-ESXX', image: '/images/catalogo/eos-simples.png', description: 'Éos Simples: um globo difusor no topo para iluminação ornamental de jardins e calçadões. Alturas de 2 a 3 m; demais alturas sob projeto.', specs: ['1 globo incluso', 'Alturas de 2 a 3 m; demais sob projeto', 'Fixação engastada ou flangeada'], applications: ['Jardins', 'Calçadões'] },
    { id: 'poste-ornamental-eos-duplo', name: 'Éos Duplo', model: 'BB-VRS-EDXX', image: '/images/catalogo/eos-duplo.png', description: 'Éos Duplo: dois globos em travessa para iluminação ornamental de praças e acessos. Alturas de 2 a 3 m; demais alturas sob projeto.', specs: ['2 globos inclusos', 'Alturas de 2 a 3 m; demais sob projeto', 'Fixação engastada ou flangeada'], applications: ['Praças', 'Acessos'] },
].map(product => ({ ...product, category: 'versa', lifecycle: 'active', badges: [], optionals: [] }))
