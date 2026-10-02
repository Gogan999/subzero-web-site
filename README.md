# SubZero Robotics website

The website for **SubZero Robotics, FIRST Robotics Competition Team 5690** from Esko, Minnesota.

- **Live site:** https://gogan999.github.io/subzero-web-site/
- **Built with:** [Astro](https://astro.build), a fast static-site generator. There's no server or database to maintain.
- **Hosted on:** GitHub Pages (free). Every push to `main` rebuilds and publishes the site automatically.

Most updates are just editing a text file. You don't need to know how to code.

---

## Quick reference: where things live

| I want to… | Edit this |
| --- | --- |
| Post news | Add a file to `src/content/news/` |
| Add a photo album | Add photos to `src/assets/gallery/<album>/` + a file in `src/content/albums/` |
| Add a new season / results / awards | `src/data/seasons.yaml` |
| Update sponsors | `src/data/sponsors.yaml` + logos in `src/assets/sponsors/` |
| Add a robot | `src/data/robots.yaml` + photo in `src/assets/robots/` |
| Update coaches & mentors | `src/data/people.yaml` |
| Change emails, address, social links | `src/data/site.ts` |
| Change departments or core values | `src/data/subteams.ts` |
| Change page text | `src/pages/*.astro` (e.g. `about.astro`) |

You can make all of these edits right on GitHub.com: open the file, click the ✏️ pencil, edit, then **Commit changes**. The site updates a minute or two later.

---

## Common tasks

### Post a news article

1. Create a new file in `src/content/news/` named `YYYY-MM-DD-short-title.md`, for example `2027-03-08-lake-superior-recap.md`.
2. Paste this at the top and fill it in:

   ```markdown
   ---
   title: "Lake Superior Regional Recap"
   date: 2027-03-08
   summary: "One or two sentences that show up on the news cards."
   cover: ../../assets/news/lake-superior-2027.jpg   # optional
   coverAlt: "Describe the photo for screen readers"   # needed if you use a cover
   tags: ["2027 Season", "Competition"]
   ---

   Write the article here. Use **bold**, *italics*, ## headings and [links](/history/).

   ![Describe the photo](../../assets/news/another-photo.jpg)
   ```

3. Put any photos in `src/assets/news/`.

The URL drops the date: `2027-03-08-lake-superior-recap.md` becomes `/news/lake-superior-recap/`. Links to other pages on the site can start with `/` (like `/gallery/`), and the site fixes them up automatically. Add `draft: true` to hide a post until it's ready.

### Add a photo album (e.g. from the team Google Drive)

1. Download the photos you want from Drive. Pick the best 10–20: quality beats quantity.
2. Make a folder `src/assets/gallery/2027-lake-superior-regional/` and put the photos in it. Photos show up in file-name order, so `01.jpg`, `02.jpg`, … works well.
3. Shrink them so the repo stays small: `npm run images` (or ask someone with Node installed). This resizes big phone photos, rotates them upright, and strips GPS location data.
4. Create `src/content/albums/2027-lake-superior-regional.yaml`. The file name must match the folder name:

   ```yaml
   title: "2027 Lake Superior Regional"
   date: 2027-03-06
   description: "One or two sentences about the event."
   cover: 03.jpg          # optional, defaults to the first photo
   captions:              # optional
     01.jpg: "Our drive team before the finals"
     05.jpg: "Celebrating the Creativity Award"
   ```

> ⚠️ Phone photos in HEIC format need to be converted to JPG first. Google Drive's download usually does this for you.

### Add a new season

Open `src/data/seasons.yaml`, copy the top entry, paste it above, and update it. Official results are at `https://frc-events.firstinspires.org/<year>/team/5690`. The home page stats (seasons, awards, regional titles, Championship trips) and the "Latest season" card update automatically.

Set `highlight: true` for a big season (a trophy marker), and `album: <album-id>` to link a photo album.

### Update sponsors

Edit `src/data/sponsors.yaml`. Each sponsor can have:

| Field | What it does |
| --- | --- |
| `status` | `current` (shown on the sponsor wall) or `past` (thank-you list) |
| `tier` | `dynasty` ($5,000+), `diamond` ($2,500+), `platinum` ($1,000+), `gold` ($500+), `silver` (up to $499). Bigger tiers are shown bigger and first. Leave it out for in-kind partners. |
| `logo` | an image file in `src/assets/sponsors/` (e.g. `gene-haas.png`) |
| `display` | `logo`, `name` or `both` (default: logo if there is one, otherwise the name) |
| `size` | `xl`, `lg`, `md`, `sm` or `xs` to override the size the tier gives |
| `url` | optional link to their website |

Sponsor amounts are never shown on the site, only the tier names.

### Add or update a robot

Edit `src/data/robots.yaml` (newest first) and put a photo in `src/assets/robots/` named after the year (e.g. `2027.jpg`). Each robot can list a few short `specs`, a `binder` link and a `video` link. Awards are pulled in automatically from `seasons.yaml`.

---

## Working on the site on your computer

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install        # first time only
npm run dev        # live preview at http://localhost:4321/subzero-web-site/
npm run check      # check for mistakes (bad dates, missing fields, broken images, ...)
npm run build      # build the final site into dist/
npm run images     # shrink large photos in src/assets
```

If you make a mistake in a data file (like a misspelled field or a missing image), `npm run check` and the build will tell you exactly which file and line.

---

## Deployment

The site deploys with GitHub Actions (`.github/workflows/deploy.yml`) whenever `main` changes.

**One-time setup:** in the GitHub repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

Pull requests are checked automatically (`.github/workflows/check.yml`), so you'll know a change builds before you merge it.

### Using a custom domain (optional)

If the team gets a domain like `subzerorobotics.org`:

1. In `astro.config.mjs`, set `SITE = 'https://subzerorobotics.org'` and `BASE = '/'`.
2. Create `public/CNAME` containing just `subzerorobotics.org`.
3. In **Settings → Pages**, enter the custom domain, then point the domain's DNS at GitHub Pages ([instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

---

## Project layout

```
src/
  assets/       images: brand/, gallery/<album>/, news/, sponsors/
  components/   reusable pieces (header, footer, cards, icons)
  content/      news posts (Markdown) and photo albums (YAML)
  data/         seasons, sponsors, people, site info
  layouts/      page wrapper (SEO tags, header, footer)
  lib/          small helpers
  pages/        one file per page; folders become URLs
  styles/       global.css (colors, fonts, spacing)
public/         files copied as-is (favicons, social share image)
scripts/        optimize-images.mjs
```

Colors, fonts and spacing are CSS variables at the top of `src/styles/global.css`. Light and dark mode follow each visitor's device setting.

---

*FIRST® and FIRST® Robotics Competition are registered trademarks of FIRST.*
