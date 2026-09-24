import type { Property } from '../../data/properties';
import type { PropertyFilters } from './types';

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    if (filters.operation && property.operation !== filters.operation) {
      return false;
    }

    if (filters.type && property.type !== filters.type) {
      return false;
    }

    if (filters.zone && property.zone !== filters.zone) {
      return false;
    }

    if (filters.maxPrice && filters.currency) {
      return property.currency === filters.currency && property.price <= filters.maxPrice;
    }

    return true;
  });
}
