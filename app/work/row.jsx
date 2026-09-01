"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useShowing } from "../showing-context";

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

   THE BAR FOLLOWS THE SCROLL, WHICH IS THE ONLY LABEL A PHONE GETS. A tile
   carries no text, so its name lives in the bottom bar — and on a touchscreen
   nothing can hover, which left the row as unlabelled grey rectangles under an
   instruction ("Hover over work to see") that couldn't be followed. So the
   tile filling the screen writes its own name into the bar as you swipe.

   TWO CONDITIONS TURN THAT ON, and it is off unless both hold.

   The row has to actually overflow. If every tile fits at once there is no
   "current tile" to report — you can see them all.

   And the device has to be unable to hover. Where a pointer exists, an empty
   bar is not a gap to fill: "Hover over work to see" is a live instruction, and
   replacing it with a project name the moment the mouse leaves would answer a
   question nobody asked and hide the one hint the page offers.

   `(hover: hover)` is the question, rather than a width breakpoint or a user
   agent. It asks about the PRIMARY pointer, so a laptop with a touchscreen
   counts as a hovering device and keeps the instruction — swiping the row there
   won't move the bar. That's the cost of the rule, and it's the right trade:
   the machine has a mouse, and the mouse is how it's meant to be asked.

   THE PAGE MARGIN IS A RESTING POSITION, NOT A WHITE BAND. -mx-gutter pulls
   the scroll container out past the page margin on BOTH sides so it spans the
   whole window, and the margin goes back inside the track as scrolling space:
   pl-gutter at the head, and mr-gutter on the last tile at the tail. Both
   scroll with the content, so the first tile rests 32px in, the last one rests
   32px short, and every tile in between runs clean off both edges.

   Left as a real margin on one side — which it was, on the left — the tiles get
   clipped 32px in from that edge and a strip of white sits there permanently
   through the whole scroll, on one side only. Symmetrical or not at all.

   THE TAIL IS AN EMPTY PSEUDO-ELEMENT, and it has to be, which is worth the
   paragraph because every more obvious way of writing it silently does nothing.

   padding-right on the track: ignored. A margin on the last tile: ignored. Both
   measured at 0px where 32 was intended. The cause is that a tile has no
   INTRINSIC width — its width comes from the aspect ratio once its height is
   known, which happens during layout, while a container's content width is
   worked out before that. So the track's content is three zero-width boxes, it
   sizes itself to 112px, the tiles overflow it, and anything living at the
   track's own right edge sits back at 112px where the scroll never reaches.

   A pseudo-element with a width of its own is a real box in that measurement,
   so it lands after the last tile and the scroll runs out 32px short of the
   window edge — which is the whole point.
   ============================================================================ */

const TILE = "aspect-[2/3]";

/*
  The height cap, and the only line in this file that thinks about a phone.

  A tile is 2/3 as wide as it is tall, so on a tall narrow window that comes
  out wider than the screen and you could never see one whole tile. 117vw is
  that arithmetic run backwards: cap the height there and a tile lands at 78vw,
  which fits with a slice of the next one showing. On any window wide enough,
  the row is shorter than the cap and this line does nothing at all.

  IT SITS ON THE SCROLL CONTAINER, NOT ON THE ROW INSIDE IT. Capping the inner
  row instead leaves the container at full height with the tiles short inside
  it — which puts the horizontal scrollbar adrift in the white space below
  them, and hands the leftover height to a box that can't be positioned. Capped
  here, the container is exactly as tall as the tiles, and the leftover becomes
  free space in <main>, which justify-end can then put somewhere deliberate.
*/
const ROW = "max-h-[117vw]";

/*
  How finely the observer reports a tile's visibility: every 5%. It only calls
  back when a tile crosses one of these, so this is the trade — too few and the
  bar changes late and visibly, too many and a swipe fires callbacks it has no
  use for. Twenty steps is smooth at a thumb's speed.
*/
const STEPS = Array.from({ length: 21 }, (_, i) => i / 20);

