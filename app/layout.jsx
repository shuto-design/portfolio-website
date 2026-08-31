import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { HoverProvider } from "./hover-context";
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

/**
 * The page shell.
 *
 * Every page on the site sits inside this one div, which is what makes the
 * header look nailed in place: the side margin, the top padding above the
 * wordmark, and the rule's width are decided once here rather than repeated
 * (and drifting) on each page.
 *
 * `min-h-dvh` + `flex flex-col` is a height chain, not decoration. The header
 * and the bottom bar are each as tall as their contents; the page between them
 * takes `flex-1` and absorbs everything left over. That's what pins the bar to
 * the bottom edge on the landing and Work pages, and what lets the hero and the
 * work grid fill the window without either one being told a height.
 *
 * On a long case study the same chain just grows past the window and scrolls.
 *
 * THE BOTTOM IS DELIBERATELY HEAVIER THAN THE TOP — pb-4 (32px) against pt-3
 * (24px). It isn't an optical judgement and it isn't a typo. Every browser
 * draws its link-URL preview as a small overlay pinned to the bottom-left of
 * the window, roughly 20-24px tall. That overlay is browser chrome, not part
 * of the document, so no CSS can move or hide it.
 *
 * On /work it lands exactly where the bar's caption sits, at exactly the
 * moment it matters: hovering a tile is both what summons the overlay AND
 * what writes the project's summary into the bar. 24px left the caption
 * touching it; 32px clears the tallest of them.
 *
 * So read this value as a safe area rather than as spacing. If the bottom bar
 * ever stops being the last thing in the shell, this can go back to pb-3.
 */
const SHELL = "px-gutter flex min-h-dvh flex-col pt-3 pb-4";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-background text-body leading-body font-medium font-sans text-foreground">
        {/* The provider wraps both, because the tiles inside {children} change
            words inside <SiteFooter />. */}
        <HoverProvider>
          <div className={SHELL}>
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </HoverProvider>
        <Analytics />
      </body>
    </html>
  );
}
