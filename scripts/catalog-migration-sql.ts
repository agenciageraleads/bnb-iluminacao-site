import { PgDialect } from 'drizzle-orm/pg-core'
import { up } from '../src/migrations/20260918_120000_catalog_lifecycle'

// Generates a reviewed one-migration artifact only. Never opens a connection.
const [databaseName, productCount, backupSha256] = process.argv.slice(2)
if (!databaseName || !/^[a-zA-Z0-9_-]+$/.test(databaseName) || !/^[1-9][0-9]*$/.test(productCount ?? '') || !/^[a-f0-9]{64}$/.test(backupSha256 ?? '')) {
    throw new Error('Usage: tsx scripts/catalog-migration-sql.ts EXPECTED_DATABASE EXPECTED_PRODUCT_COUNT VERIFIED_BACKUP_SHA256')
}

const statements: string[] = []
const dialect = new PgDialect()
await up({ db: { execute: async (statement: Parameters<PgDialect['sqlToQuery']>[0]) => { statements.push(dialect.sqlToQuery(statement).sql) } } } as never)
console.log(`-- Exact migration 20260918_120000_catalog_lifecycle. External backup SHA-256: ${backupSha256}
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
SET LOCAL search_path = public;
DO $$ BEGIN
  IF current_database() <> '${databaseName}' THEN RAISE EXCEPTION 'Unexpected database; migration refused'; END IF;
  IF to_regclass('public.payload_migrations') IS NULL THEN RAISE EXCEPTION 'Payload registry missing; review migration history first'; END IF;
  IF EXISTS (SELECT 1 FROM public.payload_migrations WHERE name = '20260918_120000_catalog_lifecycle') THEN RAISE EXCEPTION 'Migration already registered; no reclassification allowed'; END IF;
  IF to_regclass('public.products_catalog_20260918_backup') IS NOT NULL OR EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='lifecycle') THEN RAISE EXCEPTION 'Partial or previous migration; manual review required'; END IF;
END $$;
LOCK TABLE public.products IN ACCESS EXCLUSIVE MODE;
DO $$ BEGIN
  IF (SELECT count(*) FROM public.products) <> ${productCount} THEN RAISE EXCEPTION 'Product count changed since approval'; END IF;
END $$;
${statements.join('\n')}
COMMENT ON TABLE public.products_catalog_20260918_backup IS 'Pre-catalog backup; external dump SHA256 ${backupSha256}';
INSERT INTO public.payload_migrations (name, batch) SELECT '20260918_120000_catalog_lifecycle', COALESCE(MAX(batch), 0) + 1 FROM public.payload_migrations;
COMMIT;
`)
