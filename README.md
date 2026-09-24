# Demo inmobiliaria reusable

Demo conceptual construida con Astro para validar una experiencia inmobiliaria reusable. La implementación actual usa a `Vértice Negocios Inmobiliarios` como piloto visual, pero no es su sitio oficial.

## Modo demo

El aviso `Demo conceptual — no es el sitio oficial` se controla desde `src/config/client.ts` con `demoMode: true`. No lo desactives hasta trabajar con un cliente real y datos autorizados.

## Cambiar marca y ciudad

Editar `src/config/client.ts`:

- `name`: nombre comercial.
- `city`: ciudad principal.
- `colors`: paleta visual.
- `logo`: marca textual o isotipo simple.
- `contact`: WhatsApp, Instagram, dirección y email.

Si `contact.whatsapp` queda en `null`, los CTAs muestran feedback demo y no abren un número inventado.

## Cambiar navegación y SEO

- Navegación: `src/config/navigation.ts`.
- Title, description, canonical y noindex: `src/config/seo.ts`.

La demo usa `noindex` por defecto.

## Propiedades

El dataset vive en `src/data/properties.ts`. Cada propiedad debe tener:

- `slug`
- `reference`
- `operation`
- `type`
- `zone`
- `price`
- superficies
- dormitorios/baños/cochera cuando aplique
- imágenes
- descripción
- características
- `isDemo: true` en esta etapa

Las fichas se generan automáticamente en `/propiedades/[slug]`.

## Imágenes

La V2 mantiene imágenes remotas temporales de Unsplash para acelerar validación visual. Para un cliente real, reemplazar `images` por assets locales en `public/images/properties/` y actualizar las URLs del dataset.

No usar fotos reales de una inmobiliaria sin autorización.

## WhatsApp contextual

La lógica está en `src/domain/whatsapp/build-whatsapp-link.ts`.

Para activar WhatsApp real:

1. Configurar `clientConfig.contact.whatsapp` con número internacional.
2. Mantener el formato sin inventar datos, por ejemplo `+5493410000000`.
3. Los mensajes por propiedad se generan desde referencia, tipo y zona.

## Ejecutar

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run test
pnpm run build
pnpm run test:e2e
```

En este entorno Windows de Codex puede hacer falta ejecutar con `CI=true` y `ASTRO_TELEMETRY_DISABLED=1`.
