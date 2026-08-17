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

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.shortName}`,
  },
  description: SITE.description,
  icons: {
    icon: `${base}/assets/usb-favicon-180.png`,
    apple: `${base}/assets/usb-appicon-512.png`,
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
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
