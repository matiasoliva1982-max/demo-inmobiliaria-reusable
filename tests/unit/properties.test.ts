import { describe, expect, it } from 'vitest';
import { properties } from '../../src/data/properties';

describe('demo properties dataset', () => {
  it('contains the approved twelve-property demo dataset', () => {
    expect(properties).toHaveLength(12);
    expect(properties.map((property) => property.reference)).toEqual([
      'REF-001',
      'REF-002',
      'REF-003',
      'REF-004',
      'REF-005',
      'REF-006',
      'REF-007',
      'REF-008',
      'REF-009',
      'REF-010',
      'REF-011',
      'REF-012',
    ]);
  });

  it('marks every property as demo and local to Rosario', () => {
    expect(properties.every((property) => property.isDemo)).toBe(true);
    expect(properties.every((property) => property.city === 'Rosario')).toBe(true);
    expect(properties.every((property) => property.status === 'available')).toBe(true);
  });

  it('has unique ids, references and slugs', () => {
    expect(new Set(properties.map((property) => property.id))).toHaveLength(properties.length);
    expect(new Set(properties.map((property) => property.reference))).toHaveLength(properties.length);
    expect(new Set(properties.map((property) => property.slug))).toHaveLength(properties.length);
  });

  it('has complete publishable fields for all cards', () => {
    for (const property of properties) {
      expect(property.title).not.toHaveLength(0);
      expect(property.price).toBeGreaterThan(0);
      expect(property.totalArea).toBeGreaterThan(0);
      expect(property.images[0]).toMatch(/^https:\/\/images\.unsplash\.com\//);
      expect(property.description).not.toHaveLength(0);
      expect(property.features.length).toBeGreaterThan(0);
    }
  });

  it('uses only the approved property types and zones', () => {
    expect(new Set(properties.map((property) => property.type))).toEqual(
      new Set(['Departamento', 'Casa', 'Local', 'Terreno'])
    );
    expect(new Set(properties.map((property) => property.zone))).toEqual(
      new Set(['Centro', 'Pichincha', 'Abasto', 'Echesortu', 'Fisherton', 'Alberdi'])
    );
    expect(properties.map((property) => property.type)).not.toContain('Oficina');
  });

  it('keeps the approved featured cards', () => {
    expect(properties.filter((property) => property.featured).map((property) => property.reference)).toEqual([
      'REF-001',
      'REF-002',
      'REF-004',
    ]);
  });
});
