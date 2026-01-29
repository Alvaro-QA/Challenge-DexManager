import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Clase base para todas las páginas
 * Contiene métodos comunes reutilizables
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a una URL específica
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Espera a que un elemento sea visible
   */
  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  /**
   * Click en un elemento con espera
   */
  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /**
   * Escribe texto en un input
   */
  async fillInput(locator: Locator, text: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /**
   * Obtiene el texto de un elemento
   */
  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return await locator.textContent() || '';
  }

  /**
   * Verifica si un elemento es visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Espera un tiempo específico
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Toma screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${name}.png`,
      fullPage: true 
    });
  }

  /**
   * Obtiene el título de la página
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Obtiene la URL actual
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}