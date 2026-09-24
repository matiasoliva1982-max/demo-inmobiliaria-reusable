export type ClientConfig = {
  name: string;
  city: string;
  demoMode: boolean;
  colors: {
    primary: string;
    secondary: string;
    surface: string;
    warmSurface: string;
    text: string;
    muted: string;
    white: string;
    whatsapp: string;
  };
  logo: {
    mark: string;
    label: string;
  };
  contact: {
    whatsapp: string | null;
    instagram: string | null;
    address: string | null;
    email: string | null;
  };
};

export const clientConfig: ClientConfig = {
  name: 'Vértice Negocios Inmobiliarios',
  city: 'Rosario',
  demoMode: true,
  colors: {
    primary: '#123A63',
    secondary: '#0B2742',
    surface: '#EAF2F8',
    warmSurface: '#F7F7F4',
    text: '#17212B',
    muted: '#66727E',
    white: '#FFFFFF',
    whatsapp: '#25D366',
  },
  logo: {
    mark: 'V',
    label: 'Vértice',
  },
  contact: {
    whatsapp: null,
    instagram: null,
    address: null,
    email: null,
  },
};
