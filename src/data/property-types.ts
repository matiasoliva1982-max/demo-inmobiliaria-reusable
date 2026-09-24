export const propertyTypes = [
  'Departamento',
  'Casa',
  'Local',
  'Terreno',
] as const;

export type PropertyType = (typeof propertyTypes)[number];
