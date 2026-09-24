import type { Currency, Operation } from '../../data/properties';
import type { PropertyType } from '../../data/property-types';
import type { Zone } from '../../data/zones';

export type PropertyFilters = {
  operation?: Operation;
  type?: PropertyType;
  zone?: Zone;
  maxPrice?: number;
  currency?: Currency;
};
