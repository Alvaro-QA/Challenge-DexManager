import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Cargamos el archivo .env
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Mantenemos 1 worker para evitar colisiones en Dex Manager al crear carpetas
  workers: 1, 
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    // Tomamos la URL del .env o usamos la de login por defecto
    baseURL: process.env.BASE_URL || 'https://demo4.dexmanager.com/DexFrontEnd/#!/login',
    
    // Configuración de evidencias
    trace: 'retain-on-failure',
    screenshot: 'on', // Cambiado a 'on' para asegurar evidencia en cada paso del reporte
    video: 'on-first-retry',
    
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Tiempos de espera globales
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
});