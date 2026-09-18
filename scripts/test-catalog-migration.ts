import assert from 'node:assert/strict'
import { PgDialect } from 'drizzle-orm/pg-core'
import { up, down } from '../src/migrations/20260918_120000_catalog_lifecycle'

const connectionString = process.env.TEST_CATALOG_DATABASE_URL
let execute: (query: string) => Promise<unknown>
let rows: (query: string) => Promise<Record<string, unknown>[]>
let close: () => Promise<void>

if (connectionString) {
    const url = new URL(connectionString)
    assert.ok(['localhost', '127.0.0.1'].includes(url.hostname), 'Only the local disposable test database is allowed')
    assert.equal(url.pathname, '/catalog_migration_test')
    const { Client } = await import('pg')
    const client = new Client({ connectionString })
    await client.connect()
    execute = query => client.query(query)
    rows = async query => (await client.query(query)).rows
    close = () => client.end()
} else {
    const { PGlite } = await import('@electric-sql/pglite')
    const client = new PGlite()
    execute = query => client.exec(query)
    rows = async query => (await client.query(query)).rows as Record<string, unknown>[]
    close = () => client.close()
}

const dialect = new PgDialect()
const db = { execute: (statement: Parameters<PgDialect['sqlToQuery']>[0]) => execute(dialect.sqlToQuery(statement).sql) }
try {
    await execute(`BEGIN; CREATE SCHEMA catalog_migration_regression; SET LOCAL search_path TO catalog_migration_regression;
        CREATE TABLE categories (id integer PRIMARY KEY, slug varchar NOT NULL);
        CREATE TABLE products (id integer PRIMARY KEY, category_id integer REFERENCES categories(id), slug varchar NOT NULL, name varchar NOT NULL, main_image_id integer);
        INSERT INTO categories VALUES (1,'orna'),(2,'urban'),(3,'linha-sport'),(4,'versa'),(5,'linha-agro'),(6,'linha-garden');
        INSERT INTO products VALUES (1,1,'poste-ornamental-aquila-engastado','Original Aquila',71), (2,1,'poste-ornamental-aurora-engastado','Original Aurora',72),
        (3,2,'poste-reto','Original Reto',73), (4,3,'sport-legacy','Original Sport',74),(5,4,'poste-ornamental-eos','Original EOS',75),
        (6,5,'agro-legacy','Original Agro',76),(7,6,'garden-legacy','Original Garden',77);`)
    const before = await rows('SELECT * FROM products ORDER BY id')
    await up({ db } as never)
    assert.deepEqual((await rows('SELECT lifecycle FROM products ORDER BY id')).map(row => row.lifecycle), ['active', 'hidden', 'active', 'development', 'hidden', 'development', 'development'])
    assert.deepEqual((await rows('SELECT document FROM products_catalog_20260918_backup ORDER BY id')).map(row => row.document), before)
    assert.deepEqual(await rows('SELECT id,category_id,slug,name,main_image_id FROM products ORDER BY id'), before)
    await execute("INSERT INTO products(id,category_id,slug,name) VALUES(8,1,'new-model','Not reviewed')")
    assert.equal((await rows('SELECT lifecycle FROM products WHERE id=8'))[0].lifecycle, 'hidden')
    await down({ db } as never)
    assert.equal((await rows('SELECT count(*)::int AS count FROM products_catalog_20260918_backup'))[0].count, 7)
    assert.deepEqual(await rows('SELECT * FROM products WHERE id < 8 ORDER BY id'), before)
    assert.equal((await rows("SELECT count(*)::int AS count FROM information_schema.columns WHERE table_schema='catalog_migration_regression' AND table_name='products' AND column_name='lifecycle'"))[0].count, 0)
    await execute('ROLLBACK')
    console.log(`Catalog migration regression passed (${connectionString ? 'PostgreSQL 15' : 'PGlite'}): lifecycle, backup, no product/media deletion, hidden defaults, rollback.`)
} finally {
    await close()
}
