import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://privacy-crypto.com',
  output: 'static',
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [sitemap({
    filter: (page) => !page.includes('/admin') && !page.includes('/communities'),
    lastmod: new Date(),
    i18n: {
      defaultLocale: 'it',
      locales: {
        it: 'it-IT',
        en: 'en-US'
      }
    }
  })],
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true
    }
  }
});