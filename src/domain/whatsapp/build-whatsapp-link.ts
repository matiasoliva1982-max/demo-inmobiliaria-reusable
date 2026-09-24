import type { Property } from '../../data/properties';

export function buildWhatsappLink(phone: string | null, message: string): string | null {
  if (!phone) {
    return null;
  }

  const normalizedPhone = phone.replace(/[^\d]/g, '');

  if (!normalizedPhone) {
    return null;
  }

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildPropertyInquiryMessage(property: Pick<Property, 'reference' | 'type' | 'zone' | 'title'>): string {
  return `Hola, quiero consultar por la propiedad ${property.reference} — ${property.title}.`;
}
