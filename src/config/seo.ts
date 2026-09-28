export type SeoConfig = {
  title: string;
  titleTemplate: string;
  description: string;
  canonical: string;
  noindex: boolean;
  ogImage: string | null;
};

export const seoConfig: SeoConfig = {
  title: 'Vértice Negocios Inmobiliarios | Rosario',
  titleTemplate: '%s | Vértice Negocios Inmobiliarios',
  description:
    'Propiedades en venta y alquiler, búsqueda por zonas y solicitud de tasaciones en Rosario.',
  canonical: 'https://demo-inmobiliaria.local/',
  noindex: true,
  ogImage: null,
};
