import type { Access, CollectionBeforeChangeHook, CollectionBeforeDeleteHook, CollectionConfig, FieldAccess } from 'payload'

type PayloadUser = {
    id: number | string
    role?: 'admin' | 'editor' | null
}

const isAdmin = (user: unknown): user is PayloadUser & { role: 'admin' } =>
    typeof user === 'object' && user !== null && (user as PayloadUser).role === 'admin'

export const canCreateUser: Access = ({ req }) => isAdmin(req.user)

export const canReadOrUpdateUser: Access = ({ req }) => {
    const user = req.user as PayloadUser | null

    if (isAdmin(user)) return true
    if (!user?.id) return false

    return { id: { equals: user.id } }
}

export const canDeleteUser: Access = ({ req }) => isAdmin(req.user)

export const canManageRoles: FieldAccess = ({ req }) => isAdmin(req.user)

const countOtherAdmins = async (req: Parameters<CollectionBeforeDeleteHook>[0]['req'], userId: number | string) => {
    const result = await req.payload.find({
        collection: 'users',
        limit: 1,
        overrideAccess: true,
        req,
        where: {
            and: [
                { role: { equals: 'admin' } },
                { id: { not_equals: userId } },
            ],
        },
    })

    return result.totalDocs
}

export const preserveLastAdminOnUpdate: CollectionBeforeChangeHook = async ({ data, operation, originalDoc, req }) => {
    const isRoleChange = Object.prototype.hasOwnProperty.call(data, 'role')

    if (operation !== 'update' || !isRoleChange || originalDoc?.role !== 'admin' || data.role === 'admin') return data

    if (await countOtherAdmins(req, originalDoc.id) === 0) {
        throw new Error('Não é possível remover a função do último administrador.')
    }

    return data
}

export const preserveLastAdminOnDelete: CollectionBeforeDeleteHook = async ({ id, req }) => {
    const user = await req.payload.findByID({
        collection: 'users',
        id,
        overrideAccess: true,
        req,
    })

    if (user.role === 'admin' && await countOtherAdmins(req, id) === 0) {
        throw new Error('Não é possível excluir o último administrador.')
    }
}

const Users: CollectionConfig = {
    slug: 'users',
    auth: true,
    admin: {
        useAsTitle: 'email',
    },
    access: {
        create: canCreateUser,
        read: canReadOrUpdateUser,
        update: canReadOrUpdateUser,
        delete: canDeleteUser,
    },
    hooks: {
        beforeChange: [preserveLastAdminOnUpdate],
        beforeDelete: [preserveLastAdminOnDelete],
    },
    fields: [
        // Email e Password são adicionados automaticamente pelo 'auth: true'
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
            ],
            defaultValue: 'editor',
            required: true,
            access: {
                create: canManageRoles,
                update: canManageRoles,
            },
        },
    ],
}

export default Users