export function WorkRow({ projects }) {
  const { setHovered, setVisible } = useShowing();
  const scroller = useRef(null);

  /*
    Clear the hover when this row goes away.

    Leaving the page by clicking a tile — or a header link — unmounts the tile
    while the pointer is still over it, so no mouseleave ever fires and the
    project stays in the context. Come back to /work and the bar would open
    showing whatever you last touched instead of "Hover over work to see".
    The component that sets the state is the one that should clean it up.
  */
  useEffect(() => () => setHovered(null), [setHovered]);

  /*
    Report whichever tile is most of what you can see.

    An IntersectionObserver rather than a scroll handler: "which of these is on
    screen" is the question it exists to answer, and it doesn't run code on
    every frame of a swipe. Its `root` is the row itself, not the window, so
    "visible" means visible in the row rather than visible on the page.

    Nothing observes anything on a machine with a mouse — see the note above
    the component. This whole effect is dormant on your laptop.

    Every tile is the same size, so comparing how much of each one is showing
    is a fair fight, and the winner is the one the eye would call current.
  */
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;

    const ratios = new Map();
    let observer = null;

    const clear = () => {
      observer?.disconnect();
      observer = null;
      ratios.clear();
      setVisible(null);
    };

    const watch = () => {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            ratios.set(entry.target.dataset.slug, entry.intersectionRatio);
          }

          let winner = null;
          let most = 0;
          for (const [slug, ratio] of ratios) {
            if (ratio > most) {
              most = ratio;
              winner = slug;
            }
          }

          const project = projects.find((p) => p.slug === winner);
          setVisible(project ? show(project) : null);
        },
        { root, threshold: STEPS },
      );

      for (const tile of root.querySelectorAll("[data-slug]")) {
        observer.observe(tile);
      }
    };

    /* Both conditions, re-checked whenever either could have changed.

       Resizing a window across the overflow line — or turning a phone sideways
       — switches this on and off, which is what the ResizeObserver is for.
       Without it, a row that started wide enough would never begin reporting
       when it stopped being.

       The media query can change too: plugging a mouse into a tablet flips
       `(hover: hover)` mid-session, and the bar should follow the pointer from
       that moment rather than until the next reload. */
    const canHover = window.matchMedia("(hover: hover)");

    const sync = () => {
      const scrolls = root.scrollWidth - root.clientWidth > 1;
      const wanted = scrolls && !canHover.matches;
      if (wanted && !observer) watch();
      else if (!wanted && observer) clear();
    };

    sync();
    const resize = new ResizeObserver(sync);
    resize.observe(root);
    canHover.addEventListener("change", sync);

    return () => {
      resize.disconnect();
      canHover.removeEventListener("change", sync);
      clear();
    };
  }, [projects, setVisible]);

  return (
    <div
      ref={scroller}
      className="-mx-gutter flex min-h-0 flex-1 overflow-x-auto overflow-y-hidden"
    >
      {/* The tail margin is a pseudo-element, and -ml-3 cancels the gap the
          row would otherwise put in front of it, so it measures the gutter
          exactly. See the note on the scroll container for why it can't be
          padding or a margin. */}
      <ul className="pl-gutter after:w-gutter flex shrink-0 gap-3 after:-ml-3 after:shrink-0 after:content-['']">
        {projects.map((project) => (
          <li
            key={project.slug}
            data-slug={project.slug}
            className={`${TILE} shrink-0`}
          >
            <Link
              href={`/work/${project.slug}`}
              className="bg-foreground/10 relative block h-full w-full overflow-hidden"
              /*
                Focus as well as hover — the third way of pointing at a tile,
                alongside the pointer and the scroll position. The bar is the
                only place a tile's title appears, so wiring this to the mouse
                alone would leave someone tabbing through identical squares.

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
