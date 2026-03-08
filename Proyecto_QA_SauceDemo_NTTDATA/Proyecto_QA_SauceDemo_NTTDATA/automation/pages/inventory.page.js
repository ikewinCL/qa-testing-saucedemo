class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryNames = page.locator('.inventory_item_name');
    this.inventoryPrices = page.locator('.inventory_item_price');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
  }

  async assertInventoryLoaded() {
    await this.title.waitFor();
  }

  async getItemCount() {
    return this.inventoryItems.count();
  }

  async sortBy(value) {
    await this.sortSelect.selectOption(value);
  }

  async getProductNames() {
    return await this.inventoryNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.inventoryPrices.allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }

  async addBackpackToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async addBikeLightToCart() {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  }

  async removeBackpackFromCart() {
    await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async openProductDetail(productName) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }
}

module.exports = { InventoryPage };
