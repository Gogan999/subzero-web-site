import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

// Every photo in src/assets/gallery/<album>/ is picked up automatically.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/gallery/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export interface Photo {
  file: string;
  image: ImageMetadata;
  caption?: string;
}

export interface Album {
  id: string;
  data: CollectionEntry<'albums'>['data'];
  photos: Photo[];
  cover?: Photo;
  year: number;
}

function photosFor(id: string): Photo[] {
  const prefix = `/src/assets/gallery/${id}/`;
  return Object.entries(files)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, mod]) => ({ file: path.slice(prefix.length), image: mod.default }))
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }));
}

export async function getAlbums(): Promise<Album[]> {
  const entries = await getCollection('albums');
  return entries
    .map((entry) => {
      const photos = photosFor(entry.id).map((p) => ({ ...p, caption: entry.data.captions[p.file] }));
      const cover = photos.find((p) => p.file === entry.data.cover) ?? photos[0];
      return { id: entry.id, data: entry.data, photos, cover, year: entry.data.date.getUTCFullYear() };
    })
    .filter((album) => album.photos.length > 0)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function photoAlt(album: Album, photo: Photo, index: number): string {
  return photo.caption ?? `${album.data.title}, photo ${index + 1} of ${album.photos.length}`;
}
