import { defineConfig } from 'vite';
import { resolve } from 'path';

// Multi-page static site. Each HTML file is a build entry.
// Static assets (images, fonts, styles, scripts, favicon, robots, sitemap)
// live in /public and are served at the site root (/images/..., /styles/..., etc.).
export default defineConfig({
  appType: 'mpa',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        solution: resolve(__dirname, 'solution.html'),
        business: resolve(__dirname, 'business.html'),
        content: resolve(__dirname, 'content.html'),
        community: resolve(__dirname, 'community.html'),
        about: resolve(__dirname, 'about.html'),
        expertFalasifah: resolve(__dirname, 'expert-falasifah.html'),
        eduEnergiKomunitas: resolve(__dirname, 'educational-energi-komunitas.html'),
        eduPltsSimulasi: resolve(__dirname, 'educational-plts-simulasi.html'),
      },
    },
  },
});
