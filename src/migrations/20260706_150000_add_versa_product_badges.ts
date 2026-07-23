import { MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_products_badges" ADD VALUE IF NOT EXISTS 'NBR 14744';
    ALTER TYPE "public"."enum_products_badges" ADD VALUE IF NOT EXISTS 'LED Integrado';
    ALTER TYPE "public"."enum_products_badges" ADD VALUE IF NOT EXISTS 'Lançamento';
  `)
}

export async function down(): Promise<void> {
  // Postgres enum value removal is intentionally not automated.
}
