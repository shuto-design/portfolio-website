"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { chromeFor } from "./site-chrome";

/* ============================================================================
   THE SITE HEADER

   Rendered once by layout.jsx, so it wraps every page. Next keeps it mounted
   across navigation — moving from /work to /about re-renders the page below it
   and leaves this untouched.

   THE WORDMARK IS A PATH. "Shuto." on the homepage, "Shuto/Work." inside Work,
   "Shuto/Work/Example Project." on a case study — a folder path, and every
   segment is a link, so it walks back up as well as saying where you are.

   That's also why no link is ever underlined here any more: the section you're
   in is never in the right-hand list, because it's in the wordmark instead.
   There is nothing left to mark as current.

   It's a Client Component for one reason: usePathname. Reading the URL from a
   Server Component isn't supported, by design. It still renders to HTML on
   first load; the JS only redraws the path on later navigation.
   ============================================================================ */

export function SiteHeader() {
  const pathname = usePathname();
  const { crumbs, links } = chromeFor(pathname);

  /*
    The wordmark is the <h1> on the homepage and a plain <div> everywhere else.
    On /work the page's own title is the real heading — two <h1>s on one page is
    worse than none, and a screen reader reading "Shuto." as the title of every
    page tells you nothing about which page you're on.
  */
  const Wordmark = pathname === "/" ? "h1" : "div";

  return (
    <header>
      <div className="flex items-baseline justify-between gap-4">
        <Wordmark className="text-wordmark leading-none font-bold">
          <Link href="/">Shuto</Link>

          {crumbs.map(({ href, label }, i) => (
            <span key={href}>
              {/* The separators and the full stop are aria-hidden: they're the
                  shape of the wordmark, not words. A screen reader announcing
                  "Shuto slash Work full stop" is reading the logo aloud. */}
              <span aria-hidden="true">/</span>
              <Link
                href={href}
                aria-current={i === crumbs.length - 1 ? "page" : undefined}
              >
                {label}
              </Link>
            </span>
          ))}

          <span aria-hidden="true">.</span>
        </Wordmark>

        <nav className="text-nav flex gap-4 leading-none font-medium">
          {links.map(({ href, label }) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/*
        The rule is aria-hidden: the <header> and <main> landmarks already tell
        a screen reader where the page divides, so announcing it would only add
        noise — and an <hr> would be announced as a thematic break.
      */}
      <div aria-hidden="true" className="bg-foreground mt-1 h-[var(--rule)]" />
    </header>
  );
}
