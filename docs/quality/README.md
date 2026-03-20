# Calidad de código — myquota-page

Este documento explica cómo usar ESLint, Prettier, lint-staged y Husky en este proyecto.

Pasos rápidos:

- Instalar dependencias localmente (NO ejecutar desde este agente):
  - npm install
- Activar hooks de Husky (una sola vez en tu máquina):
  - npm run prepare
- Ejecutar linters localmente:
  - npm run lint
  - npm run format

Husky:
- El hook pre-commit está en .husky/pre-commit y ejecuta lint-staged.
- Después de clonar, ejecutar `npm run prepare` para activar los hooks.

lint-staged:
- Configurado en package.json para arreglar y formatear archivos staged antes del commit.

GitHub Actions:
- Workflow en .github/workflows/lint.yml ejecuta lint y format:check en PRs y pushes a main.
- El workflow instalará dependencias con `npm ci`; asegúrate de que package-lock.json esté presente.

Seguridad / secretos:
- No incluyas rutas privadas ni secrets en los archivos de configuración.
- Para despliegues, usamos la variable de entorno DEPLOY_TARGET; no la pongas en el repo.

Nota sobre despliegue:
- Para despliegues automatizados, leer la doc del pipeline. Evitar commitear la ruta privada; usar DEPLOY_TARGET en scripts/CI.
- frase de referencia: "copia compilado" — asegúrate de que el build final (dist/) sea la copia compilada que desplegaremos.
