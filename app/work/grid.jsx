"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useHover } from "../hover-context";

/* ============================================================================
   THE WORK GRID

   Four tiles across on your 12-column grid — each one spans 3 columns, and the
   24px gap IS the grid gutter, so this markup and the Figma grid are the same
   thing rather than two things kept in step by hand.

   THE ROW SIZING IS THE WHOLE TRICK. minmax(15rem, 1fr) means: share the
   leftover height equally, but never go below 240px. With two rows in a normal
   window the 1fr wins and the grid fills the screen exactly, the way your frame
   does. Add a third row and 1fr would push every tile under the floor, so the
   floor wins instead, the grid outgrows the space and the page scrolls — rather
   than quietly shrinking all eight tiles to make room.

   Declaring two rows up front also means four projects render at half height
   instead of one enormous full-window row.
   ============================================================================ */

const ROWS = "[grid-template-rows:repeat(2,minmax(15rem,1fr))]";
const AUTO_ROWS = "[grid-auto-rows:minmax(15rem,1fr)]";

export function WorkGrid({ projects }) {
  const { setHovered } = useHover();

  /*
    Clear the hover when this grid goes away.

    Leaving the page by clicking a tile — or a header link — unmounts the tile
    while the pointer is still over it, so no mouseleave ever fires and the
    project stays in the context. Come back to /work and the bar would open
    showing whatever you last touched instead of "Hover over work to see".
    The component that sets the state is the one that should clean it up.
  */
  useEffect(() => () => setHovered(null), [setHovered]);

  return (
    <ul className={`mt-6 grid flex-1 grid-cols-12 gap-3 ${ROWS} ${AUTO_ROWS}`}>
      {projects.map((project) => (
        <li
          key={project.slug}
          className="col-span-12 md:col-span-6 lg:col-span-3"
        >
          <Link
            href={`/work/${project.slug}`}
            className="bg-foreground/10 relative block h-full overflow-hidden"
            /*
              Focus as well as hover. The bar is the only place a tile's title
              appears, so wiring this to the mouse alone would leave someone
              tabbing through the grid with eight identical squares.
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
              sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 25vw"
              quality={90}
              className="object-cover"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

// The two lines the bottom bar shows while this project is under the cursor.
function show(project) {
  return { label: project.title, copy: project.summary };
}
