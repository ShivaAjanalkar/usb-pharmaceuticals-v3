/** The deployed origin and project path; custom-domain migration is separate. */
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://shivaajanalkar.github.io/usb-pharmaceuticals-v3"
).replace(/\/+$/, "");

export function siteUrl(path = "/"): string {
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`;
}
