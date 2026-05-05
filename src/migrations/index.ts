import * as migration_20260309_012150_init_schema from './20260309_012150_init_schema';
import * as migration_20260505_154600_add_representative_display_order from './20260505_154600_add_representative_display_order';

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
];
