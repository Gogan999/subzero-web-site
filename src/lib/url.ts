// The site is served from a sub-path on GitHub Pages (e.g. /subzero-web-site/).
// Always build internal links with withBase('/about/') so they work anywhere.

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (/^([a-z]+:|#|\/\/)/i.test(path)) return path;
  return base + (path.startsWith('/') ? path : `/${path}`);
}

/** True when `href` is the current page or one of its children. */
export function isActive(href: string, pathname: string): boolean {
  const target = withBase(href).replace(/\/$/, '');
  const current = pathname.replace(/\/$/, '');
  return current === target || current.startsWith(`${target}/`);
}
