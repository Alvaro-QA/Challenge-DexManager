import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TEST_CREDENTIALS, URLS } from '../utils/utils';

/**
 * Test Suite: Login en Dex Manager
 * Versión final: 6 Test Cases centralizados en Page Object Model.
 */

test.describe('Login - Dex Manager', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    
    // Navegamos directamente a la URL del .env
    const response = await page.goto(URLS.base);
    
    // Si la página carga un error 401, saltamos el test con un mensaje claro
    if (response?.status() === 401) {
      console.log('Servidor retornó 401. Intentando esperar a que cargue el formulario...');
    }

    // En lugar de fallar por el status, esperamos a que el input de usuario sea visible
    await loginPage.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
  });

  test('TC_LOGIN_01 - Login exitoso', async ({ page }) => {
    const username = TEST_CREDENTIALS.username || '';
    const password = TEST_CREDENTIALS.password || '';

    await loginPage.login(username, password);

    // Verificamos que el botón de login ya no esté 
    await expect(loginPage.loginButton).not.toBeVisible({ timeout: 10000 });
    await expect(page).not.toHaveURL(/login/);
  });

  test('TC_LOGIN_02 - Elementos UI visibles', async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPasswordButton).toBeVisible();
  });

  test('TC_LOGIN_03 - Credenciales inválidas muestran error', async () => {
    await loginPage.login('usuarioInvalido', 'passwordInvalido');
    
    await expect(loginPage.errorDialog).toBeVisible({ timeout: 10000 });
    
    // Cerramos el modal usando el botón OK de la Page
    await loginPage.okButton.click();
    await expect(loginPage.errorDialog).not.toBeVisible();
  });

  test('TC_LOGIN_04 - Usuario requerido', async ({ page }) => {
    await loginPage.usernameInput.clear();
    await loginPage.passwordInput.fill('Abcd1234!!');
    await loginPage.loginButton.click();

    // Validación de texto de error
    const errorMsg = page.locator('text=/.*(User required|Usuario requerido).*/i');
    await expect(errorMsg).toBeVisible();
  });

  test('TC_LOGIN_05 - Password requerido', async ({ page }) => {
    await loginPage.usernameInput.fill(TEST_CREDENTIALS.username || 'challengeqa');
    await loginPage.passwordInput.clear();
    await loginPage.loginButton.click();

    // Validación de texto de error
    const errorMsg = page.locator('text=/.*(Password required|Contraseña requerida).*/i');
    await expect(errorMsg).toBeVisible();
  });

  test('TC_LOGIN_06 - Recuperación de contraseña exitosa', async () => {
    await loginPage.clickForgotPassword();
    
    await loginPage.recoverPassword('PRUEBAQA@test.com');

    // Verificación final de que el flujo terminó
    await expect(loginPage.okButton).not.toBeVisible();
  });
});