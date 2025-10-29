// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path'; // <--- ¡Asegúrate de importar 'path'!

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // ESTA ES LA LÍNEA PROBLEMÁTICA
    // Si la tuya se ve así:
    // setupFiles: 'src/setupTests.js',
    // O así:
    // setupFiles: './src/setupTests.js',

    // Intenta cambiarla por esto, usando path.resolve:
    setupFiles: [path.resolve(__dirname, 'src/setupTests.js')],
  },
});