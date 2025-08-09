import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/content'],
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  icon: {
    mode: 'css',
    cssLayer: 'base',
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
      includeCustomCollections: true,
    },
    serverBundle: {
      collections: ['uil', 'vscode-icons', 'solar'],
    },
  },
  content: {
    renderer: {
      anchorLinks: {
        h2: false,
        h3: false,
      },
    },
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },
});
