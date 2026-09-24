export const zones = [
  'Centro',
  'Pichincha',
  'Abasto',
  'Echesortu',
  'Fisherton',
  'Alberdi',
] as const;

export type Zone = (typeof zones)[number];
