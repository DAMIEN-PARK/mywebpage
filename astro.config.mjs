// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  site: 'https://mywebpage-bay.vercel.app',  // Vercel 배포 URL
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'static',  // 정적 사이트로 빌드
  adapter: vercel({
    analytics: true,  // Vercel 애널리틱스 활성화
  }),
});
