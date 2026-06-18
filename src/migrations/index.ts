import * as migration_20260309_012150_init_schema from './20260309_012150_init_schema';
import * as migration_20260505_154600_add_representative_display_order from './20260505_154600_add_representative_display_order';
import * as migration_20260617_190000_add_representative_crm_user_id from './20260617_190000_add_representative_crm_user_id';

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
];
