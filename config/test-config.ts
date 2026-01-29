import dotenv from 'dotenv';

// Carga el archivo .env
dotenv.config();

export const TEST_CONFIG = {
  // process.env accede a lo que escribiste en el archivo .env
  baseURL: process.env.BASE_URL || 'https://demo4.dexmanager.com',
  credentials: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  timeouts: {
    navigation: 30000,
    action: 10000,
    assertion: 5000
  }
};

export const SELECTORS = {
  login: {
    usernameInput: '#email',
    passwordInput: '#password',
    loginButton: 'button[type="submit"]',
    errorMessage: '.error-message',
    successIndicator: '.user-menu, .dashboard, [data-testid="dashboard"]'
  },
  mediaLibrary: {
    menuItem: 'text=Media Library',
    createFolderButton: 'button:has-text("Create Folder"), [data-testid="create-folder"]',
    folderNameInput: 'input[name="folderName"], input[placeholder*="folder"]',
    acceptButton: 'button:has-text("Accept"), button:has-text("Create")',
    uploadButton: 'button:has-text("Upload"), [data-testid="upload"]',
    fileInput: 'input[type="file"]',
    gridView: '[data-view="grid"], .grid-view',
    listView: '[data-view="list"], .list-view',
    durationInput: 'input[name="duration"], [data-testid="duration"]',
    saveButton: 'button:has-text("Save")'
  }
};
