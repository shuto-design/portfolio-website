# shuto.design

Portfolio site. Built with Next.js 16, React 19, and Tailwind CSS v4.

This README is the map. It's written for the person who designs this site, not
for other engineers.

---

## The three commands

Run these from this folder in Terminal.

| Command          | What it does                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`    | Starts the site locally at http://localhost:3000. Edits appear instantly. Stop it with `Ctrl+C`. |
| `npm run build`  | Checks the whole site compiles. Run before publishing if you want certainty.                     |
| `npm run format` | Tidies indentation and spacing in every file. Safe to run any time.                              |

You do not need the terminal for content edits. See **Editing without a terminal** below.

---

## What every file does

```
app/                        Every page of the site
├── layout.jsx              Wraps every page. Font, <head> tags, link previews
├── site-chrome.js          ★ THE NAV + BAR WORDING. The file you edit.
├── site-header.jsx         The wordmark, the links, the rule. Every page.
├── site-footer.jsx         The bar at the bottom. Every page.
├── hover-context.jsx       Lets a work tile change the bar's words
├── page.jsx                The homepage  ( / )
├── globals.css             DESIGN TOKENS — colors, type, spacing
├── icon.svg                Browser tab icon  ← placeholder, replace this
├── sitemap.js              Auto-generates the list of pages for Google
├── robots.js               Tells search engines they may index the site
├── about/page.jsx          /about        ← placeholder + your email
├── contact/page.jsx        /contact      ← stub, nothing links to it now
├── resume/page.jsx         /resume       ← stub, nothing links to it yet
└── work/
    ├── page.jsx            /work — the project index
    ├── grid.jsx            The 12-column tile grid and its hover
    ├── projects.js         ★ YOUR CONTENT. The file you edit.
    ├── blocks.jsx          How each block type looks. Claude maintains this.
    └── [slug]/page.jsx     The case study template. One file, every project.

public/                     Images live here. Anything in here is public.
└── work/<project>/         Your Figma exports, one folder per project

next.config.mjs             Image quality + format settings
package.json                The project's dependencies and commands
```

**A file inside `app/` only becomes a web page if it's named `page.jsx`.**
That's why `projects.js` can sit inside `app/work/` without becoming a URL.

### The chrome

Two strips wrap every page and never move: the header, and the bar along the
bottom. `layout.jsx` renders both around whatever page you're on.

**`app/site-chrome.js` is the file you edit.** It holds the sections and the
bar's wording, and both strips read from it, so they can't disagree about which
page you're on.

```js
export const SECTIONS = [
  { href: "/work",  label: "Work" },
  { href: "/about", label: "About" },
];

