import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

export async function getNews() {
  const posts = await getCollection('news', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getSeasons() {
  const seasons = await getCollection('seasons');
  return seasons.sort((a, b) => Number(b.id) - Number(a.id));
}

export async function getTeamStats() {
  const seasons = await getSeasons();
  const awards = seasons.flatMap((s) => s.data.awards);
  const events = seasons.flatMap((s) => s.data.events);
  return {
    seasons: seasons.length,
    awards: awards.length,
    regionalWins: awards.filter((a) => a.name === 'Regional Winners').length,
    championships: events.filter((e) => e.name.startsWith('FIRST Championship')).length,
  };
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Robot photos live in src/assets/robots/ (named "<year>.jpg" by default).
const robotPhotos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/robots/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

export async function getRobots() {
  const [robots, seasons] = await Promise.all([getCollection('robots'), getCollection('seasons')]);
  const awardsByYear = new Map(seasons.map((s) => [s.id, s.data.awards]));
  return robots
    .map((r) => {
      const file = r.data.photo ?? Object.keys(robotPhotos).find((p) => /\/(\d{4})\.\w+$/.exec(p)?.[1] === r.id)?.split('/').pop();
      return {
        year: r.id,
        ...r.data,
        image: file ? robotPhotos[`/src/assets/robots/${file}`]?.default : undefined,
        awards: awardsByYear.get(r.id) ?? [],
      };
    })
    .sort((a, b) => Number(b.year) - Number(a.year));
}

export type Robot = Awaited<ReturnType<typeof getRobots>>[number];
