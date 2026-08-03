import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "catalog_leads"
      ADD COLUMN IF NOT EXISTS "attribution" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "catalog_leads"
      DROP COLUMN IF EXISTS "attribution";
  `)
}
