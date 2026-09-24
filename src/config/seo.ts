export type SeoConfig = {
  title: string;
  titleTemplate: string;
  description: string;
  canonical: string;
  noindex: boolean;
  ogImage: string | null;
};

export const seoConfig: SeoConfig = {
  title: 'Demo inmobiliaria conceptual para Rosario',
  titleTemplate: '%s | Demo inmobiliaria conceptual',
  description:
    'Demo conceptual no oficial de una experiencia inmobiliaria reusable para compra, alquiler y tasaciones en Rosario.',
  canonical: 'https://demo-inmobiliaria.local/',
  noindex: true,
  ogImage: null,
};
