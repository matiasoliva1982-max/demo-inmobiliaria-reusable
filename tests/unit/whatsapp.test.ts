import { describe, expect, it } from 'vitest';
import { buildPropertyInquiryMessage, buildWhatsappLink } from '../../src/domain/whatsapp/build-whatsapp-link';

describe('whatsapp link builder', () => {
  it('does not create a link without a confirmed phone', () => {
    expect(buildWhatsappLink(null, 'Hola')).toBeNull();
    expect(buildWhatsappLink('', 'Hola')).toBeNull();
  });

  it('normalizes an international number if one is configured later', () => {
    expect(buildWhatsappLink('+54 9 341 555 0101', 'Hola demo')).toBe(
      'https://wa.me/5493415550101?text=Hola%20demo'
    );
  });

  it('builds contextual property messages without needing a real phone', () => {
    expect(
      buildPropertyInquiryMessage({
        reference: 'VD-1007',
        type: 'Departamento',
        zone: 'Abasto',
        title: 'Monoambiente funcional en Abasto',
      })
    ).toBe('Hola, quiero consultar por la propiedad VD-1007 — Monoambiente funcional en Abasto.');
  });
});
