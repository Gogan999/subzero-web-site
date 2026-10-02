// Shrinks big photos (straight off a phone or Google Drive) before you commit them.
//
//   npm run images                 → optimizes everything in src/assets
//   npm run images -- path/to/dir  → optimizes just that folder
//
// Photos larger than 1600px are resized, rotated upright, stripped of location
// metadata, and re-saved as reasonably sized JPEG/PNG/WebP files. Files that
// are already small are left alone, so it's safe to run any time.

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import sharp from 'sharp';

const MAX_EDGE = 1600;
const MAX_BYTES = 450 * 1024;
const root = process.argv[2] ?? 'src/assets';
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (exts.has(extname(entry.name).toLowerCase())) yield path;
  }
}

let changed = 0;
let saved = 0;
for await (const file of walk(root)) {
  const before = (await stat(file)).size;
  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
  if (longEdge <= MAX_EDGE && before <= MAX_BYTES) continue;

  let img = sharp(input).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  const ext = extname(file).toLowerCase();
  if (ext === '.png') img = img.png({ compressionLevel: 9, palette: true });
  else if (ext === '.webp') img = img.webp({ quality: 80 });
  else img = img.jpeg({ quality: 80, mozjpeg: true });

  const output = await img.toBuffer();
  if (output.length >= before && longEdge <= MAX_EDGE) continue;
  await writeFile(file, output);
  changed++;
  saved += before - output.length;
  console.log(`✓ ${relative('.', file)}  ${(before / 1024).toFixed(0)} KB → ${(output.length / 1024).toFixed(0)} KB`);
}

console.log(changed ? `\nOptimized ${changed} image(s), saved ${(saved / 1024 / 1024).toFixed(1)} MB.` : 'All images are already optimized.');
