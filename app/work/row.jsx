"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useHover } from "../hover-context";

/* ============================================================================
   THE WORK ROW

   One row of identical rectangles, scrolled sideways.

   THE TILE IS SIZED BY ITS HEIGHT, NOT ITS WIDTH, and that single inversion is
   what makes everything else here simple. The row takes whatever vertical
   space the shell has left after the header and the bottom bar, the tiles
   stretch to fill it, and TILE turns that height into a width. So the row fits
   the window exactly at any size without one breakpoint, and every cover is
   the same rectangle no matter what shape the file behind it was — which is
   the part a grid of mixed exports can never give you.

   TILE IS THE ONE VALUE TO CHANGE. Set it to whatever the covers are in Figma
   and every tile follows. Nothing else in this file knows the proportion.

   THE TILES ARE STRETCHED, NOT TOLD A HEIGHT, and it has to stay that way.
   Both the row and the tiles take their height from `align-items: stretch`
   rather than from a percentage, because a percentage height here resolves
   against a parent whose own height comes from flex-grow — which the browser
   treats as indefinite. Written as `h-full` the whole row collapses to nothing
   and the page renders empty. Verified, twice; don't refactor it back.

   THE ROW RUNS PAST THE PAGE MARGIN ON PURPOSE. -mr-gutter lets it reach the
   window edge, so mid-scroll a tile is always sliced off — and that sliver is
   the only thing telling anyone there's more work to the right. pr-gutter on
   the track puts the margin back at the far end, so scrolled all the way over,
   the last tile sits the same 32px off the edge as the first one does.
   ============================================================================ */

const TILE = "aspect-[2/3]";

/*
  The height cap, and the only line in this file that thinks about a phone.

  A tile is 2/3 as wide as it is tall, so on a tall narrow window that comes
  out wider than the screen and you could never see one whole tile. 117vw is
  that arithmetic run backwards: cap the height there and a tile lands at 78vw,
  which fits with a slice of the next one showing. On any window wide enough,
  the row is shorter than the cap and this line does nothing at all.

  WHAT IT COSTS: where the cap bites, the row no longer reaches the bottom bar,
  so a phone gets a band of white between the two. Pushing the row down to
  close that gap needs align-self, and align-self is what currently gives every
  tile its height — see the note on the row below. Worth revisiting when the
  phone layout is designed in Figma; not worth a workaround before then.
*/
const ROW = "max-h-[117vw]";

export function WorkRow({ projects }) {
  const { setHovered } = useHover();

  /*
    Clear the hover when this row goes away.

    Leaving the page by clicking a tile — or a header link — unmounts the tile
    while the pointer is still over it, so no mouseleave ever fires and the
    project stays in the context. Come back to /work and the bar would open
    showing whatever you last touched instead of "Hover over work to see".
    The component that sets the state is the one that should clean it up.
  */
  useEffect(() => () => setHovered(null), [setHovered]);

  return (
    <div className="-mr-gutter mt-6 flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden">
      <ul className={`pr-gutter flex shrink-0 gap-3 ${ROW}`}>
        {projects.map((project) => (
          <li key={project.slug} className={`${TILE} shrink-0`}>
            <Link
              href={`/work/${project.slug}`}
              className="bg-foreground/10 relative block h-full w-full overflow-hidden"
              /*
                Focus as well as hover. The bar is the only place a tile's
                title appears, so wiring this to the mouse alone would leave
                someone tabbing through the row with identical squares.

                Tabbing is also how a keyboard scrolls this row: the browser
                brings each link into view as it's focused, which is why the
                tiles are links rather than a scroll region with no stops.
              */
              onMouseEnter={() => setHovered(show(project))}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(show(project))}
              onBlur={() => setHovered(null)}
            >
              {/* The tile shows no text, so the link needs a name of its own —
                  the bottom bar is a visual echo of this, not a substitute. */}
              <span className="sr-only">{project.title}</span>

              <Image
                src={project.cover.src}
                alt=""
                fill
                sizes="(max-width: 48rem) 80vw, 35vw"
                quality={90}
                /* object-cover, not contain: the tile's shape wins and the
                   cover is cropped to it. That's the whole point of a fixed
                   ratio, and it's why IMAGES.md tells you to keep the subject
                   in the middle of the frame — this is the crop it survives. */
                className="object-cover"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The two lines the bottom bar shows while this project is under the cursor.
function show(project) {
  return { label: project.title, copy: project.summary };
}
