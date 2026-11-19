import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { redirects } from './src/data/redirects.mjs';

// Hubs with no published posts are marked noindex, so keep them out of the sitemap too.
const populated = new Set(
  readdirSync('./src/content/posts')
    .map((f) => readFileSync(`./src/content/posts/${f}`, 'utf8'))
    .filter((t) => !/^draft:\s*true/m.test(t))
    .map((t) => t.match(/^category:\s*(\S+)/m)?.[1]),
);
const emptyHub = (page) => {
  const m = new URL(page).pathname.match(/^\/([a-z-]+)\/$/);
  return m && ['freelancer-finance', 'money', 'tech-ai', 'remote-work', 'health', 'learn'].includes(m[1]) && !populated.has(m[1]);
};

// https://astro.build/config
export default defineConfig({
  site: 'https://www.suggestionsblog.co.uk',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects,
  integrations: [sitemap({ filter: (page) => !emptyHub(page) })],
  prefetch: { prefetchAll: false },
});
