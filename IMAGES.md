# Images

Everything you need to put a picture on this site without asking anyone.

`README.md` is the map of the whole project. This is the one page about images:
what to export, what to call it, where to put it, and how to check you got it
right. It's written to be followed from memory after a couple of goes.

---

## The short version

1. **Export** from Figma. JPG for photography, PNG for flat colour and type.
   **2560px on the long edge** for anything full-width, 1800 for a contained
   image, 1200 for one half of a duo.
2. **Name it** in lowercase with hyphens: `poster-front.jpg`. No capitals, no
   spaces.
3. **Drop it** in `public/work/<your-project-slug>/`. The folder name and the
   slug in `projects.js` have to be identical.
4. **Add the entry** to `app/work/projects.js`. For `aspect`, write the file's
   pixel dimensions: a 2400x3000 export is `aspect: "2400/3000"`.
5. **Run `npm run images`.** It reads every file and tells you what's wrong, or
   says everything checks out.

Step 5 is the one that makes the other four safe. Get in the habit.

---

## Naming

| Rule                               | Why                                                                                                                                                                                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lowercase only                     | **This is the one that will bite you.** macOS treats `Cover.jpg` and `cover.jpg` as the same file. The Linux machine Vercel builds on does not. A capital letter works perfectly on your laptop and leaves a hole in the live site. |
| Hyphens, not spaces or underscores | Spaces become `%20` in a URL and are miserable to read or type.                                                                                                                                                                     |
| Letters, numbers and hyphens only  | No `&`, `#`, `?`, accents, or emoji — some are reserved characters in a URL.                                                                                                                                                        |
| Folder name = the project's slug   | `slug: "travelpro"` means `public/work/travelpro/`. Nothing enforces this at runtime, so `npm run images` enforces it for you.                                                                                                      |
| `cover.jpg` is reserved            | Every project has exactly one. It's the tile on `/work` and, for the first project in the list, the whole homepage.                                                                                                                 |

**Describe the image, don't number it.** `poster-front.jpg` and
`packaging-detail.jpg` beat `01.jpg` and `02.jpg`, because the order a case
study runs in lives in `projects.js`, not in the filenames. The moment you move
a block, `03.jpg` renders second and the number is a lie — one you'll believe six
months later when you're looking for something.

---

## How big to export

Next resizes every image on demand and serves AVIF or WebP at the right size for
each visitor's screen. Two consequences worth internalising:

- **It never scales your file up.** A 900px export stays soft on a big screen
  no matter what.
- **It never serves more than the slot can show, and never more than 3840px.**
  Anything beyond the numbers below is weight in the repository that literally
  nobody ever downloads.

| Where it appears                    | In `projects.js`                        | Export long edge |
| ----------------------------------- | --------------------------------------- | ---------------- |
| Homepage hero, and the `/work` tile | `cover`                                 | **2560**         |
| Edge-to-edge image in a case study  | `{ type: "image", width: "full" }`      | **2560**         |
| Image inside the text column        | `{ type: "image", width: "contained" }` | **1800**         |
| One half of a side-by-side pair     | `{ type: "duo" }`                       | **1200**         |

Export at those numbers, not at "2x" — 2x of what depends on the slot, and the
table has already done that arithmetic. If you're between two, go with the
larger; soft is more visible than heavy.

---

## The cover does three jobs

This is the only genuinely awkward thing about images here, and it's worth
understanding once rather than being surprised by repeatedly.

A project's `cover` is used in three places at three completely different
shapes, and in each one it's cropped to fill:

| Where                  | Box at a typical size          | Shape             |
| ---------------------- | ------------------------------ | ----------------- |
| Tile on `/work`        | 326 x 288 (1440 x 900 window)  | roughly square    |
| Homepage hero, desktop | 1376 x 648 (1440 x 900 window) | **2.1 : 1, wide** |
| Homepage hero, phone   | 326 x 610 (iPhone 390 x 844)   | **1 : 1.9, tall** |

The homepage always leads with the **first project in `projects.js`**, so
reordering that list changes which cover has to survive all three.

### What that means when you're composing

The desktop hero cuts the top and bottom off. The phone hero cuts the sides off.
Whatever ratio you export, the part of the image guaranteed to be visible
everywhere is only about **a quarter of it** — and it's the middle quarter.

So for a cover:

- **Export 4:3 — 2560 x 1920.** Closest to the tile, so the tile looks most like
  the thing you designed.
- **Keep anything that must survive inside the middle 40% of the width and the
  middle 60% of the height.** A face, a logo, the product, the one word of type
  that matters. Draw that rectangle in Figma once and keep it as a guide.
- **Let the edges be atmosphere.** Texture, colour, background — things that read
  fine when half of them are gone.

Images inside a case study don't have this problem. They're shown at the ratio
you give them, uncropped, so compose those however you like.

---

## Which file type

| Use      | For                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **JPG**  | Photography, gradients, anything with grain or soft transitions. Almost everything.                                                        |
| **PNG**  | Flat colour, type-led artwork, screenshots, UI, and anything that needs transparency.                                                      |
| **WebP** | Fine as a source if Figma gives you a smaller file at the same quality. No advantage over the two above — Next converts everything anyway. |

