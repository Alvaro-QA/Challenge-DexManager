# Dex Manager - Framework de Automatización de Pruebas

Proyecto de automatización de pruebas para Dex Manager utilizando el patrón Page Object Model (POM) con Playwright y TypeScript.

## Casos de Prueba Automatizados

El framework actualmente cuenta con cobertura para los flujos críticos de acceso y gestión inicial de contenidos.



## 🚀 Cómo empezar (Clonado y Setup)

Si deseas replicar este proyecto en tu máquina local, sigue estos pasos:

### 1. Clonar el repositorio
Abre una terminal y ejecuta el siguiente comando:

```bash

git clone https://github.com/Alvaro-QA/Challenge-DexManager.git
cd Challenge-DexManager 
```
### Login Tests (tests/login.spec.ts)

| ID | Descripción | Prioridad |
|----|-------------|-----------|
| TC_LOGIN_01 | Login exitoso con credenciales válidas (desde .env) | Crítica |
| TC_LOGIN_02 | Verificación de elementos visuales (Inputs, botones y etiquetas) | Alta |
| TC_LOGIN_03 | Manejo de credenciales inválidas y cierre de diálogo de error | Alta |
| TC_LOGIN_04 | Validación de mensaje "Usuario requerido" al dejar campo vacío | Media |
| TC_LOGIN_05 | Validación de mensaje "Contraseña requerida" al dejar campo vacío | Media |
| TC_LOGIN_06 | Flujo completo de recuperación de contraseña (Forgot Password) | Alta |

### Media Library Tests (tests/media-library-folder.spec.ts)

| ID | Descripción | Prioridad |
|----|-------------|-----------|
| TC_DM_MEDIA_01 | Creación de carpeta con nombre único y validación en el DOM | Alta |

**Total: 7 casos de prueba certificados.**

---

## Instalación y Configuración

### 1. Prerrequisitos
- Node.js 18 o superior.
- Visual Studio Code.

### 2. Instalación
Ejecute los siguientes comandos en la terminal:

npm install
npx playwright install

### Seguridad y Variables de Entorno
Por razones de seguridad, las credenciales reales no se suben al repositorio. Debe crear un archivo .env en la raíz del proyecto.

Copie el archivo de ejemplo: cp .env.example .env

Complete los datos en el archivo .env con sus credenciales:

BASE_URL=
DB_USER=tu_usuario
DB_PASS=tu_password


## Ejecución de Pruebas

| Objetivo | Comando |
| :--- | :--- |
| **Ejecutar todos los tests** | `npx playwright test` |
| **Modo Interactivo (UI)** | `npx playwright test --ui` |
| **Solo tests de Login** | `npx playwright test tests/login.spec.ts` |
| **Ver Reporte HTML** | `npx playwright show-report` |

## Estructura del Proyecto

* **pages/**: Page Object Models que contienen los selectores y las acciones de cada página.
* **tests/**: Especificaciones de pruebas (.spec.ts).
* **utils/**: Funciones de ayuda como generadores de nombres únicos y manejo de fechas.
* **playwright-report/**: Reporte HTML generado automáticamente tras la ejecución.
* **test-results/**: Evidencias de fallos (screenshots, videos y traces).

---

## Evidencias y Reportes

El framework genera evidencias automáticamente solo en caso de error para optimizar el almacenamiento:

* **Screenshots**: Captura de pantalla al momento exacto del fallo.
* **Videos**: Grabación del flujo que causó el error.
* **Traces**: Archivo técnico detallado para inspeccionar el DOM y la red durante el fallo.

Para ver las evidencias acumuladas, utilice el comando: `npx playwright show-report`.

---

## Buenas Prácticas Implementadas

* **Page Object Model**: Separación estricta entre la lógica del test y los selectores de la interfaz.
* **Manejo de Shadow DOM**: Selectores específicos para interactuar con componentes Polymer (`paper-input`, `paper-button`).
* **Wait Strategies**: Uso de esperas asíncronas reactivas en lugar de tiempos de espera fijos.
* **Nombres Únicos**: Uso de timestamps para la creación de datos de prueba para evitar colisiones.