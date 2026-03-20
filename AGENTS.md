AGENTS.md - Equipo y Convenciones del proyecto myquota-page

Propósito
- Este archivo explica quiénes somos, las convenciones y el flujo de trabajo para el repo `myquota-page`. Úsalo como referencia rápida cuando trabajes en este proyecto.

Tech stack recomendado
- Base: Vite + React + TypeScript (plantilla `react-ts`). Recomendaciones de versión: React 18+; Vite (última estable); Tailwind CSS 3+.
- Comando para crear el proyecto (ejemplo):

```bash
# crear proyecto con plantilla TypeScript
npm create vite@latest myquota-page -- --template react-ts
cd myquota-page
```

- Instalar Tailwind (pasos resumidos):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

# Edita `tailwind.config.ts` y añade las rutas de contenido (p. ej. `./index.html`, `./src/**/*.{ts,tsx}`), y añade las directivas de Tailwind en tu CSS de entrada (`src/index.css` o `src/styles/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Convenciones del proyecto
- Estructura recomendada (en `src/`):
  - `src/main.tsx` — entrypoint de la app
  - `src/App.tsx` — componente raíz
  - `src/components/` — componentes React en PascalCase (ej. `Header.tsx`, `UserCard.tsx`)
  - `src/hooks/` — hooks personalizados (ej. `useAuth.ts`)
  - `src/pages/` — vistas o páginas (si se usa enrutado)
  - `src/services/` o `src/lib/` — lógica de integración (API helpers, clientes)
  - `src/assets/` — imágenes, fuentes y otros activos que se procesan por Vite
  - `public/` — archivos estáticos servidos tal cual

- Convenciones de nombres y estilo:
  - Componentes en PascalCase y un archivo = un componente por archivo.
  - Hooks en `camelCase` prefijados con `use` (ej. `useFetchQuota`).
  - Archivos utilitarios en `kebab-case` o `camelCase` según la convención del equipo.
  - Usar alias `@/` para referirse a `src/` (configurar en `tsconfig.json` y `vite.config.ts`).

Flujo de desarrollo y comandos habituales
- Dependencias y scripts comunes en `package.json` (ejemplos):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "vitest",
    "format": "prettier --write .",
    "deploy:copy": "rsync -av --delete dist/ \"$DEPLOY_TARGET\" || cp -r dist/* \"$DEPLOY_TARGET\""
  }
}
```

- Descripción rápida:
  - `npm run dev` — iniciar servidor de desarrollo
  - `npm run build` — generar compilado de producción (`dist/`)
  - `npm run preview` — servir build localmente para ver resultados
  - `npm run lint` — ejecutar linters
  - `npm run test` — ejecutar tests
  - `npm run format` — formatear código

Normas CRITICAL (adaptadas de `myquota-app/AGENTS.md`)
- TypeScript con `strict: true` en `tsconfig.json`. Evitar `any` salvo casos extraordinarios documentados.
- Importaciones absolutas con alias `@/` en lugar de rutas relativas largas.
- Todas las llamadas a la API deben envolver `fetch` en `try/catch` y manejar errores de red y respuesta (status !== 2xx).
- Usar un helper central `requestWithAuth` (o similar) para adjuntar tokens, refrescar credenciales y normalizar errores.
- Validación de datos entrantes y salientes (schemas con Zod/TypeBox/ajuste elegido) cuando aplique.
- Evitar lógica pesada en componentes; mover a hooks o servicios.

Normas NEVER (cosas que no se deben hacer)
- NUNCA desactivar TypeScript strict o añadir `// @ts-ignore` sin revisar alternativas.
- NUNCA almacenar secretos o credenciales en el repo. Usar variables de entorno para secretos.

Deploy
- El compilado producido por `npm run build` (carpeta `dist/`) debe copiarse al path apuntado por la variable de entorno `DEPLOY_TARGET`.
- Ejemplo de script en `package.json` (ver arriba) que usa `DEPLOY_TARGET`:

```bash
npm run build && npm run deploy:copy
```

- Importante: la ruta privada real de despliegue se guarda en la configuración del orquestador y NO se incluye en este archivo. Cuando quieras que el orquestador haga la copia final al servidor privado, di exactamente la frase: "copia compilado". El orquestador usará la ruta privada guardada y ejecutará la copia.

Seguridad y privacidad
- No incluir secretos, claves API, tokens o rutas privadas en este documento ni en el repositorio.
- Usa `.env` para variables de entorno y añade `.env` y `.env.*` a `.gitignore`.

Cómo pedir al orquestador que haga la copia final
- Frase exacta que debes decir al orquestador (sin comillas):

  copia compilado

Referencias
- Ver `myquota-app/AGENTS.md` para reglas y convenciones avanzadas y para la fuente original de las normas (detalles de CI/CD, scripts y helpers compartidos).

----

Notas finales
- Este archivo es una guía mínima para acelerar la migración a React + Tailwind + TypeScript y mantener coherencia con `myquota-app`. Si necesitas que el orquestador cree plantillas, configura `vite`, `tsconfig` y `tailwind` automáticamente, solicita la tarea correspondiente (por ejemplo, `sdd-apply` o pedir al orquestador). 
