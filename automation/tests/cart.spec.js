const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CartPage } = require('../pages/cart.page');
const { users } = require('../fixtures/testData');

test.describe('Inventario y carrito', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('TC-INV-005 | Ordenar productos por precio ascendente', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('TC-CART-001 + TC-CART-003 | Agregar y eliminar producto desde inventario', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeBackpackFromCart();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC-CART-005 + TC-CART-006 | Persistencia y visualización correcta del carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addBackpackToCart();
    await inventoryPage.addBikeLightToCart();
    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(await cartPage.getItemCount()).toBe(2);
    await expect(page.locator('.inventory_item_name')).toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });

  test('TC-MENU-001 | Reset App State limpia el carrito', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.resetAppState();
    await page.reload();

    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC-LOGIN-009 | Logout desde menú lateral', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.logout();

    await expect(page).toHaveURL(/saucedemo/);
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
