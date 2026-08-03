import * as migration_20260309_012150_init_schema from './20260309_012150_init_schema';
import * as migration_20260505_154600_add_representative_display_order from './20260505_154600_add_representative_display_order';
import * as migration_20260617_190000_add_representative_crm_user_id from './20260617_190000_add_representative_crm_user_id';
import * as migration_20260626_120000_add_representative_territories from './20260626_120000_add_representative_territories';
import * as migration_20260706_150000_add_versa_product_badges from './20260706_150000_add_versa_product_badges';
import * as migration_20260803_180000_add_catalog_lead_attribution from './20260803_180000_add_catalog_lead_attribution';

export const migrations = [
  {
    up: migration_20260309_012150_init_schema.up,
    down: migration_20260309_012150_init_schema.down,
    name: '20260309_012150_init_schema'
  },
  {
    up: migration_20260505_154600_add_representative_display_order.up,
    down: migration_20260505_154600_add_representative_display_order.down,
    name: '20260505_154600_add_representative_display_order'
  },
  {
    up: migration_20260617_190000_add_representative_crm_user_id.up,
    down: migration_20260617_190000_add_representative_crm_user_id.down,
    name: '20260617_190000_add_representative_crm_user_id'
  },
  {
    up: migration_20260626_120000_add_representative_territories.up,
    down: migration_20260626_120000_add_representative_territories.down,
    name: '20260626_120000_add_representative_territories'
  },
  {
    up: migration_20260706_150000_add_versa_product_badges.up,
    down: migration_20260706_150000_add_versa_product_badges.down,
    name: '20260706_150000_add_versa_product_badges'
  },
  {
    up: migration_20260803_180000_add_catalog_lead_attribution.up,
    down: migration_20260803_180000_add_catalog_lead_attribution.down,
    name: '20260803_180000_add_catalog_lead_attribution'
  },
];
