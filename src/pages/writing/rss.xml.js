import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../data/site';

export async function GET(context) {
  const essays = (await getCollection('essays')).filter((entry) => !entry.data.draft);
  const travel = (await getCollection('travel')).filter((entry) => !entry.data.draft);
  const items = [...essays, ...travel]
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: entry.collection === 'travel' ? `/writing/travel/${entry.id}/` : `/writing/essays/${entry.id}/`,
    }));

  return rss({
    title: `${SITE.name} — Writing`,
    description: SITE.description,
    site: context.site,
    items,
  });
}
