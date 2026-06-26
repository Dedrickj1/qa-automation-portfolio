import { test, expect } from '@playwright/test';
// End-to-end tests for SauceDemo user flows using Playwright

test.describe('SauceDemo E2ETests', () => {

  test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
});


  test('user can add items to cart', async ({ page }) => {

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('2');
  });

  test('user can view items in cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    await page.click('.shopping_cart_link');

    await expect(page.locator('.inventory_item_name'))
      .toContainText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });

// Removing an item from the cart and verifying it is removed
    test('user can remove an item from the cart and see it removed', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    await page.click('.shopping_cart_link');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('.inventory_item_name'))
      .not.toContainText('Sauce Labs Backpack');
  });

  // Show an empty cart message when the cart is empty
  test('user can see an empty cart when no items are added', async ({ page }) => {
  await page.click('.shopping_cart_link');

  await expect(page.locator('.inventory_item_name')).toHaveCount(0);
});

// Verify user logged out successfully
  test('user can log out successfully', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');

    await expect(page.locator('#login-button')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  });
