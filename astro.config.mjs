// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

// ---------------------------------------------------------------------------
// Where the site is hosted.
//
// GitHub Pages (default): https://gogan999.github.io/subzero-web-site/
//   SITE = 'https://gogan999.github.io', BASE = '/subzero-web-site'
//
// Custom domain (e.g. https://subzerorobotics.org):
//   SITE = 'https://subzerorobotics.org', BASE = '/'
//   and add a file public/CNAME containing just: subzerorobotics.org
// ---------------------------------------------------------------------------
const SITE = 'https://gogan999.github.io';
const BASE = '/subzero-web-site';

/**
 * Lets Markdown posts link to pages like "/gallery/" without knowing the
 * base path: root-relative links get the base prefixed at build time.
 * @type {import('satteri').HastPluginDefinition}
 */
const baseLinks = {
  name: 'base-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const prefix = BASE.replace(/\/$/, '');
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(`${prefix}/`)) {
        ctx.setProperty(node, 'href', prefix + href);
      }
    },
  },
};

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [baseLinks] }),
  },
  image: {
    layout: 'constrained',
  },
});
