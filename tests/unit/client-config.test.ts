import { describe, expect, it } from 'vitest';
import { clientConfig } from '../../src/config/client';
import { navigationItems } from '../../src/config/navigation';
import { seoConfig } from '../../src/config/seo';

describe('client configuration', () => {
  it('keeps the demo clearly separated from an official site', () => {
    expect(clientConfig.name).toBe('Vértice Negocios Inmobiliarios');
    expect(clientConfig.city).toBe('Rosario');
    expect(clientConfig.demoMode).toBe(true);
    expect(seoConfig.noindex).toBe(true);
    expect(seoConfig.description).toContain('Propiedades en venta y alquiler');
  });

  it('does not invent real contact data', () => {
    expect(clientConfig.contact.whatsapp).toBeNull();
    expect(clientConfig.contact.instagram).toBeNull();
    expect(clientConfig.contact.address).toBeNull();
    expect(clientConfig.contact.email).toBeNull();
  });

  it('defines the requested navigation', () => {
    expect(navigationItems.map((item) => item.label)).toEqual([
      'Inicio',
      'Comprar',
      'Alquilar',
      'Tasaciones',
      'Nosotros',
      'Contacto',
    ]);
  });
});
