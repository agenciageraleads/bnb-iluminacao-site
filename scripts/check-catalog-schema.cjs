// Read-only gate. Safe to pipe into the running container's Node process.
const { Client } = require('pg')
const migrationName = '20260918_120000_catalog_lifecycle'

async function main() {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL
    if (!connectionString) throw new Error('Database connection not configured')
    const client = new Client({ connectionString })
    await client.connect()
    try {
        await client.query('BEGIN READ ONLY')
        const { rows } = await client.query(`SELECT
            EXISTS(SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='lifecycle') AS column_ready,
            to_regclass('public.products_catalog_20260918_backup') IS NOT NULL AS backup_ready`)
        if (!rows[0].column_ready || !rows[0].backup_ready) throw new Error('Catalog migration/backup missing. Apply the reviewed migration before rollout.')
        const applied = await client.query('SELECT 1 FROM public.payload_migrations WHERE name=$1', [migrationName])
        if (!applied.rowCount) throw new Error('Catalog migration is not registered. Refusing rollout.')
        await client.query('COMMIT')
        console.log('Catalog schema/backup/migration gate passed (read-only).')
    } finally {
        await client.end()
    }
}

main().catch(error => {
    console.error(error instanceof Error && /Catalog/.test(error.message) ? error.message : 'Catalog schema gate failed; inspect database connectivity privately.')
    process.exitCode = 1
})
