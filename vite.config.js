import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/CodeAlpha_Portfolio/',
  plugins: [react()],
  server: {
    host: true,
  },
  
});