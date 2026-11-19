// Writes public/_redirects (real 301s on Cloudflare Pages / Netlify).
// GitHub Pages ignores this file; it uses the HTML redirect pages Astro also generates.
import { writeFileSync } from 'node:fs';
import { redirects, extraServerRedirects } from '../src/data/redirects.mjs';

const lines = Object.entries({ ...redirects, ...extraServerRedirects }).map(([from, to]) => `${from} ${to} 301`);
writeFileSync(new URL('../public/_redirects', import.meta.url), lines.join('\n') + '\n');
console.log(`Wrote ${lines.length} redirects to public/_redirects`);
