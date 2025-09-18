import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  output: 'static',
  site: 'https://bryan-portfolio.vercel.app',
  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
});
