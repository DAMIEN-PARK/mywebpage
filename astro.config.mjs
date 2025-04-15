// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-site.vercel.app',  // 배포 후 실제 URL로 변경해주세요
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'server',  // Vercel의 서버리스 환경에 맞게 설정
  adapter: vercel(),
});
