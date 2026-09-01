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
 * THIS DOUBLES AS THE LIST OF PAGES THAT EXIST: a pathname that isn't a key
 * here is a 404, and chromeFor treats it as one. So adding a route means adding
 * a line here too — and /about has to keep its line even though its bar is no
 * longer drawn, or the page itself stops existing.
 *
 * TODO(shuto): "Copy Here" is the placeholder from your frames. Only the lines
 * for the routes in WITH_BAR are ever read, so / and /work are the two worth
 * writing. One-line edits here — no component to touch.
 */
const BAR = {
  "/": { label: "Featured Case Study", copy: "Copy Here" },
  "/work": { label: "Hover over work to see", copy: "Copy Here" },
  "/about": { label: "About", copy: "Copy Here" },
  "/contact": { label: "Contact", copy: "Copy Here" },
  "/resume": { label: "Resume", copy: "Copy Here" },
};

/**
 * The whole chrome for a page that doesn't exist. One 404 for every miss —
 * a typo, an old link, a case study that's been renamed.
 *
 * The crumb carries no href. Every other last crumb links to itself, but a
 * 404 isn't a resource, and handing it the URL that missed would put the
 * broken address back into the wordmark as a live link.
 *
 * Both values are constants rather than anything read off the URL, so the
 * 404 HTML — built once and reused for every bad address — says the same
 * thing the browser does. Deriving either from the path would reintroduce
 * the hydration mismatch 604e27f fixed.
 *
 * `label` and `copy` are no longer drawn anywhere — a 404 has no bar; see
 * WITH_BAR below. They stay so that every chromeFor return has the same shape,
 * and so the words are already written if the bar ever comes back here.
 */
const NOT_FOUND = {
  crumbs: [{ href: null, label: "404" }],
  links: SECTIONS,
  label: "404",
  copy: "That page isn't here.",
};

/**
 * The project the homepage leads with.
 *
 * Today that's simply the first one in projects.js, so reordering that list
 * reorders the homepage. If you'd rather name it explicitly, this is the one
 * place that has to change.
 */
export const featured = projects[0];

/*
  The homepage renders featured.cover.src and nothing else, so an empty
  projects.js — or a first project still missing its cover — takes the build
  down with "Cannot read properties of undefined". Fail here instead, where
  the message says which file to open.
*/
if (!featured?.cover?.src) {
  throw new Error(
    "site-chrome.js: the homepage leads with the first project in projects.js, " +
      "and that project needs a `cover` with a `src`. Check projects.js.",
  );
}

/**
 * The pages that get a bottom bar.
 *
 * The bar earns its place where it says something the page doesn't. It labels
 * the homepage's full-bleed hero, which has no other caption, and it names the
 * tile you're pointing at on /work, which is the only label those tiles have.
 *
 * Everywhere else it was repeating the wordmark. A case study's two lines are
 * the project's name and summary, both already above the work. /about's would
 * be "About" under a wordmark reading "Shuto/About." The 404's were "404" and a
 * sentence the page says better in its own words.
 *
 * /contact and /resume are here for an unglamorous reason rather than a
 * principled one: they are unlinked stubs with almost nothing on them, and
 * without the bar they would render as a header over an empty page. When either
 * gets real content, take it out of this list.
 *
 * A positive list rather than a set of exclusions, because it also gets 404s
 * right for free — an address that isn't a page isn't in here either.
 */
const WITH_BAR = new Set(["/", "/work", "/contact", "/resume"]);

export function showsBar(pathname) {
  return WITH_BAR.has(pathname);
}

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
    // A pathname with no line in BAR is a page that doesn't exist.
    const bar = BAR[pathname];
    if (!bar) return NOT_FOUND;

    // /, plus the unlinked strays (/contact, /resume). They get a folder path
    // too — being unlinked doesn't mean being lost.
    const strayLabel = pathname === "/" ? null : titleCase(pathname.slice(1));

    return {
      crumbs: strayLabel ? [{ href: pathname, label: strayLabel }] : [],
      links: SECTIONS,
      ...bar,
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

    // /work/nope — the section is real but the case study isn't. Falls back to
    // the same "Shuto/404." as any other miss rather than inventing a third
    // shape, and offers both sections, since you aren't in either one now.
    return NOT_FOUND;
  }

  return { crumbs, links, ...(BAR[section.href] ?? BAR["/"]) };
}

// "contact" → "Contact". Only ever sees a single lowercase URL segment.
function titleCase(segment) {
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
