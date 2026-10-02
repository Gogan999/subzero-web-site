import type { ImageMetadata } from 'astro';
import { getCollection } from 'astro:content';

export const tiers = [
  { key: 'dynasty', label: 'Dynasty', amount: '$5,000+', size: 'xl' },
  { key: 'diamond', label: 'Diamond', amount: '$2,500+', size: 'lg' },
  { key: 'platinum', label: 'Platinum', amount: '$1,000+', size: 'md' },
  { key: 'gold', label: 'Gold', amount: '$500+', size: 'sm' },
  { key: 'silver', label: 'Silver', amount: 'Up to $499', size: 'xs' },
] as const;

export type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

// Sponsor logos: drop files into src/assets/sponsors/ and reference them by file name.
const logos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/sponsors/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
});

export async function getSponsors(status: 'current' | 'past' = 'current') {
  const all = await getCollection('sponsors', ({ data }) => data.status === status);
  return all.map((s) => {
    const tier = tiers.find((t) => t.key === s.data.tier);
    const logo = s.data.logo ? logos[`/src/assets/sponsors/${s.data.logo}`]?.default : undefined;
    const display = logo ? (s.data.display ?? 'logo') : 'name';
    return {
      id: s.id,
      ...s.data,
      logo,
      display,
      size: (s.data.size ?? tier?.size ?? 'md') as Size,
      tierInfo: tier,
    };
  });
}

export type Sponsor = Awaited<ReturnType<typeof getSponsors>>[number];

/** Current sponsors grouped by tier (biggest first), then untiered partners. */
export async function getSponsorGroups() {
  const sponsors = await getSponsors('current');
  const groups = tiers
    .map((t) => ({ key: t.key, label: t.label, amount: t.amount, sponsors: sponsors.filter((s) => s.tier === t.key) }))
    .filter((g) => g.sponsors.length > 0);
  const partners = sponsors.filter((s) => !s.tier);
  if (partners.length) groups.unshift({ key: 'partners', label: 'Partners', amount: '', sponsors: partners } as never);
  return groups;
}
