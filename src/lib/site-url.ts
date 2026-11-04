/** Public canonical origin; optional overrides support preview builds. */
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://usblifescience.com"
).replace(/\/+$/, "");

export function siteUrl(path = "/"): string {
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
}
