import rss from '@astrojs/rss';
import { site as team } from '../data/site';
import { getNews } from '../lib/content';

export async function GET(context) {
  const posts = await getNews();
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: `${team.name} News`,
    description: `News and updates from ${team.name}, FRC Team ${team.teamNumber}.`,
    site: new URL(import.meta.env.BASE_URL, context.site),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.summary,
      link: `${base}/news/${post.id}/`,
    })),
  });
}
