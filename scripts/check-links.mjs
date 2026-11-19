// Post-build check: every internal link, image and script in dist/ must exist.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const dist = resolve('dist');
if (!existsSync(dist)) { console.error('dist/ not found, run the build first'); process.exit(1); }

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && htmlFiles.push(p);
  }
})(dist);

const exists = (urlPath) => {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  const target = join(dist, clean);
  return existsSync(target) && (!statSync(target).isDirectory() || existsSync(join(target, 'index.html')));
};

const ids = new Map();
let bad = 0;
const legacy = /^public-legacy/; // placeholder for future exclusions
for (const file of htmlFiles) {
  const rel = '/' + file.slice(dist.length + 1).replace(/index\.html$/, '');
  // Legacy standalone tools and the old tourist app are copied as-is and are not checked.
  if (/^\/(tourist-spots-explorer|CheapestCoastalTowns|[a-z_]+(calculator|converter)[a-z_]*)\b/.test(rel) && !rel.endsWith('/')) continue;
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|#|javascript:|\/\/)/.test(u)) continue;
    const abs = u.startsWith('/') ? u : join(dirname(rel), u);
    if (!exists(abs)) { console.error(`BROKEN  ${rel}  ->  ${u}`); bad++; }
  }
}
console.log(`Checked ${htmlFiles.length} HTML files. Broken internal links: ${bad}`);
process.exit(bad ? 1 : 0);
