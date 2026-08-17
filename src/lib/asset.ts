const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a public-folder path with the deployment base path.
 *
 * `next/image` applies basePath to *optimized* sources only; with
 * `images.unoptimized` (required for a static export) the src is emitted
 * verbatim, which 404s on a GitHub Pages project site served from /<repo>.
 */
export function asset(path: string): string {
  return `${BASE}${path}`;
}
