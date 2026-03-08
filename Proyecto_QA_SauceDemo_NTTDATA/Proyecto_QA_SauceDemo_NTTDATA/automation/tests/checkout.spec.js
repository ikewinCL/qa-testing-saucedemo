const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { CheckoutPage } = require('../pages/checkout.page');
const { users, checkoutData } = require('../fixtures/testData');

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  [
    { id: 'TC-CHK-002', data: checkoutData.missingFirstName, expected: 'First Name is required' },
    { id: 'TC-CHK-003', data: checkoutData.missingLastName, expected: 'Last Name is required' },
    { id: 'TC-CHK-004', data: checkoutData.missingPostalCode, expected: 'Postal Code is required' }
  ].forEach(({ id, data, expected }) => {
    test(`${id} | Validaciones obligatorias del formulario`, async ({ page }) => {
      const checkoutPage = new CheckoutPage(page);

      await checkoutPage.fillInformation(data);
      await checkoutPage.continue();

      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toContainText(expected);
    });
  });

  test('TC-CHK-006 + TC-CHK-007 + TC-CHK-008 | Checkout exitoso y validación de totales', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInformation(checkoutData.valid);
    await checkoutPage.continue();

    const itemTotal = await checkoutPage.getItemTotalValue();
    const tax = await checkoutPage.getTaxValue();
    const total = await checkoutPage.getTotalValue();

    expect(itemTotal).toBeCloseTo(39.98, 2);
    expect(total).toBeCloseTo(itemTotal + tax, 2);

    await checkoutPage.finish();

    await expect(checkoutPage.completeHeader).toContainText('Thank you for your order');
  });
});