const BAR = {
  "/":      { label: "Featured Case Study",    copy: "Copy Here" },
  "/work":  { label: "Hover over work to see", copy: "Copy Here" },
  ...
};
```

**The wordmark is a folder path.** Whichever section you're in moves out of the
links on the right and into the wordmark on the left:

```
/                  Shuto.                          Work  About
/work              Shuto/Work.                           About
/about             Shuto/About.                    Work
/work/travelpro    Shuto/Work/Travelpro.                 About
```

Every segment is a link, so `Work` in `Shuto/Work/Travelpro.` walks back up to
the index. Nothing is ever underlined to show the current page, because the
current page is never in the list — it's in the wordmark.

Adding a section to `SECTIONS` gets you both behaviours at once. A case study
takes its name straight from `projects.js`, so renaming a project renames its
breadcrumb.

**The bar's words change on hover.** On `/work` it reads "Hover over work to
see" until you point at a tile, then it shows that project's title and summary —
the tiles carry no text of their own. It follows keyboard focus too, so tabbing
through the grid reads the same as pointing at it.

### The shell and the grid

`layout.jsx` also holds the **shell**: the 32px side margin, the space above the
wordmark, and the full-window height. That's why every page file starts with a
bare `<main>` and no padding of its own — a page that set its own left margin
would stop lining up with the wordmark above it. Adding a page means copying
`about/page.jsx`, not inventing a new wrapper.

The shell is a height chain. The header and the bar are as tall as their
contents; the page in between takes `flex-1` and swallows the rest. That's what
holds the bar against the bottom of the window on the landing and Work pages
without anything being positioned or given a height — and on a long case study
the same chain simply grows and scrolls.

`app/work/grid.jsx` puts the project tiles on the 12-column grid: four across,
each spanning three columns, with the 24px grid gutter as the CSS `gap`. Four
across on desktop, two on tablet, one on a phone.

The rows share whatever height is left over, so up to twelve projects fill the
window exactly the way the Figma frame does. Below 240px tall they stop
shrinking and the page scrolls instead — better to scroll than to squeeze every
tile down to a stamp.

Files you can ignore entirely: `AGENTS.md`, `CLAUDE.md` (auto-generated by
Next.js — deleting them just recreates them), `package-lock.json`, `node_modules/`,
`.next/`, `.vercel/`.

---

## Adding a project

1. Export your images from Figma at 2x, as JPG or PNG.
2. Put them in `public/work/your-project-name/`
3. Open `app/work/projects.js`, copy the existing entry, change the values.

That's it. The project appears on `/work`, gets its own page at
`/work/your-project-name`, and is added to the sitemap automatically.

### Case studies are made of blocks

A case study is a list of blocks that render top to bottom. Reordering the story
means reordering that list.

```js
blocks: [
  { type: "text",  body: "..." },
  { type: "image", src: "...", alt: "...", aspect: "16/9", width: "full" },
  { type: "duo",   items: [ {...}, {...} ] },
  { type: "quote", body: "...", attribution: "..." },
]
```

Four types exist today. **Ask for more any time a Figma frame needs one** — that's
a normal part of this working, not a workaround.

### Two fields that matter more than they look

**`aspect`** — the image's proportions (`"16/9"`, `"4/3"`, `"1/1"`). The browser
uses it to reserve the right amount of space _before_ the image downloads. Get it
wrong and the page visibly jumps while loading. It's the ratio of the exported
file, not the size you want it displayed at.

**`alt`** — what the image shows, in a few words. Screen readers speak it, search
engines read it, and it displays if an image fails to load. Write it for someone
who can't see the image.

---

## Editing without a terminal

GitHub's website can do the whole loop — including drag-and-drop image uploads.

```
edit on github.com  →  commit to a new branch  →  Vercel posts a preview URL
      →  check it on your phone  →  merge  →  live on shuto.design
