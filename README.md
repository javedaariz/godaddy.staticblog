# Suggestions Blog
removed 
UK guides for freelancers and remote workers. Built with [Astro](https://astro.build) (static output), Markdown content, self-hosted Inter font, no client-side framework.

## Run it locally (Node 22+)

```bash
npm install
npm run dev        # http://localhost:4321 with live reload
npm run build      # builds to dist/ and checks every internal link
npm run preview    # serve the built site locally
```

## Add or edit an article

Create `src/content/posts/your-topic-slug.md`. The file name becomes the URL: `/<category>/<file-name>/`.
The build fails if a required field is missing, which enforces the editorial rules:

```yaml
---
title: "Under 70 characters"
description: "70-160 characters for search results"
summary: "The 2-3 sentence direct answer, shown at the top"
category: freelancer-finance   # money | tech-ai | remote-work | health | learn
pubDate: 2026-11-18
updatedDate: 2026-11-18        # change only after re-checking the facts
sources:
  - title: "GOV.UK page"
    url: "https://www.gov.uk/..."
handsOn: no                    # shows a "not hands-on tested" label
affiliate: true                # shows an affiliate disclosure
draft: true                    # keeps it unpublished
---
```

Finance and health categories show a "not advice" notice automatically.

## Before going live: things only you can fill in

| What | Where |
| --- | --- |
| Author name and bio (no credentials you do not hold) | `src/data/site.ts` |
| Contact email | GitHub repo Settings > Variables > `PUBLIC_CONTACT_EMAIL` |
| Newsletter form URL (Buttondown, Mailchimp, etc.) | Variable `PUBLIC_NEWSLETTER_ACTION`. The sign-up box is hidden on the live site until set |
| Social profile URLs | `src/data/site.ts` |
| Check the Editorial policy matches how you really work | `src/pages/editorial-policy/index.astro` |

## Validate before hosting

1. Work on a branch (this one is `modern-rebuild`). Pushing it runs `.github/workflows/ci.yml`: build + link check. Nothing is published.
2. Download the `site-preview` artifact from the Actions run, or run `npm run build && npm run preview` locally.
3. Open a pull request into `main`. Merging it is what publishes.

## Hosting

**GitHub Pages (works with your existing custom domain):**
Repo Settings > Pages > Build and deployment > Source: **GitHub Actions**. `public/CNAME` keeps `www.suggestionsblog.co.uk`.
Note: GitHub Pages cannot send real 301 redirects. Old URLs (`blog-post1.html`, etc.) use HTML redirect pages instead, which work for visitors and search engines but are weaker than a 301.

**Cloudflare Pages (optional, real 301s and branch preview URLs):**
Build command `npm run build`, output `dist`. The build writes `public/_redirects` with 301s for every old URL, and every branch gets its own preview link.

## Layout

```
src/content/posts/   articles (Markdown)
src/data/site.ts     site name, author, categories, nav
src/data/redirects.mjs   old URL -> new URL
src/layouts, components, pages, styles
public/              copied as-is: CNAME, favicon, legacy calculators, tourist-spots-explorer
scripts/             redirects generator, link checker, social image generator
```
