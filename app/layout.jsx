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

/**
 * Decides whether the homepage intro should play, and marks it played.
 *
 * This has to run before the browser's first paint, otherwise the finished
 * homepage would flash up for a frame before the intro started. An inline
 * script at the top of <body> executes synchronously during HTML parsing, which
 * is early enough. (Next's "Preventing Flash Before Hydration" guide covers
 * this pattern.)
 *
 * It also gives us once-per-session for free: inline scripts do not re-execute
 * on client-side navigation, so coming back from /work to / leaves the
 * attribute alone and the intro stays finished.
 *
 * sessionStorage throws outright in some privacy modes, hence the try/catch.
 * Failing means no intro, which is the safe direction.
 */
/*
 * One deliberate difference between dev and production: sessionStorage survives
 * a reload, so once-per-session would mean opening a new tab every time you
 * wanted to watch the intro again. In `npm run dev` it replays on every reload
 * so it can be iterated on; in production it plays once per session.
 */
const ONCE_PER_SESSION = process.env.NODE_ENV === "production";

const INTRO_GATE = `
(function () {
  try {
    if (${ONCE_PER_SESSION} && sessionStorage.getItem("intro") === "played") return;
    sessionStorage.setItem("intro", "played");
    document.documentElement.dataset.intro = "run";
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning because the script above sets a data attribute
    // on <html> before React hydrates. Without it React would treat the
    // attribute it did not render as a mismatch.
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground">
        <script
          type={
            typeof window === "undefined" ? "text/javascript" : "text/plain"
          }
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: INTRO_GATE }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
