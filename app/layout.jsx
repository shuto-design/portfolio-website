import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/**
 * Geist, loaded as a variable font.
 *
 * `variable` exposes it as a CSS custom property rather than applying it
 * directly, which is what lets globals.css point --font-sans at it. One file
 * covers every weight from 100 to 900, so you can reach for any weight in
 * Figma without me adding anything here.
 *
 * Next downloads the font at build time and serves it from shuto.design.
 * Visitors never request anything from Google.
 */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  // Required. Every relative URL below is resolved against this, and Next 16
  // fails the build outright if it's missing rather than guessing localhost.
  metadataBase: new URL("https://shuto.design"),

  title: {
    default: "shuto.design",
    // Child pages set just their own name; this wraps it.
    // "Work" becomes "Work — shuto.design" automatically.
    template: "%s — shuto.design",
  },

  // TODO(shuto): your words. This is the sentence that shows up under the link
  // when someone pastes shuto.design into Slack, LinkedIn, or an email.
  description: "Graphic designer working in campaigns and design systems.",

  openGraph: {
    title: "shuto.design",
    description: "Graphic designer working in campaigns and design systems.",
    url: "https://shuto.design",
    siteName: "shuto.design",
    locale: "en_US",
    type: "website",
    // The preview image is a Figma deliverable. Drop a 1200x630 PNG or JPG at
    // app/opengraph-image.png and Next wires it up here on its own — no code
    // change needed. (PNG/JPG only, no SVG. Over 8MB fails the build.)
  },

  twitter: {
    card: "summary_large_image",
    title: "shuto.design",
    description: "Graphic designer working in campaigns and design systems.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
