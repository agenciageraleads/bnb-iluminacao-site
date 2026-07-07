import { CollectionConfig } from 'payload'

const Representatives: CollectionConfig = {
    slug: 'representatives',
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['displayOrder', 'name', 'company', 'states'],
    },
    fields: [
        {
            name: 'crmUserId',
            type: 'text',
            required: false,
            unique: true,
            label: 'ID do usuário no CRM',
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Usado para sincronização automática do onboarding do CRM.',
            },
        },
        {
            name: 'displayOrder',
            type: 'number',
            defaultValue: 999,
            label: 'Posição no site',
            admin: {
                description: 'Menor número aparece primeiro. Use intervalos como 10, 20 e 30 para facilitar ajustes futuros.',
            },
        },
        {
            name: 'name',
            type: 'text',
            required: true,
            label: 'Nome do Representante',
        },
        {
            name: 'company',
            type: 'text',
            required: false,
            label: 'Empresa / Nome Comercial',
        },
        {
            name: 'email',
            type: 'email',
            required: true,
            label: 'E-mail Comercial',
        },
        {
            name: 'phone',
            type: 'text',
            required: true,
            label: 'Telefone / WhatsApp',
        },
        {
            name: 'states',
            type: 'select',
            hasMany: true,
            required: true,
            label: 'Estados de Atuação (UFs)',
            options: [
                { label: 'Acre (AC)', value: 'AC' },
                { label: 'Alagoas (AL)', value: 'AL' },
                { label: 'Amapá (AP)', value: 'AP' },
                { label: 'Amazonas (AM)', value: 'AM' },
                { label: 'Bahia (BA)', value: 'BA' },
                { label: 'Ceará (CE)', value: 'CE' },
                { label: 'Distrito Federal (DF)', value: 'DF' },
                { label: 'Espírito Santo (ES)', value: 'ES' },
                { label: 'Goiás (GO)', value: 'GO' },
                { label: 'Maranhão (MA)', value: 'MA' },
                { label: 'Mato Grosso (MT)', value: 'MT' },
                { label: 'Mato Grosso do Sul (MS)', value: 'MS' },
                { label: 'Minas Gerais (MG)', value: 'MG' },
                { label: 'Pará (PA)', value: 'PA' },
                { label: 'Paraíba (PB)', value: 'PB' },
                { label: 'Paraná (PR)', value: 'PR' },
                { label: 'Pernambuco (PE)', value: 'PE' },
                { label: 'Piauí (PI)', value: 'PI' },
                { label: 'Rio de Janeiro (RJ)', value: 'RJ' },
                { label: 'Rio Grande do Norte (RN)', value: 'RN' },
                { label: 'Rio Grande do Sul (RS)', value: 'RS' },
                { label: 'Rondônia (RO)', value: 'RO' },
                { label: 'Roraima (RR)', value: 'RR' },
                { label: 'Santa Catarina (SC)', value: 'SC' },
                { label: 'São Paulo (SP)', value: 'SP' },
                { label: 'Sergipe (SE)', value: 'SE' },
                { label: 'Tocantins (TO)', value: 'TO' },
            ],
            admin: {
                description: 'Selecione todas as UFs que este representante tem exclusividade ou atende.',
            }
        },
        {
            name: 'region',
            type: 'text',
            label: 'Nome da Região (opcional visualização)',
            admin: {
                description: 'Ex: "Nordeste e Norte", "Sul de Minas". Serve para categorização visual se necessário.',
            }
        },
        {
            name: 'territories',
            type: 'json',
            label: 'Macro-regiões estruturadas',
            admin: {
                description: 'Sincronizado pelo CRM. Mantém UF, macro-região, cidades, DDDs e status de revisão.',
            },
        },
        {
            name: 'markets',
            type: 'select',
            hasMany: true,
            required: false,
            label: 'Canais de Atendimento (Mercados)',
            options: [
                { label: 'Revenda / Lojistas', value: 'revenda' },
                { label: 'Construtoras & Incorporadoras', value: 'construtoras' },
                { label: 'Material de Construção', value: 'material_construcao' },
                { label: 'Consumidor Final', value: 'consumidor_final' },
                { label: 'Atacado / Distribuidor', value: 'atacado_distribuidor' },
                { label: 'Indústria / Corporativo', value: 'industria' },
            ],
            admin: {
                description: 'Selecione todos os canais/mercados atendidos por este representante.',
            }
        }
    ],
}

export default Representatives
