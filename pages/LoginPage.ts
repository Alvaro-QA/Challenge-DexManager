import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page Object Model para la página de login de Dex Manager
 */
export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordButton: Locator;
  readonly recoveryEmailInput: Locator;
  readonly sendRecoveryButton: Locator;
  readonly okButton: Locator;
  readonly errorDialog: Locator;

  constructor(page: Page) {
    super(page);
    
    this.usernameInput = page.locator('input[aria-labelledby="paper-input-label-1"]');
    this.passwordInput = page.locator('input[type="password"][aria-labelledby="paper-input-label-2"]');
    this.loginButton = page.locator('paper-button.accept-btn.login-btn');
    this.forgotPasswordButton = page.locator('paper-button.forgot-btn.login-btn');

    this.recoveryEmailInput = page.locator('paper-dialog input, input[autofocus]');
    this.sendRecoveryButton = page.locator('paper-button:has-text("Send"), paper-button:has-text("Enviar")');
    this.okButton = page.locator('paper-button:has-text("OK"), button:has-text("OK")');
    this.errorDialog = page.locator('paper-dialog');
  }

  /**
   * Navega a la página de login
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.wait(2000);
  }

  /**
   * Realiza el login con credenciales
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 15000 });
    
    await this.usernameInput.fill(username);
    await this.wait(500);
    await this.passwordInput.fill(password);
    await this.wait(500);
    
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }


  /**
   * Flujo unificado de recuperación de contraseña
   */
  async recoverPassword(email: string): Promise<void> {
    await this.recoveryEmailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.recoveryEmailInput.fill(email);
    await this.wait(500);
    await this.clickElement(this.sendRecoveryButton);
    
    // Esperamos y cerramos el modal de confirmación
    await this.okButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.clickElement(this.okButton);
  }

  /**
   * Verifica si estamos en la página de login
   */
  async isOnLoginPage(): Promise<boolean> {
    try {
      await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifica si el botón de login es visible
   */
  async isLoginButtonVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginButton);
  }

  /**
   * Click en "Forgot password"
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.clickElement(this.forgotPasswordButton);
    await this.wait(2000);
  }
}