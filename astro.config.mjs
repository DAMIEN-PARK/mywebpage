// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://mywebpage-bay.vercel.app',  // Vercel 배포 URL
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'server',  // Vercel의 서버리스 환경에 맞게 설정
  adapter: vercel(),
});