```

Nothing reaches shuto.design until you merge. Every branch gets its own private
preview URL, so you can always see a change on a real device before it's public.

---

## Design tokens

`app/globals.css` is the seam between Figma and code, and it holds every value
the site has. Two systems live in there.

### Colour is flat

```
--color-background   #ffffff
--color-foreground   #000000
```

That's the whole palette. No accent, no grey, no dark mode — so there's nothing
to point through and the values sit directly on `@theme`. The rules under the
nav and under the featured title use the foreground colour deliberately: they're
the same black as the type, so there's no separate rule colour to keep in sync.

Adding dark mode later means putting the primitives layer back — two values on
`:root` that these point at, plus one `@media` block that swaps them. Every page
follows automatically, because pages name roles (`bg-background`) rather than
colours.

### Type is a 1.333 scale

Every size on the site is a step on a perfect-fourth scale anchored at 16px:

| Step   | Size          | Used by                        |
| ------ | ------------- | ------------------------------ |
| down 1 | 12.00         | `caption`, `small`             |
| base   | 16.00         | `body`                         |
| up 1   | 16.00 → 21.33 | `nav`                          |
| up 2   | 21.33 → 28.43 | `featured`, `subhead`, `quote` |
| up 3   | 28.43 → 37.90 | `wordmark`, `heading`          |

The three larger steps are fluid: they grow with the window instead of jumping
at breakpoints. The `vw` numbers behind them are picked so that all three reach
their floor at the **same** window width (1080px) and their target at 1440px —
which is what keeps the 1.333 ratio between them true at _every_ width, not just
at one. Body and caption stay fixed, because running text shouldn't grow with
the window and a caption that shrank with it would stop being readable.

Steps are defined once, then role names point at them. Moving the featured title
up a step is a one-word edit in that file rather than a new measurement from
Figma.

### Spacing is an 8px baseline

Every space on the site is a multiple of 8. The page margin is 32 (4×8), the
grid gutter 24 (3×8), the gap under the wordmark 8.

That's enforced rather than encouraged. `globals.css` sets Tailwind's spacing
base to 8px instead of its default 4px, so **`mt-3` is 24px here, not 12** — and
there is no way to write 12 or 20 without arbitrary-value brackets. It's the
same move as switching off `text-4xl`: take the off-system value away instead of
asking people to avoid it.

| class  | px  |     | class   | px  |
| ------ | --- | --- | ------- | --- |
| `mt-1` | 8   |     | `mt-5`  | 40  |
| `mt-2` | 16  |     | `mt-6`  | 48  |
| `mt-3` | 24  |     | `mt-8`  | 64  |
| `mt-4` | 32  |     | `mt-10` | 80  |

Spacing is **fixed** — it doesn't grow with the window. Type still does. That
pairing is deliberate: the 12-column grid is specified at 32/24 in Figma, and a
margin that drifted with the window would put the grid on a different pitch at
every width. Type has the opposite problem, which is why it stays fluid.

The rules under the wordmark and the bar are the one exception, at
`clamp(2px, 0.21vw, 4px)`. A hairline is a border, not spacing — 8px would be a
bar, and a fixed 4px that reads right at 1440 is heavy on a phone.

### The 12-column grid

12 columns, 24px gutters, 32px margins. At 1440 that's a column of 92.67px, and
a work tile spanning 3 columns comes out at 326px.

Nothing declares those column widths. `grid-cols-12` plus `gap-3` (24px) inside
the shell's 32px margin **is** the Figma grid — the browser divides the leftover
space the same way Figma does, so there's no second set of numbers to keep in
step. To put something on the grid, give it `col-span-*`.

### Two weights, and tracking that can't be forgotten

Geist Medium and Geist Bold. Tailwind's other weights are switched off on
purpose — `font-light` and `font-black` don't exist, and neither do `text-4xl`
or `text-sm`, so an off-system size or weight can't be reached for by accident.

Tracking is bound to weight: Bold −5%, Medium −3%. It's declared on `*` rather
than only on the weight classes, so **every element recomputes the percentage
against its own font size.** That looks odd and isn't: an `em` value inherits as
a fixed pixel amount, so a 28px heading that merely inherited its tracking from
a 16px body would come out at the body's −0.48px instead of its own −0.85px —
visibly loose, and silent. The upshot is you can write a new heading with no
weight class at all and it still comes out Medium at −3% of its own size.

### Still open

`--container-measure` is the maximum line length for prose. It's sitting at its
old placeholder of `42rem`, which runs to roughly 84 characters a line — wider
than the 60–75 that reads comfortably. One line to change once you've picked it.

The bottom bar's second line says **"Copy Here"** on every page, and `/about`'s
first line is just "About" — both placeholders from the frames. They're strings
in `app/site-chrome.js`, so replacing them is a one-line edit per page and needs
no code change.

The homepage leads with **the first project in `projects.js`**. Reordering that
list changes what the landing page shows. Say the word if you'd rather name the
featured project explicitly instead.

Every token automatically becomes a class. `--text-heading` gives you
`text-heading`; `--color-foreground` gives you `text-foreground`,
`bg-foreground`, `border-foreground`, and so on, for free.

---

## Handing designs to Claude

**Screenshots are the main channel.** Export the frame and send it. Unlimited and
free — reading your Figma file directly is rate-limited to 20 reads/month on the
current plan, so that's saved for pulling your Variables collection in one go.

**Design at three widths: 1440, 768, and 390.** This is the single biggest source
of friction between Figma and the web. A Figma frame is one fixed width; a browser
is a continuous range. Every size _between_ your frames gets decided by someone —
if not you, then Claude, guessing. Roughly half of portfolio traffic is a phone.

**Name Figma Variables and layers deliberately.** `color/foreground/default` says
where a value belongs. `Rectangle 47` doesn't.

**Export images at 2x, don't pre-compress.** Give the good version — Next resizes,
converts to AVIF/WebP, and serves the right size per device automatically. Nothing
above 3840px wide is ever used, so there's no point exporting bigger.

---

## Still to come from you

- `app/icon.svg` — real tab icon (and a 180×180 `app/apple-icon.png` for iOS,
  which can't be an SVG)
- `app/opengraph-image.png` — 1200×630, the preview card when the link is shared.
  Drop the file in and it wires itself up. PNG or JPG only, under 8MB.
- The `description` in `app/layout.jsx` — currently a placeholder. This is the
  sentence under the link when someone pastes shuto.design into Slack or email.

---

## When something breaks

Read the **first** error message, not the last — the rest are usually knock-on
effects. The file and line number in it are almost always correct.

Most common cause: a missing comma or bracket in `projects.js`. Running
`npm run format` will often make the problem visible, because malformed code
stops indenting correctly.

If a block doesn't appear, check the `type` spelling. A wrong type shows a message
naming the valid options while you're running `npm run dev` — visitors never see it.
