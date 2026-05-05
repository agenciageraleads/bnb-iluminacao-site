import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "representatives" ADD COLUMN "display_order" numeric DEFAULT 999;

    UPDATE "representatives"
    SET "display_order" = 10
    WHERE lower("name") = 'glauco';

    UPDATE "representatives"
    SET "display_order" = 20
    WHERE lower("name") = 'juarez';

    UPDATE "representatives"
    SET "display_order" = 30
    WHERE lower("name") = 'bruno pereira';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "representatives" DROP COLUMN "display_order";
  `)
}
