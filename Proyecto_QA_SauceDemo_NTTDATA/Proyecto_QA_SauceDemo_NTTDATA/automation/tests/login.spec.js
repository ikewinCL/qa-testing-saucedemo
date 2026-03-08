const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { users } = require('../fixtures/testData');

test.describe('Login', () => {
  test('TC-LOGIN-001 | Login válido con standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await inventoryPage.assertInventoryLoaded();
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC-LOGIN-002 | Usuario bloqueado no puede iniciar sesión', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  [
    { id: 'TC-LOGIN-003', username: '', password: 'secret_sauce', expected: 'Username is required' },
    { id: 'TC-LOGIN-004', username: 'standard_user', password: '', expected: 'Password is required' },
    { id: 'TC-LOGIN-005', username: '', password: '', expected: 'Username is required' }
  ].forEach(({ id, username, password, expected }) => {
    test(`${id} | Validación de campos obligatorios`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(expected);
    });
  });
});
