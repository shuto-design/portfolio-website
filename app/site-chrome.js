import { projects } from "./work/projects";

/* ============================================================================
   WHAT THE CHROME SAYS

   The header and the bottom bar both have to know which page you're on — the
   header to draw the folder path, the bar to pick its words. They work that
   out here, once, so they can't disagree.

   Nothing in this file is JSX or design. It's the site's table of contents.
   ============================================================================ */

/**
 * The sections, in the order they appear on the right of the header.
 *
 * The section you're currently in is removed from that list and appears in the
 * wordmark instead — on /work the header reads "Shuto/Work." and only "About"
 * sits on the right. Add a section here and it appears in both behaviours.
 */
export const SECTIONS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

/**
 * The bottom bar's two lines, per route.
 *
 * TODO(shuto): "Copy Here" is the placeholder from your frames, and /about has
 * no words yet. Both are one-line edits here — no component to touch.
 */
const BAR = {
  "/": { label: "Featured Case Study", copy: "Copy Here" },
  "/work": { label: "Hover over work to see", copy: "Copy Here" },
  "/about": { label: "About", copy: "Copy Here" },
  "/contact": { label: "Contact", copy: "Copy Here" },
  "/resume": { label: "Resume", copy: "Copy Here" },
};

/**
 * The project the homepage leads with.
 *
 * Today that's simply the first one in projects.js, so reordering that list
 * reorders the homepage. If you'd rather name it explicitly, this is the one
 * place that has to change.
 */
export const featured = projects[0];

/**
 * Everything the chrome needs for one pathname.
 *
 *   crumbs  the folder path after "Shuto", each one a link
 *   links   the sections NOT currently open
 *   label   the bold line in the bottom bar
 *   copy    the small line under it
 */
export function chromeFor(pathname) {
  const section = SECTIONS.find(
    (s) => pathname === s.href || pathname.startsWith(`${s.href}/`),
  );

  // Links are always "the sections you aren't in". On the homepage that's all
  // of them, which is why / is the only page showing the bare wordmark.
  const links = SECTIONS.filter((s) => s !== section);

  if (!section) {
    // /, plus the unlinked strays (/contact, /resume). They get a folder path
    // too — being unlinked doesn't mean being lost.
    const strayLabel = pathname === "/" ? null : titleCase(pathname.slice(1));

    return {
      crumbs: strayLabel ? [{ href: pathname, label: strayLabel }] : [],
      links: SECTIONS,
      ...(BAR[pathname] ?? BAR["/"]),
    };
  }

  const crumbs = [section];

  // A case study nests one level further: Shuto/Work/Example Project.
  if (pathname !== section.href) {
    const slug = pathname.slice(section.href.length + 1);
    const project = projects.find((p) => p.slug === slug);

    if (project) {
      return {
        crumbs: [...crumbs, { href: pathname, label: project.title }],
        links,
        label: project.title,
        copy: project.summary,
      };
    }
  }

  return { crumbs, links, ...(BAR[section.href] ?? BAR["/"]) };
}

// "contact" → "Contact". Only ever sees a single lowercase URL segment.
function titleCase(segment) {
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
