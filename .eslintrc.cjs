/**
 * Configuración ESLint para myquota-page
 * TypeScript + React + Tailwind (mínima y comentada)
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    // Activar project si tienes tsconfig en la raíz para reglas de TypeScript más estrictas
    project: ['./tsconfig.json'],
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      // Detecta automáticamente la versión de React instalada
      version: 'detect'
    }
  },
  rules: {
    // Preferencias del equipo / calidad
    '@typescript-eslint/no-explicit-any': 'error',
    // Desactivar max-len porque Prettier se encarga del ancho
    'max-len': 'off',
    // Asegurar integración con Prettier
    'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    // Permitir el nuevo JSX transform (no necesita React en scope)
    'react/react-in-jsx-scope': 'off'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Reglas específicas para TS pueden ir aquí
      }
    }
  ]
};
