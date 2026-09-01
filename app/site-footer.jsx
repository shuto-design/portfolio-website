"use client";

import { usePathname } from "next/navigation";
import { chromeFor, isCaseStudy } from "./site-chrome";
import { useShowing } from "./showing-context";

/* ============================================================================
   THE BOTTOM BAR

   The header's mirror image: a line of type, a rule, a caption. layout.jsx
   renders it after the page, so on a page whose content fills the window the
   shell's min-h-dvh holds it against the bottom edge, and on a long case study
   you scroll to reach it. Same markup either way — no fixed positioning, so it
   never covers anything.

   The words come from site-chrome.js, except on /work, where whichever tile
   you're pointing at — or have scrolled the row to — takes over.

   THERE IS NO BAR ON A CASE STUDY. Its two lines are the project's name and
   summary, and both are already on the page — the name in the wordmark at the
   top, the summary under it. A long read ending in a restatement of its own
   title adds a beat that says nothing.
   ============================================================================ */

export function SiteFooter() {
  const pathname = usePathname();
  const { showing: fromRow } = useShowing();

  // Hooks first, then the bail-out: React requires the same hooks to run on
  // every render of a component, so this cannot move above them.
  if (isCaseStudy(pathname)) return null;

  const base = chromeFor(pathname);

  // The provider lives in the layout and outlives a navigation, so a project
  // pointed at just before clicking through would otherwise still be showing
  // on the page you landed on. Only /work honours it.
  const bar = pathname === "/work" && fromRow ? fromRow : base;

  return (
    <footer className="mt-4">
      <p className="text-featured leading-none font-bold">{bar.label}</p>

      {/* aria-hidden for the same reason as the rule under the nav — see
          site-header.jsx. */}
      <div aria-hidden="true" className="bg-foreground mt-1 h-[var(--rule)]" />

      <p className="text-caption mt-2 leading-none font-medium">
        {bar.copy}
      </p>
    </footer>
  );
}
