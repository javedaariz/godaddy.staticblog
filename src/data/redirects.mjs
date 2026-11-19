// Old URL -> new URL. Used by astro.config.mjs (HTML redirect pages that work on any
// static host) and scripts/gen-redirects.mjs (real 301s for Cloudflare Pages / Netlify).
const posts = {
  // Old numbered posts -> descriptive URLs
  '/blog-post1.html': '/money/10-practical-ways-to-save-money/',
  '/blog-post2.html': '/health/daily-habits-for-sustainable-health/',
  '/blog-post3.html': '/tech-ai/productivity-tools-for-professionals/',
  '/blog-post4.html': '/learn/online-learning-platforms/',
  '/blog-post5.html': '/freelancer-finance/how-online-stores-build-customer-trust/',
  '/blog-post6.html': '/freelancer-finance/digital-vs-physical-products/',
  '/blog-post7.html': '/freelancer-finance/financial-planning-for-uk-freelancers/',
  '/blog-post8.html': '/health/nutrition-tips-for-busy-professionals/',
  '/blog-post9.html': '/tech-ai/how-ai-is-changing-work/',
  '/blog-post10.html': '/learn/staying-motivated-in-self-paced-learning/',
};

export const redirects = {
  ...posts,
  ...Object.fromEntries(Object.entries(posts).map(([from, to]) => [from.replace('blog-post', 'blog-post-'), to])),
  // Old hub and utility pages
  '/blog.html': '/blog/',
  '/about.html': '/about/',
  '/contact.html': '/contact/',
  '/privacy.html': '/privacy/',
  '/terms.html': '/terms/',
  '/sitemap.html': '/sitemap/',
  '/finance.html': '/money/',
  '/health.html': '/health/',
  '/tech.html': '/tech-ai/',
  '/learning.html': '/learn/',
  '/remote.html': '/remote-work/',
  '/ecommerce.html': '/freelancer-finance/',
  '/topics/personal-finance.html': '/money/',
  '/topics/health-wellness.html': '/health/',
  '/topics/technology-tools.html': '/tech-ai/',
  '/topics/online-learning.html': '/learn/',
  '/topics/ecommerce-products.html': '/freelancer-finance/',
  '/topics/remote-work-travel.html': '/remote-work/',
};

// Only for hosts with real redirect support (_redirects). Astro cannot generate /index.html itself.
export const extraServerRedirects = { '/index.html': '/' };
