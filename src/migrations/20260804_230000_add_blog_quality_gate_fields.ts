import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog"
      ADD COLUMN IF NOT EXISTS "cta_label" varchar,
      ADD COLUMN IF NOT EXISTS "cta_url" varchar,
      ADD COLUMN IF NOT EXISTS "quality_audit_model" varchar,
      ADD COLUMN IF NOT EXISTS "quality_audit_revisor_prompt" varchar,
      ADD COLUMN IF NOT EXISTS "quality_audit_revisor_veredicto" jsonb,
      ADD COLUMN IF NOT EXISTS "quality_audit_quality_gate_errors" jsonb,
      ADD COLUMN IF NOT EXISTS "quality_audit_reviewed_by" varchar,
      ADD COLUMN IF NOT EXISTS "quality_audit_reviewed_at" timestamp(3) with time zone;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_sources" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "blog_sources"
        ADD CONSTRAINT "blog_sources_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "blog"("id") ON DELETE CASCADE;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blog_sources_order_idx" ON "blog_sources" ("_order");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "blog_sources_parent_id_idx" ON "blog_sources" ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "blog_sources";
  `)
  await db.execute(sql`
    ALTER TABLE "blog"
      DROP COLUMN IF EXISTS "cta_label",
      DROP COLUMN IF EXISTS "cta_url",
      DROP COLUMN IF EXISTS "quality_audit_model",
      DROP COLUMN IF EXISTS "quality_audit_revisor_prompt",
      DROP COLUMN IF EXISTS "quality_audit_revisor_veredicto",
      DROP COLUMN IF EXISTS "quality_audit_quality_gate_errors",
      DROP COLUMN IF EXISTS "quality_audit_reviewed_by",
      DROP COLUMN IF EXISTS "quality_audit_reviewed_at";
  `)
}
