import { describe, expect, it } from 'vitest';
import { properties } from '../../src/data/properties';
import { filterProperties } from '../../src/domain/filters/filter-properties';

describe('property filters', () => {
  it('filters by buy operation', () => {
    const result = filterProperties(properties, { operation: 'venta' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((property) => property.operation === 'venta')).toBe(true);
  });

  it('filters by rent operation and zone', () => {
    const result = filterProperties(properties, { operation: 'alquiler', zone: 'Centro' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((property) => property.operation === 'alquiler')).toBe(true);
    expect(result.every((property) => property.zone === 'Centro')).toBe(true);
  });

  it('filters by type and USD max price without mixing ARS prices', () => {
    const result = filterProperties(properties, {
      type: 'Departamento',
      currency: 'USD',
      maxPrice: 100000,
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((property) => property.type === 'Departamento')).toBe(true);
    expect(result.every((property) => property.currency === 'USD')).toBe(true);
    expect(result.every((property) => property.price <= 100000)).toBe(true);
  });
});
