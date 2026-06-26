import { test, expect} from '@playwright/test';
// End-to-end tests for SauceDemo user flows using Playwright

test.describe('SauceDemo Project Tests', () => {
    test('user can login and see inventory', async ({ page }) => { 
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

await expect(page).toHaveURL(/inventory/);
    });

    test('user can see error message with invalid login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'wrongpassword');
        await page.click('#login-button');

await expect(page.locator('[data-test="error"]'))
  .toContainText('Username and password do not match');
    });

   test('user can logout successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  await expect(page.locator('#login-button')).toBeVisible();
    });
});