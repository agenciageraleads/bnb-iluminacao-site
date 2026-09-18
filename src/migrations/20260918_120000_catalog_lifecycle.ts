import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
    await db.execute(sql`
        CREATE TABLE IF NOT EXISTS products_catalog_20260918_backup (id integer PRIMARY KEY, document jsonb NOT NULL);
        INSERT INTO products_catalog_20260918_backup SELECT id, to_jsonb(products) FROM products ON CONFLICT (id) DO NOTHING;
        DO $$ BEGIN
            CREATE TYPE enum_products_lifecycle AS ENUM ('active', 'hidden', 'development');
        EXCEPTION WHEN duplicate_object THEN NULL; END $$;
        ALTER TABLE products ADD COLUMN IF NOT EXISTS lifecycle enum_products_lifecycle DEFAULT 'hidden' NOT NULL;
        CREATE INDEX IF NOT EXISTS products_lifecycle_idx ON products (lifecycle);
        UPDATE products p SET lifecycle = CASE
            WHEN c.slug IN ('sport','agro','garden','linha-sport','linha-agro','linha-garden') THEN 'development'::enum_products_lifecycle
            WHEN c.slug IN ('orna','linha-orna') AND p.slug !~ '^poste-ornamental-(aquila|harmonia|lyra|phoenix|altair|atlas|heliptica|aurum|vela|pyxis)(-engastado|-flangeado)?$' THEN 'hidden'::enum_products_lifecycle
            WHEN p.slug = 'poste-ornamental-eos' THEN 'hidden'::enum_products_lifecycle
            WHEN c.slug IN ('urban','orna','versa','forza','vigia','nexo','civis','linha-urban','linha-orna','linha-versa','linha-forza','linha-vigia','linha-nexo','linha-civis') THEN 'active'::enum_products_lifecycle
            ELSE 'hidden'::enum_products_lifecycle END
        FROM categories c WHERE p.category_id = c.id;
    `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // Original business records and media were never changed. Keep the audit backup.
    await db.execute(sql`
        DROP INDEX IF EXISTS products_lifecycle_idx;
        ALTER TABLE products DROP COLUMN IF EXISTS lifecycle;
        DROP TYPE IF EXISTS enum_products_lifecycle;
    `)
}
