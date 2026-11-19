// Generates public/og-default.png (1200x630) with sharp. Run: node scripts/make-og.mjs
import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#16594a"/><stop offset="1" stop-color="#1f7a66"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<rect x="80" y="90" width="84" height="84" rx="20" fill="#fff" fill-opacity=".16"/>
<text x="122" y="152" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="800" fill="#fff" text-anchor="middle">S</text>
<text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="800" fill="#fff">Clear UK guides for</text>
<text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="800" fill="#fff">freelancers and remote workers</text>
<text x="80" y="520" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#fff" fill-opacity=".85">Dated, sourced and answer-first  ·  suggestionsblog.co.uk</text>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile(new URL('../public/og-default.png', import.meta.url).pathname);
console.log('og-default.png written');
