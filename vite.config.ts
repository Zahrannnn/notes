import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Split stable vendor libraries into their own chunks so app code changes do
// not invalidate them between deploys (long-term caching + parallel loads).
function manualChunks(id: string): string | undefined {
  const modulePath = id.replace(/\\/g, '/');
  if (!modulePath.includes('/node_modules/')) {
    return undefined;
  }

  if (
    modulePath.includes('/node_modules/react/') ||
    modulePath.includes('/node_modules/react-dom/') ||
    modulePath.includes('/node_modules/scheduler/')
  ) {
    return 'react';
  }

  if (modulePath.includes('/node_modules/react-router')) {
    return 'router';
  }

  if (
    modulePath.includes('/node_modules/@reduxjs/') ||
    modulePath.includes('/node_modules/react-redux/') ||
    modulePath.includes('/node_modules/@tanstack/')
  ) {
    return 'state';
  }

  return undefined;
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
