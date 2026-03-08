class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillInformation({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getErrorText() {
    return (await this.errorMessage.textContent())?.trim();
  }

  async getItemTotalValue() {
    const text = await this.itemTotal.textContent();
    return Number(text.replace('Item total: $', '').trim());
  }

  async getTaxValue() {
    const text = await this.tax.textContent();
    return Number(text.replace('Tax: $', '').trim());
  }

  async getTotalValue() {
    const text = await this.total.textContent();
    return Number(text.replace('Total: $', '').trim());
  }
}

module.exports = { CheckoutPage };
