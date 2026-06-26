import { test, expect } from '@playwright/test';

test.describe('The Internet Tests', () => {
  test('user can login successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash'))
      .toContainText('You logged into a secure area!');
  });

  test('user sees error with invalid login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash'))
      .toContainText('Your password is invalid!');
  });

  test('user can logout successfully', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await page.click('a.button.secondary.radius');

    await expect(page.locator('#flash'))
      .toContainText('You logged out of the secure area!');
  });
});
