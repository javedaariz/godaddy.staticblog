import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../data/site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', (p) => !p.data.draft)).sort((a, b) => +b.data.updatedDate - +a.data.updatedDate);
  return rss({
    title: site.name,
    description: site.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.updatedDate,
      link: `/${p.data.category}/${p.id}/`,
    })),
    customData: '<language>en-gb</language>',
  });
}
