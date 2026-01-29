import { Page, Locator } from '@playwright/test';

export class MediaLibraryPage {
  readonly page: Page;
  readonly mediaLibraryLink: Locator;
  readonly mainFabButton: Locator;
  readonly createFolderButton: Locator;
  readonly newFolderNameInput: Locator;
  readonly acceptButton: Locator;
  readonly filesTree: Locator;

  constructor(page: Page) {
    this.page = page;

    this.mediaLibraryLink = page.getByRole('link', { name: 'Librería de Medias' });
    this.mainFabButton = page.locator('#mainFab #paperFab');
    this.createFolderButton = page.getByRole('button', { name: 'Carpeta' });
    this.newFolderNameInput = page.getByRole('textbox', { name: 'Nuevo Nombre' });
    this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
    this.filesTree = page.locator('#dexFilesTree');
  }

  async navigateToMediaLibrary() {
    await this.mediaLibraryLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createFolder(folderName: string) {
    await this.mainFabButton.click();
    await this.createFolderButton.click();
    await this.newFolderNameInput.fill(folderName);
    await this.acceptButton.click();

    // Esperar que la carpeta aparezca en el árbol
    await this.filesTree.getByText(folderName, { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
  }

  async selectFolder(folderName: string) {
    const folder = this.filesTree.getByText(folderName, { exact: true });
    await folder.click();
    await folder.dblclick(); // si hace falta abrirla
  }

}
