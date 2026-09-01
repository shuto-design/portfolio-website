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
    The wordmark is the page's <h1>, on every page.

    It used to be a heading only on the homepage, because a case study drew its
    own title underneath and two <h1>s are worse than none. That title is gone —
    it was the same words the wordmark was already showing — so the heading role
    follows the words up here.

    It earns the role because the wordmark is a path rather than a logo: it
    reads "Shuto/Work/Asset Resizenator." and names the page you are on, which
    is exactly what an <h1> is for. The separators are aria-hidden, so it is
    announced as "Shuto Work Asset Resizenator".

    No page draws its own any more. /about, /contact, /resume and the 404 each
    printed a heading that was the same word the wordmark was already showing —
    "Shuto/About." over "About" — so they went the same way the case study's
    title did. If a page ever needs a heading of its own again, this has to go
    back to being conditional: two on one page is the thing being avoided here.
  */
  const Wordmark = "h1";

  return (
    <header>
      <div className="flex items-baseline justify-between gap-4">
        <Wordmark className="text-wordmark leading-none font-bold">
          <Link href="/">Shuto</Link>

          {crumbs.map(({ href, label }, i) => (
            <span key={href ?? label}>
              {/* The separators and the full stop are aria-hidden: they're the
                  shape of the wordmark, not words. A screen reader announcing
                  "Shuto slash Work full stop" is reading the logo aloud. */}
              <span aria-hidden="true">/</span>
              {href ? (
                <Link
                  href={href}
                  aria-current={i === crumbs.length - 1 ? "page" : undefined}
                >
                  {label}
                </Link>
              ) : (
                /* The 404's crumb, and the only one without an href. Every
                   other last crumb links to itself; a page that doesn't exist
                   has nothing to point at. */
                <span aria-current="page">{label}</span>
              )}
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