**Don't compress hard before you export.** Next re-encodes to AVIF and WebP from
whatever you give it, so a JPEG you've already squeezed just bakes its artefacts
into the good version. Give it the clean file; it does the squeezing.

Three to avoid:

- **SVG** — Next serves it as-is without optimising, and the site's config
  doesn't allow it through the image pipeline. Fine for a logo mark, wrong for
  case-study artwork.
- **HEIC** — what an iPhone shoots by default. The optimiser can't read it.
  Convert to JPG first (Preview > Export will do it).
- **GIF** — if you want motion, ask me for a video block. A GIF of anything
  longer than a second is larger than the video would be.

---

## How small to keep it

| Slot                            | Budget per file |
| ------------------------------- | --------------- |
| Cover, or an edge-to-edge image | 1.5 MB          |
| Contained image                 | 800 KB          |
| Duo half                        | 400 KB          |

These are budgets, not limits — nothing breaks at 1.6 MB. They matter because
**git keeps every version of every file forever.** Replacing a 6 MB export with
a good one doesn't remove the 6 MB; it adds to it, in a repository that gets
cloned in full. A project's worth of images should land somewhere under 10 MB.

If an export blows the budget at the right pixel size, re-export as JPG, or run
it through [squoosh.app](https://squoosh.app) — drag in, pick MozJPEG at about
80, drag out.

---

## `aspect`: write the pixel dimensions

This field exists so the browser can reserve exactly the right space **before**
the image downloads. Get it wrong and two things happen: the page visibly jumps
as the image lands, and the image is cropped to the ratio you claimed rather
than shown at its own.

You do not have to work out the ratio. CSS takes any two numbers, so the answer
is always the export's own dimensions:

```js
// The file is 2400 x 3000. That's it, that's the value.
{ type: "image", src: "/work/travelpro/poster.jpg", alt: "…", aspect: "2400/3000" }
```

`"16/9"` and `"4/3"` are still fine when they're genuinely true. But
`"2400/3000"` can't be wrong, needs no arithmetic, and `npm run images` checks
it against the real file either way.

---

## `alt`: what the image shows

A few words, written for someone who can't see it. Screen readers speak it,
search engines read it, and it appears in place of the image if one ever fails
to load.

- **Good:** `"Folded poster showing the campaign wordmark in red"`
- **Bad:** `"Image"`, `"poster.jpg"`, `"Travelpro poster design 2026 branding"`

Don't start with "Image of" — that's already implied.

Empty (`alt=""`) is correct for an image that adds nothing a sighted person
doesn't already get from the words around it. That's why the work tiles and the
homepage hero pass an empty one: the link already carries the project's name, so
alt text would just say it twice.

---

## `npm run images`

Run it after any change to images or to `projects.js`. It reads everything and
writes nothing — it will never touch your files.

It lists every image in use with its real dimensions, the exact `aspect` string
for it, and its file size. Then:

**Errors** — these look wrong or break in production:

- a `src` pointing at a file that isn't there
- a filename with a capital letter or a space
- `src` and the real filename differing only in case (the Vercel trap)
- an `aspect` that disagrees with the file, quoting the value to use instead
- a folder under `public/work/` that isn't any project's slug

**Warnings** — safe to publish, worth fixing:

- an image wider than its slot will ever show
- an image too small to look sharp in its slot
- a file over its size budget
- **images sitting in a folder that no project uses yet**

That last one is the useful one. Drop a folder of Figma exports in, run the
command, and it prints the `projects.js` lines ready to paste:

```
public/work/travelpro/ — 2 files no project uses yet

  { type: "image", src: "/work/travelpro/poster-front.jpg", alt: "", aspect: "2400/3000", width: "contained" },
  { type: "image", src: "/work/travelpro/packaging.jpg", alt: "", aspect: "2560/1440", width: "contained" },
```

Paste them into that project's `blocks`, fill in the `alt`, and change
`"contained"` to `"full"` on anything you want edge to edge.

---

## The site's own images

Three images belong to the site rather than to any project. All three are still
placeholders.

| File                      | Size           | Notes                                                                                                                                                                                |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/opengraph-image.png` | **1200 x 630** | The preview card when someone pastes shuto.design into Slack, LinkedIn, or a message. Drop the file in at that path and it wires itself up — no code change. PNG or JPG, under 8 MB. |
| `app/apple-icon.png`      | **180 x 180**  | The icon when the site is saved to an iPhone home screen. Has to be a PNG; iOS won't take an SVG.                                                                                    |
| `app/icon.svg`            | square         | The browser tab icon. SVG is right here — it's the one place it is.                                                                                                                  |

Zero corner radius on all three, the favicon included. That's the rule
everywhere on this site.

The open-graph image is the highest-value one of the three: it's the version of
the site most people see first, because a link gets pasted more often than it
gets typed.

---

## Things that need a code change

Ask, and it's a small job. This list is short on purpose — everything above this
line is yours to do alone.

- a new block type (three images across, an image with a caption, full-bleed
  video, an image beside text)
- a caption under an image
- controlling _where_ a cover crops rather than composing for the centre
- a separate wide image for the homepage so covers only have to work as tiles
- letting a project name its own featured status instead of it being first place
  in the list

None of these are workarounds. A new block type arriving because a Figma frame
needed one is how this is supposed to go.
