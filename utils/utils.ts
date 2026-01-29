import dotenv from 'dotenv';

dotenv.config();

/**
 * URLs de la aplicación
 */
export const URLS = {
  // Prioriza la URL del .env, si no existe usa la de login completa por seguridad
  base: process.env.BASE_URL || 'https://demo4.dexmanager.com/DexFrontEnd/#!/login',
  dashboard: '/dashboard',
};

/**
 * Credenciales de prueba
 * Si no existen en el .env, el test fallará con un mensaje claro.
 */
export const TEST_CREDENTIALS = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
};

/**
 * Timeouts globales para esperas asíncronas
 */
export const TIMEOUTS = {
  short: 5000,
  medium: 10000,
  long: 30000,
};


/** Genera un nombre único (ideal para nombres de carpetas o archivos) */
export const generateUniqueName = (prefix: string): string => {
  return `${prefix}_${Date.now()}`;
};

/** Formatea fecha para inputs (YYYY-MM-DD) */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/** Obtiene una fecha futura sumando días a la fecha actual */
export const getFutureDate = (daysAhead: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
};