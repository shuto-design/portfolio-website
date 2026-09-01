import Image from "next/image";

/* ============================================================================
   BLOCK COMPONENTS

   This file decides how each block TYPE looks. projects.js decides which blocks
   a project uses and in what order. That split is deliberate: you can rearrange
   a case study without touching design, and I can restyle every case study at
   once without touching your content.

   Everything here is structural placeholder styling — correct sizing, correct
   aspect ratios, no layout shift — and deliberately plain. The real design
   arrives from your Figma frames.
   ============================================================================ */

/* Placeholder widths. These become real numbers once there's a Figma frame.

   No horizontal padding and no mx-auto. The shell in layout.jsx already holds
   every page off the edge by px-gutter, and the site is anchored left — a
   centred block would start somewhere the wordmark above it doesn't. These are
   line-length caps, not a centred column. */
const PROSE = "max-w-measure";
const WIDE = "max-w-4xl";

/* A "full" image is supposed to touch both edges of the window. Inside the
   shell it would stop at the gutter instead, which would also make the
   sizes="100vw" below a lie and pull down a larger file than it needs. The
   negative margin cancels the shell's padding for this one block. */
const FULL_BLEED = "-mx-gutter";

function TextBlock({ body }) {
  // whitespace-pre-line means line breaks you type in projects.js show up as
  // line breaks on the page. Write naturally; no markup needed.
  return (
    <div className={PROSE}>
      <p className="whitespace-pre-line">{body}</p>
    </div>
  );
}

function ImageBlock({ src, alt, aspect = "16/9", width = "contained" }) {
  const isFull = width === "full";
  return (
    <figure className={isFull ? FULL_BLEED : WIDE}>
      <div
        className="relative w-full overflow-hidden"
        // aspectRatio is an inline style rather than a Tailwind class because
        // the value comes from your data at runtime, and Tailwind can only
        // generate classes it can see in the source at build time.
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isFull ? "100vw" : "(max-width: 896px) 100vw, 896px"}
          quality={90}
          className="object-cover"
        />
      </div>
    </figure>
  );
}

function DuoBlock({ items = [] }) {
  return (
    <div className={`${WIDE} grid gap-2 sm:grid-cols-2`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: item.aspect ?? "1/1" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, 448px"
            quality={90}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function QuoteBlock({ body, attribution }) {
  return (
    <figure className={PROSE}>
      <blockquote className="text-quote text-balance">{body}</blockquote>
      {attribution && (
        <figcaption className="text-small mt-2">{attribution}</figcaption>
      )}
    </figure>
  );
}

/* The Outcome beat of a case study. Numbers inside a paragraph read as
   bragging; numbers in a row read as evidence — that's the whole reason this
   block exists instead of a sentence in a TextBlock.

   `note` is required, and not as decoration. Every figure in here is a
   comparison — "+38%" against WHAT? — and the note is where that comparison
   gets stated. A lift with no baseline attached isn't a modest claim, it's an
   unfalsifiable one, so the block refuses to render without it. The reasoning,
   and how to arrive at these numbers honestly, is in METRICS.md.

   ONE THING TO SETTLE IN FIGMA: the case-study header already sets label/value
   pairs one way (page.jsx, the Client/Year/Role list — small, bold, on a grid).
   This block sets them another (hairline rules, the figure at subhead size),
   because the header is metadata you skim and this is the evidence you're meant
   to stop on. Two treatments of the same shape on one page is a real decision,
   though, and it's yours — not mine to make in a placeholder. */
function MetricsBlock({ items = [], note }) {
  const rows = items.filter((item) => item?.label && item?.change);

  if (!rows.length || !note) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div className={`${PROSE} text-small border border-foreground p-2`}>
          A <code>metrics</code> block needs a <code>note</code> saying what the
          figures are compared against, plus at least one <code>items</code>{" "}
          entry with both a <code>label</code> and a <code>change</code>. Fix it
          in <code>app/work/projects.js</code>.
        </div>
      );
    }
    return null;
  }

  return (
    <figure className={PROSE}>
      {/* A description list, because that is literally what this is: terms and
          their values. Screen readers announce the two as a pair; a stack of
          divs would read as six unrelated fragments. */}
      <dl>
        {rows.map((item, i) => (
          <div
            key={i}
            /* flex-wrap is the entire mobile story. At 390px a long label and
               its figure stop fitting on one line, so the figure drops to the
               next line instead of pushing the page sideways. */
            className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-foreground py-2"
          >
            <dt className="text-small">{item.label}</dt>
            <dd className="text-subhead">{item.change}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="text-small mt-2">{note}</figcaption>
    </figure>
  );
}

const BLOCK_TYPES = {
  text: TextBlock,
  image: ImageBlock,
  duo: DuoBlock,
  quote: QuoteBlock,
  metrics: MetricsBlock,
};

/**
 * Renders one block. If you typo a block type, this tells you so in plain
 * language while you're developing instead of showing a blank space or
 * crashing the page. Visitors never see the message.
 */
export function Block({ block }) {
  const Component = BLOCK_TYPES[block.type];

  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div className={`${PROSE} text-small border border-foreground p-2`}>
          Unknown block type: <code>&quot;{block.type}&quot;</code>. Available
          types are: {Object.keys(BLOCK_TYPES).join(", ")}.
        </div>
      );
    }
    return null;
  }

  return <Component {...block} />;
}
