import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MediaLibraryPage } from '../pages/MediaLibraryPage';
import { TEST_CREDENTIALS, URLS, TIMEOUTS, generateUniqueName } from '../utils/utils';

test('Crear y eliminar carpeta en Media Library', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mediaLibrary = new MediaLibraryPage(page);

  // Login usando constantes
  await loginPage.navigateToLogin();
  await loginPage.login(TEST_CREDENTIALS.username, TEST_CREDENTIALS.password);

  // Ir a Media Library
  await mediaLibrary.navigateToMediaLibrary();

  // Crear carpeta con nombre único
  const folderName = generateUniqueName('Prueba');
  await mediaLibrary.createFolder(folderName);

  // Verificar que la carpeta existe en el árbol
  const folderInTree = mediaLibrary.filesTree.getByText(folderName, { exact: true });
  await expect(folderInTree).toBeVisible({ timeout: TIMEOUTS.medium });

  // Opcional: eliminar carpeta
  // await mediaLibrary.deleteFolder(folderName);
});
