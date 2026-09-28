import { expect, test } from '@playwright/test';

test('renders the conceptual demo home and main routes', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Demo conceptual · No es el sitio oficial de Vértice Negocios Inmobiliarios.').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Encontrá tu próximo lugar en Rosario.' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Navegación principal' })).toContainText('Comprar');
  await expect(page.getByRole('link', { name: 'Ver propiedades' }).first()).toHaveAttribute('href', '/comprar');
  await expect(page.locator('.property-card:visible')).toHaveCount(3);
  await expect(page.locator('.property-badge').first()).toHaveText('DEMO');
});

test('filters home cards without mixing property results', async ({ page }) => {
  await page.goto('/');

  await page.locator('select[name="operation"]').selectOption('venta');
  await page.locator('select[name="type"]').selectOption('departamento');
  await page.locator('select[name="zone"]').selectOption('abasto');

  await expect(page).toHaveURL(/operation=venta/);
  await expect(page).toHaveURL(/type=departamento/);
  await expect(page).toHaveURL(/zone=abasto/);
  await expect(page.getByRole('heading', { name: 'Resultados de búsqueda' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Departamento de 2 dormitorios en Abasto' })).toBeVisible();
  await expect(page.getByText('1 resultado', { exact: true })).toBeVisible();
});

test('shows the valuation capture flow without submitting data', async ({ page }) => {
  await page.goto('/');

  const valuation = page.getByRole('form', { name: 'Solicitud de tasación' });
  await expect(valuation.getByLabel('Tipo de propiedad')).toBeVisible();
  await expect(valuation.getByLabel('Zona / barrio')).toBeVisible();
  await expect(valuation.getByLabel('Datos básicos de la propiedad')).toBeVisible();
  await expect(valuation.getByLabel('Nombre')).toBeVisible();
  await expect(valuation.getByLabel('Teléfono / WhatsApp')).toBeVisible();

  await valuation.getByLabel('Datos básicos de la propiedad').fill('2 dormitorios, 70 m2, buen estado');
  await valuation.getByLabel('Nombre').fill('Persona de prueba');
  await valuation.getByLabel('Teléfono / WhatsApp').fill('3415550101');
  await valuation.getByRole('button', { name: 'Solicitar tasación' }).click();

  await expect(page).toHaveURL('/');
  await expect(
    page.getByText('Esta es una demostración del flujo de tasación. No se enviaron ni almacenaron datos.')
  ).toBeVisible();
});

test('lists buy properties with URL synced filters and sorting', async ({ page }) => {
  await page.goto('/comprar');

  await expect(page.getByRole('heading', { name: 'Propiedades en venta en Rosario' })).toBeVisible();
  await expect(page.locator('[data-property-card]:visible')).toHaveCount(7);

  await page.locator('select[name="tipo"]').selectOption('departamento');
  await page.locator('select[name="zona"]').selectOption('abasto');
  await page.locator('select[name="precio"]').selectOption('60000-100000');

  await expect(page).toHaveURL(/tipo=departamento/);
  await expect(page).toHaveURL(/zona=abasto/);
  await expect(page).toHaveURL(/precio=60000-100000/);
  await expect(page.locator('[data-property-card]:visible')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Departamento de 2 dormitorios en Abasto' })).toBeVisible();

  await page.locator('select[name="orden"]').selectOption('mayor-precio');
  await expect(page).toHaveURL(/orden=mayor-precio/);
});

test('lists rent properties and shows an empty state for incompatible filters', async ({ page }) => {
  await page.goto('/alquilar');

  await expect(page.getByRole('heading', { name: 'Propiedades en alquiler en Rosario' })).toBeVisible();
  await expect(page.locator('[data-property-card]:visible')).toHaveCount(5);

  await page.locator('select[name="tipo"]').selectOption('terreno');
  await expect(page.getByRole('heading', { name: 'No encontramos propiedades con esta combinación.' })).toBeVisible();

  await page.locator('[data-listing-empty]').getByRole('button', { name: 'Limpiar filtros' }).click();
  await expect(page.locator('[data-property-card]:visible')).toHaveCount(5);
});

test('keeps listing context when opening a property detail', async ({ page }) => {
  await page.goto('/comprar?tipo=departamento&zona=abasto');

  await page.getByRole('link', { name: 'Ver propiedad', exact: true }).click();

  await expect(page).toHaveURL(/from=%2Fcomprar%3Ftipo%3Ddepartamento%26zona%3Dabasto/);
  await expect(page.getByRole('heading', { name: 'Departamento de 2 dormitorios en Abasto' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Propiedades' })).toHaveAttribute(
    'href',
    '/comprar?tipo=departamento&zona=abasto'
  );
});

test('opens gallery and contextual demo inquiry on a property detail', async ({ page }) => {
  await page.goto('/propiedades/departamento-2-dormitorios-abasto/');

  await expect(page.getByText('REF-004').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Características principales' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Propiedades relacionadas' })).toBeVisible();

  await page.getByRole('button', { name: 'Ver todas las fotos' }).first().click();
  await expect(page.getByRole('dialog', { name: 'Galería de propiedad' })).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await expect(page.getByRole('dialog', { name: 'Galería de propiedad' }).getByText('2 / 5')).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar galería' }).click();

  await page
    .getByRole('complementary', { name: 'Resumen de la propiedad' })
    .getByRole('button', { name: 'Consultar por WhatsApp' })
    .click();
  await expect(page.getByText('Hola, quiero consultar por la propiedad REF-004')).toBeVisible();
  await expect(
    page.getByRole('dialog', { name: 'Consulta por WhatsApp' }).getByText('Departamento de 2 dormitorios en Abasto')
  ).toBeVisible();
});

test('does not overflow on mobile listing and detail pages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const path of ['/comprar', '/alquilar', '/propiedades/departamento-2-dormitorios-abasto/']) {
    await page.goto(path);
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.width + 1);
  }
});
