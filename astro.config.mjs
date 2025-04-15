// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://mywebpage-bay.vercel.app',
  output: 'server',
  adapter: vercel({
    analytics: true,
    webAnalytics: {
      enabled: true
    },
    imageService: true,
    devImageService: 'sharp',
    imagesConfig: {
      sizes: [640, 750, 828, 1080, 1200, 1920],
      domains: [],
      formats: ['image/avif', 'image/webp'],
    },
  }),
  integrations: [mdx(), tailwind()],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
    },
  },
});
