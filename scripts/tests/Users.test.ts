import assert from 'node:assert/strict'
import test from 'node:test'

import {
    canCreateUser,
    canDeleteUser,
    canManageRoles,
    canReadOrUpdateUser,
    preserveLastAdminOnDelete,
    preserveLastAdminOnUpdate,
} from '../../src/collections/Users.ts'

const reqFor = (user: unknown = null) => ({ user }) as never

test('only admins can create or delete users and manage roles', async () => {
    const adminReq = reqFor({ id: 1, role: 'admin' })
    const editorReq = reqFor({ id: 2, role: 'editor' })

    assert.equal(await canCreateUser({ req: adminReq } as never), true)
    assert.equal(await canDeleteUser({ req: adminReq } as never), true)
    assert.equal(await canManageRoles({ req: adminReq } as never), true)
    assert.equal(await canCreateUser({ req: editorReq } as never), false)
    assert.equal(await canDeleteUser({ req: editorReq } as never), false)
    assert.equal(await canManageRoles({ req: editorReq } as never), false)
})

test('editors can read and update only their own account', async () => {
    const result = await canReadOrUpdateUser({ req: reqFor({ id: 42, role: 'editor' }) } as never)

    assert.deepEqual(result, { id: { equals: 42 } })
    assert.equal(await canReadOrUpdateUser({ req: reqFor() } as never), false)
    assert.equal(await canReadOrUpdateUser({ req: reqFor({ id: 1, role: 'admin' }) } as never), true)
})

test('last admin cannot be demoted', async () => {
    const req = {
        payload: { find: async () => ({ totalDocs: 0 }) },
    }

    await assert.rejects(
        preserveLastAdminOnUpdate({
            data: { role: 'editor' },
            operation: 'update',
            originalDoc: { id: 1, role: 'admin' },
            req,
        } as never),
        /último administrador/,
    )
})

test('last admin updates name without role and succeeds', async () => {
    const req = {
        payload: {
            find: async () => {
                throw new Error('admin count should not run for a name-only update')
            },
        },
    }

    assert.deepEqual(await preserveLastAdminOnUpdate({
        data: { name: 'Updated admin' },
        operation: 'update',
        originalDoc: { id: 1, role: 'admin' },
        req,
    } as never), { name: 'Updated admin' })
})

test('last admin cannot be deleted', async () => {
    const req = {
        payload: {
            find: async () => ({ totalDocs: 0 }),
            findByID: async () => ({ id: 1, role: 'admin' }),
        },
    }

    await assert.rejects(
        preserveLastAdminOnDelete({ id: 1, req } as never),
        /último administrador/,
    )
})

test('admin change is allowed when another admin exists', async () => {
    const req = {
        payload: {
            find: async () => ({ totalDocs: 1 }),
            findByID: async () => ({ id: 1, role: 'admin' }),
        },
    }

    assert.deepEqual(await preserveLastAdminOnUpdate({
        data: { role: 'editor' },
        operation: 'update',
        originalDoc: { id: 1, role: 'admin' },
        req,
    } as never), { role: 'editor' })
    await preserveLastAdminOnDelete({ id: 1, req } as never)
})
