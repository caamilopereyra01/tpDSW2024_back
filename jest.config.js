/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  globals: {'ts-jest': {useESM: true, },},
  moduleNameMapper: {
    // Mapear extensiones de TypeScript para Jest
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  preset: 'ts-jest/presets/default-esm', // Usa este preset para ESM
  testMatch: ['**/*.test.ts'], // Ruta de tus archivos de prueba
};