export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Comprar', href: '/comprar' },
  { label: 'Alquilar', href: '/alquilar' },
  { label: 'Tasaciones', href: '/#tasaciones' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
];
