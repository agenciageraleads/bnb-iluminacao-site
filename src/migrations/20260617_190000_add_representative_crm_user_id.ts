import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "representatives" ADD COLUMN IF NOT EXISTS "crm_user_id" varchar;
    CREATE UNIQUE INDEX IF NOT EXISTS "representatives_crm_user_id_idx"
      ON "representatives" USING btree ("crm_user_id")
      WHERE "crm_user_id" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "representatives_crm_user_id_idx";
    ALTER TABLE "representatives" DROP COLUMN IF EXISTS "crm_user_id";
  `)
}
