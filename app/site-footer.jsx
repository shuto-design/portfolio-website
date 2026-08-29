"use client";

import { usePathname } from "next/navigation";
import { chromeFor } from "./site-chrome";
import { useHover } from "./hover-context";

/* ============================================================================
   THE BOTTOM BAR

   The header's mirror image: a line of type, a rule, a caption. layout.jsx
   renders it after the page, so on a page whose content fills the window the
   shell's min-h-dvh holds it against the bottom edge, and on a long case study
   you scroll to reach it. Same markup either way — no fixed positioning, so it
   never covers anything.

   The words come from site-chrome.js, except on /work where hovering a tile
   takes over.
   ============================================================================ */

export function SiteFooter() {
  const pathname = usePathname();
  const { hovered } = useHover();

  const base = chromeFor(pathname);

  // The provider lives in the layout and outlives a navigation, so a project
  // hovered just before clicking through would otherwise still be showing on
  // the page you landed on. Only the grid page honours it.
  const showing = pathname === "/work" && hovered ? hovered : base;

  return (
    <footer className="mt-4">
      <p className="text-featured leading-none font-bold">{showing.label}</p>

      {/* aria-hidden for the same reason as the rule under the nav — see
          site-header.jsx. */}
      <div aria-hidden="true" className="bg-foreground mt-1 h-[var(--rule)]" />

      <p className="text-caption mt-2 leading-none font-medium">
        {showing.copy}
      </p>
    </footer>
  );
}
