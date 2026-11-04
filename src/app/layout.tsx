import type { Metadata } from "next";
import { IBM_Plex_Mono, Montserrat } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { SITE } from "@/data/site";
import "./globals.css";

// Weight 200 carries the display type — the wide-tracked look only reads as
// intentional at the thinnest weights.
const sans = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://usblifescience.com"
).replace(/\/+$/, "");
const metadataBase = new URL(`${siteUrl}/`);
// Resolve against the site URL once so a GitHub Pages project path is preserved.
const socialImage = new URL("assets/lifescience-social-1200x630.png", metadataBase).href;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  // Next resolves ./ against the current route, including static product/legal pages.
  alternates: { canonical: "./" },
  icons: {
    icon: [
      { url: `${base}/favicon.ico`, sizes: "16x16 32x32 48x48 64x64 128x128 256x256", type: "image/x-icon" },
      { url: `${base}/assets/lifescience-favicon-16.png`, sizes: "16x16", type: "image/png" },
      { url: `${base}/assets/lifescience-favicon-32.png`, sizes: "32x32", type: "image/png" },
      { url: `${base}/favicon.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: `${base}/assets/lifescience-apple-touch-icon-180.png`, sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
    url: "./",
    images: [{ url: socialImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: socialImage, alt: SITE.name }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SiteNav />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
